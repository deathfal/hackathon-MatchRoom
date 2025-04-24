<?php

namespace App\Controller;

use App\Entity\Admin;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/admins')]
class AdminController extends AbstractController
{
    #[Route('/', name: 'get_admins', methods: ['GET'])]
    public function index(EntityManagerInterface $entityManager): JsonResponse
    {
        $admins = $entityManager->getRepository(Admin::class)->findAll();

        $data = array_map(function (Admin $admin) {
            return [
                'id' => $admin->getId(),
                'email' => $admin->getEmail(),
                'createdAt' => $admin->getCreatedAt()->format('Y-m-d H:i:s'),
            ];
        }, $admins);

        return new JsonResponse($data);
    }

    #[Route('/{id}', name: 'get_admin', methods: ['GET'])]
    public function show(Admin $admin): JsonResponse
    {
        $data = [
            'id' => $admin->getId(),
            'email' => $admin->getEmail(),
            'createdAt' => $admin->getCreatedAt()->format('Y-m-d H:i:s'),
        ];

        return new JsonResponse($data);
    }

    #[Route('/', name: 'create_admin', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (!isset($data['email'], $data['passwordHash'])) {
            return new JsonResponse(['error' => 'Invalid data'], JsonResponse::HTTP_BAD_REQUEST);
        }

        $admin = new Admin();
        $admin->setEmail($data['email']);
        $admin->setPasswordHash($data['passwordHash']);
        $admin->setCreatedAt(new \DateTimeImmutable());

        $entityManager->persist($admin);
        $entityManager->flush();

        return new JsonResponse(['message' => 'Admin created successfully'], JsonResponse::HTTP_CREATED);
    }

    #[Route('/{id}', name: 'update_admin', methods: ['PUT'])]
    public function update(Request $request, Admin $admin, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (isset($data['email'])) {
            $admin->setEmail($data['email']);
        }
        if (isset($data['passwordHash'])) {
            $admin->setPasswordHash($data['passwordHash']);
        }

        $entityManager->flush();

        return new JsonResponse(['message' => 'Admin updated successfully']);
    }

    #[Route('/{id}', name: 'delete_admin', methods: ['DELETE'])]
    public function delete(Admin $admin, EntityManagerInterface $entityManager): JsonResponse
    {
        $entityManager->remove($admin);
        $entityManager->flush();

        return new JsonResponse(['message' => 'Admin deleted successfully']);
    }
}