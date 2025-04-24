<?php

namespace App\Controller;

use App\Entity\Hotel;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/hotels')]
class HotelController extends AbstractController
{
    #[Route('/', name: 'get_hotels', methods: ['GET'])]
    public function index(EntityManagerInterface $entityManager): JsonResponse
    {
        $hotels = $entityManager->getRepository(Hotel::class)->findAll();

        $data = array_map(function (Hotel $hotel) {
            return [
                'id' => $hotel->getId(),
                'name' => $hotel->getName(),
                'description' => $hotel->getDescription(),
                'location' => $hotel->getLocation(),
                'hotelKeepers' => $hotel->getHotelKeepers()->map(function ($hotelKeeper) {
                    return $hotelKeeper->getId(); // Retourne les IDs des HotelKeepers associés
                })->toArray(),
            ];
        }, $hotels);

        return new JsonResponse($data);
    }

    #[Route('/{id}', name: 'get_hotel', methods: ['GET'])]
    public function show(Hotel $hotel): JsonResponse
    {
        $data = [
            'id' => $hotel->getId(),
            'name' => $hotel->getName(),
            'description' => $hotel->getDescription(),
            'location' => $hotel->getLocation(),
            'hotelKeepers' => $hotel->getHotelKeepers()->map(function ($hotelKeeper) {
                return $hotelKeeper->getId(); // Retourne les IDs des HotelKeepers associés
            })->toArray(),
        ];

        return new JsonResponse($data);
    }

    #[Route('/', name: 'create_hotel', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (!isset($data['name'], $data['description'], $data['location'])) {
            return new JsonResponse(['error' => 'Invalid data'], JsonResponse::HTTP_BAD_REQUEST);
        }

        $hotel = new Hotel();
        $hotel->setName($data['name']);
        $hotel->setDescription($data['description']);
        $hotel->setLocation($data['location']);

        $entityManager->persist($hotel);
        $entityManager->flush();

        return new JsonResponse(['message' => 'Hotel created successfully'], JsonResponse::HTTP_CREATED);
    }

    #[Route('/{id}', name: 'update_hotel', methods: ['PUT'])]
    public function update(Request $request, Hotel $hotel, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (isset($data['name'])) {
            $hotel->setName($data['name']);
        }
        if (isset($data['description'])) {
            $hotel->setDescription($data['description']);
        }
        if (isset($data['location'])) {
            $hotel->setLocation($data['location']);
        }

        $entityManager->flush();

        return new JsonResponse(['message' => 'Hotel updated successfully']);
    }

    #[Route('/{id}', name: 'delete_hotel', methods: ['DELETE'])]
    public function delete(Hotel $hotel, EntityManagerInterface $entityManager): JsonResponse
    {
        $entityManager->remove($hotel);
        $entityManager->flush();

        return new JsonResponse(['message' => 'Hotel deleted successfully']);
    }
}