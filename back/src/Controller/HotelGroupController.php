<?php

namespace App\Controller;

use App\Entity\HotelGroup;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/hotel-groups')]
class HotelGroupController extends AbstractController
{
    #[Route('/', name: 'get_hotel_groups', methods: ['GET'])]
    public function index(EntityManagerInterface $entityManager): JsonResponse
    {
        $hotelGroups = $entityManager->getRepository(HotelGroup::class)->findAll();

        $data = array_map(function (HotelGroup $hotelGroup) {
            return [
                'id' => $hotelGroup->getId(),
                'name' => $hotelGroup->getName(),
                'description' => $hotelGroup->getDescription(),
                'logoUrl' => $hotelGroup->getLogoUrl(),
            ];
        }, $hotelGroups);

        return new JsonResponse($data);
    }

    #[Route('/{id}', name: 'get_hotel_group', methods: ['GET'])]
    public function show(HotelGroup $hotelGroup): JsonResponse
    {
        $data = [
            'id' => $hotelGroup->getId(),
            'name' => $hotelGroup->getName(),
            'description' => $hotelGroup->getDescription(),
            'logoUrl' => $hotelGroup->getLogoUrl(),
        ];

        return new JsonResponse($data);
    }

    #[Route('/', name: 'create_hotel_group', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (!isset($data['name'], $data['description'], $data['logoUrl'])) {
            return new JsonResponse(['error' => 'Invalid data'], JsonResponse::HTTP_BAD_REQUEST);
        }

        $hotelGroup = new HotelGroup();
        $hotelGroup->setName($data['name']);
        $hotelGroup->setDescription($data['description']);
        $hotelGroup->setLogoUrl($data['logoUrl']);

        $entityManager->persist($hotelGroup);
        $entityManager->flush();

        return new JsonResponse(['message' => 'HotelGroup created successfully'], JsonResponse::HTTP_CREATED);
    }

    #[Route('/{id}', name: 'update_hotel_group', methods: ['PUT'])]
    public function update(Request $request, HotelGroup $hotelGroup, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (isset($data['name'])) {
            $hotelGroup->setName($data['name']);
        }
        if (isset($data['description'])) {
            $hotelGroup->setDescription($data['description']);
        }
        if (isset($data['logoUrl'])) {
            $hotelGroup->setLogoUrl($data['logoUrl']);
        }

        $entityManager->flush();

        return new JsonResponse(['message' => 'HotelGroup updated successfully']);
    }

    #[Route('/{id}', name: 'delete_hotel_group', methods: ['DELETE'])]
    public function delete(HotelGroup $hotelGroup, EntityManagerInterface $entityManager): JsonResponse
    {
        $entityManager->remove($hotelGroup);
        $entityManager->flush();

        return new JsonResponse(['message' => 'HotelGroup deleted successfully']);
    }
}