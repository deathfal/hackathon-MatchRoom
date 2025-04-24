<?php

namespace App\Service;

use App\Dto\TravelerUpdateRequest;
use App\Entity\Traveler;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

class TravelerService
{
    public function __construct(
        private readonly EntityManagerInterface $entityManager
    ) {
    }

    public function findAll(): array
    {
        return $this->entityManager->getRepository(Traveler::class)->findAll();
    }

    public function findById(int $id): Traveler
    {
        $traveler = $this->entityManager->getRepository(Traveler::class)->find($id);
        if (!$traveler) {
            throw new NotFoundHttpException('Traveler not found');
        }
        return $traveler;
    }

    public function search(string $query): array
    {
        return $this->entityManager->getRepository(Traveler::class)
            ->createQueryBuilder('t')
            ->where('LOWER(t.email) LIKE LOWER(:query)')
            ->orWhere('LOWER(t.firstName) LIKE LOWER(:query)')
            ->orWhere('LOWER(t.lastName) LIKE LOWER(:query)')
            ->setParameter('query', '%' . $query . '%')
            ->getQuery()
            ->getResult();
    }

    public function update(Traveler $traveler, TravelerUpdateRequest $request): Traveler
    {
        // Check current password if updating sensitive information
        if (($request->email !== null || $request->newPassword !== null) && !$request->currentPassword) {
            throw new BadRequestHttpException('Current password is required to update email or password');
        }

        if ($request->currentPassword && !password_verify($request->currentPassword, $traveler->getPasswordHash())) {
            throw new BadRequestHttpException('Current password is incorrect');
        }

        // Update fields if provided
        if ($request->email !== null) {
            $existingTraveler = $this->entityManager->getRepository(Traveler::class)
                ->findOneBy(['email' => $request->email]);
            if ($existingTraveler && $existingTraveler->getId() !== $traveler->getId()) {
                throw new BadRequestHttpException('Email already exists');
            }
            $traveler->setEmail($request->email);
        }

        if ($request->newPassword !== null) {
            $traveler->setPasswordHash(password_hash($request->newPassword, PASSWORD_BCRYPT));
        }

        if ($request->firstName !== null) {
            $traveler->setFirstName($request->firstName);
        }

        if ($request->lastName !== null) {
            $traveler->setLastName($request->lastName);
        }

        if ($request->tel !== null) {
            $traveler->setTel($request->tel);
        }

        $this->entityManager->flush();

        return $traveler;
    }

    public function delete(int $id): void
    {
        $traveler = $this->findById($id);
        $this->entityManager->remove($traveler);
        $this->entityManager->flush();
    }
}
