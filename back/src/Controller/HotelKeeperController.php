<?php

namespace App\Controller;

use App\Entity\HotelKeeper;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/hotelkeepers')]
class HotelKeeperController extends AbstractController
{
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

        $entityManager->persist($hotelKeeper);
        $entityManager->flush();

        return new JsonResponse(['message' => 'HotelKeeper created successfully'], JsonResponse::HTTP_CREATED);
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