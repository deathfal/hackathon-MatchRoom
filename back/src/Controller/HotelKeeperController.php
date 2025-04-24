<?php

namespace App\Controller;

use App\Entity\HotelKeeper;
use App\Entity\Hotel;
use App\Entity\HotelGroup;
use Doctrine\ORM\EntityManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;


#[Route('/api/hotelkeepers')]
class HotelKeeperController extends AbstractController
{
    private JWTTokenManagerInterface $jwtManager;
    private UserPasswordHasherInterface $passwordHasher;
    
    public function __construct(JWTTokenManagerInterface $jwtManager, UserPasswordHasherInterface $passwordHasher)
    {
        $this->jwtManager = $jwtManager;
        $this->passwordHasher = $passwordHasher;
    }
    #[Route('/', name: 'get_hotelkeepers', methods: ['GET'])]
    public function index(EntityManagerInterface $entityManager): JsonResponse
    {
        $hotelKeepers = $entityManager->getRepository(HotelKeeper::class)->findAll();

        $data = array_map(function (HotelKeeper $hotelKeeper) {
            return [
                'id' => $hotelKeeper->getId(),
                'email' => $hotelKeeper->getEmail(),
                'firstName' => $hotelKeeper->getFirstName(),
                'lastName' => $hotelKeeper->getLastName(),
                'createdAt' => $hotelKeeper->getCreatedAt()->format('Y-m-d H:i:s'),
                'hotels' => $hotelKeeper->getHotels()->map(function ($hotel) {
                    return $hotel->getId(); // Retourne les IDs des hôtels associés
                })->toArray(),
            ];
        }, $hotelKeepers);

        return new JsonResponse($data);
    }

    #[Route('/{id}', name: 'get_hotelkeeper', methods: ['GET'])]
    public function show(HotelKeeper $hotelKeeper): JsonResponse
    {
        $data = [
            'id' => $hotelKeeper->getId(),
            'email' => $hotelKeeper->getEmail(),
            'firstName' => $hotelKeeper->getFirstName(),
            'lastName' => $hotelKeeper->getLastName(),
            'createdAt' => $hotelKeeper->getCreatedAt()->format('Y-m-d H:i:s'),
            'hotels' => $hotelKeeper->getHotels()->map(function ($hotel) {
                return $hotel->getId(); // Retourne les IDs des hôtels associés
            })->toArray(),
        ];

        return new JsonResponse($data);
    }

    #[Route('/', name: 'create_hotelkeeper', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (!isset($data['email'], $data['firstName'], $data['lastName'])) {
            return new JsonResponse(['error' => 'Invalid data'], JsonResponse::HTTP_BAD_REQUEST);
        }

        $hotelKeeper = new HotelKeeper();
        $hotelKeeper->setEmail($data['email']);
        $hotelKeeper->setFirstName($data['firstName']);
        $hotelKeeper->setLastName($data['lastName']);
        $hotelKeeper->setCreatedAt(new \DateTimeImmutable());
        if (isset($data['tel'])) {
            $hotelKeeper->setTel($data['tel']);
        }

        $entityManager->persist($hotelKeeper);
        $entityManager->flush();

        return new JsonResponse(['message' => 'HotelKeeper created successfully'], JsonResponse::HTTP_CREATED);
    }
    
    #[Route('/register', name: 'register_hotelkeeper', methods: ['POST'])]
    public function register(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        // Validate data for both HotelKeeper and Hotel
        if (!isset($data['hotelKeeper']['email'], $data['hotelKeeper']['firstName'], $data['hotelKeeper']['lastName'], 
            $data['hotelKeeper']['password'], $data['hotel']['name'], $data['hotel']['description'], $data['hotel']['location'])) {
            return new JsonResponse([
                'error' => 'Invalid data. Required fields: hotelKeeper.email, hotelKeeper.firstName, hotelKeeper.lastName, hotelKeeper.password, hotel.name, hotel.description, hotel.location'
            ], JsonResponse::HTTP_BAD_REQUEST);
        }

        // Check if email already exists
        $existingKeeper = $entityManager->getRepository(HotelKeeper::class)->findOneBy(['email' => $data['hotelKeeper']['email']]);
        if ($existingKeeper) {
            return new JsonResponse(['error' => 'Email already in use'], JsonResponse::HTTP_CONFLICT);
        }

        // Create and set HotelKeeper
        $hotelKeeper = new HotelKeeper();
        $hotelKeeper->setEmail($data['hotelKeeper']['email']);
        $hotelKeeper->setFirstName($data['hotelKeeper']['firstName']);
        $hotelKeeper->setLastName($data['hotelKeeper']['lastName']);
        $hotelKeeper->setCreatedAt(new \DateTimeImmutable());
        $hotelKeeper->setActivated(false); // Default is false, but setting explicitly for clarity

        // Hash password using Symfony's password hasher
        $hashedPassword = $this->passwordHasher->hashPassword($hotelKeeper, $data['hotelKeeper']['password']);
        $hotelKeeper->setPasswordHash($hashedPassword);

        // Set optional fields if provided
        if (isset($data['hotelKeeper']['tel'])) {
            $hotelKeeper->setTel($data['hotelKeeper']['tel']);
        }

        // Create and set Hotel
        $hotel = new Hotel();
        $hotel->setName($data['hotel']['name']);
        $hotel->setDescription($data['hotel']['description']);
        $hotel->setLocation($data['hotel']['location']);
        
        // Set optional hotel fields if provided
        if (isset($data['hotel']['city'])) {
            $hotel->setCity($data['hotel']['city']);
        }
        if (isset($data['hotel']['type'])) {
            $hotel->setType($data['hotel']['type']);
        }
        if (isset($data['hotel']['siret'])) {
            $hotel->setSiret($data['hotel']['siret']);
        }
        if (isset($data['hotel']['category'])) {
            $hotel->setCategory($data['hotel']['category']);
        }
        if (isset($data['hotel']['siteWeb'])) {
            $hotel->setSiteWeb($data['hotel']['siteWeb']);
        }
        
        // Link to hotel group if provided
        if (isset($data['hotel']['hotelGroupId'])) {
            $hotelGroup = $entityManager->getRepository(HotelGroup::class)->find($data['hotel']['hotelGroupId']);
            if ($hotelGroup) {
                $hotel->setHotelGroup($hotelGroup);
            }
        }
        
        // Link HotelKeeper and Hotel
        $hotel->setHotelKeeper($hotelKeeper);
        
        // Persist entities
        $entityManager->persist($hotelKeeper);
        $entityManager->persist($hotel);
        $entityManager->flush();
        
        // Generate JWT token
        $token = $this->jwtManager->create($hotelKeeper);

        return new JsonResponse([
            'message' => 'Registration successful. Your account will be activated by an admin.',
            'hotelKeeperId' => $hotelKeeper->getId(),
            'hotelId' => $hotel->getId(),
            'token' => $token,
            'user' => [
                'id' => $hotelKeeper->getId(),
                'email' => $hotelKeeper->getEmail(),
                'firstName' => $hotelKeeper->getFirstName(),
                'lastName' => $hotelKeeper->getLastName(),
                'activated' => $hotelKeeper->isActivated(),
                'roles' => $hotelKeeper->getRoles()
            ],
            'activated' => false // Indicate account needs approval
        ], JsonResponse::HTTP_CREATED);
    }

    #[Route('/{id}', name: 'update_hotelkeeper', methods: ['PUT'])]
    public function update(Request $request, HotelKeeper $hotelKeeper, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (isset($data['email'])) {
            $hotelKeeper->setEmail($data['email']);
        }
        if (isset($data['firstName'])) {
            $hotelKeeper->setFirstName($data['firstName']);
        }
        if (isset($data['lastName'])) {
            $hotelKeeper->setLastName($data['lastName']);
        }

        $entityManager->flush();

        return new JsonResponse(['message' => 'HotelKeeper updated successfully']);
    }

    #[Route('/{id}', name: 'delete_hotelkeeper', methods: ['DELETE'])]
    public function delete(HotelKeeper $hotelKeeper, EntityManagerInterface $entityManager): JsonResponse
    {
        $entityManager->remove($hotelKeeper);
        $entityManager->flush();

        return new JsonResponse(['message' => 'HotelKeeper deleted successfully']);
    }
}