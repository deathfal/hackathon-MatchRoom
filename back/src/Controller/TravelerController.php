<?php

namespace App\Controller;

use App\Entity\Traveler;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/travelers')]
class TravelerController extends AbstractController
{
    #[Route('/', name: 'get_travelers', methods: ['GET'])]
    public function index(EntityManagerInterface $entityManager): JsonResponse
    {
        $travelers = $entityManager->getRepository(Traveler::class)->findAll();

        $data = array_map(function (Traveler $traveler) {
            return [
                'id' => $traveler->getId(),
                'email' => $traveler->getEmail(),
                'firstName' => $traveler->getFirstName(),
                'lastName' => $traveler->getLastName(),
                'tel' => $traveler->getTel(),
                'createdAt' => $traveler->getCreatedAt()->format('Y-m-d H:i:s'),
            ];
        }, $travelers);

        return new JsonResponse($data);
    }

    #[Route('/{id}', name: 'get_traveler', methods: ['GET'])]
    public function show(Traveler $traveler): JsonResponse
    {
        $data = [
            'id' => $traveler->getId(),
            'email' => $traveler->getEmail(),
            'firstName' => $traveler->getFirstName(),
            'lastName' => $traveler->getLastName(),
            'tel' => $traveler->getTel(),
            'createdAt' => $traveler->getCreatedAt()->format('Y-m-d H:i:s'),
        ];

        return new JsonResponse($data);
    }

    #[Route('/', name: 'create_traveler', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (!isset($data['email'], $data['firstName'], $data['lastName'])) {
            return new JsonResponse(['error' => 'Invalid data'], JsonResponse::HTTP_BAD_REQUEST);
        }

        $traveler = new Traveler();
        $traveler->setEmail($data['email']);
        $traveler->setFirstName($data['firstName']);
        $traveler->setLastName($data['lastName']);
        $traveler->setTel($data['tel'] ?? null);

        $entityManager->persist($traveler);
        $entityManager->flush();

        return new JsonResponse(['message' => 'Traveler created successfully'], JsonResponse::HTTP_CREATED);
    }

    #[Route('/{id}', name: 'update_traveler', methods: ['PUT'])]
    public function update(Request $request, Traveler $traveler, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (isset($data['email'])) {
            $traveler->setEmail($data['email']);
        }
        if (isset($data['firstName'])) {
            $traveler->setFirstName($data['firstName']);
        }
        if (isset($data['lastName'])) {
            $traveler->setLastName($data['lastName']);
        }
        if (isset($data['tel'])) {
            $traveler->setTel($data['tel']);
        }

        $entityManager->flush();

        return new JsonResponse(['message' => 'Traveler updated successfully']);
    }

    #[Route('/{id}', name: 'delete_traveler', methods: ['DELETE'])]
    public function delete(Traveler $traveler, EntityManagerInterface $entityManager): JsonResponse
    {
        $entityManager->remove($traveler);
        $entityManager->flush();

        return new JsonResponse(['message' => 'Traveler deleted successfully']);
    }
}