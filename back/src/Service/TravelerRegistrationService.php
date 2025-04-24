<?php

namespace App\Service;

use App\Dto\TravelerRegistrationRequest;
use App\Entity\Traveler;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class TravelerRegistrationService
{
    public function __construct(
        private readonly EntityManagerInterface $entityManager,
        private readonly UserPasswordHasherInterface $passwordHasher
    ) {
    }

    public function register(TravelerRegistrationRequest $request): Traveler
    {
        // Check if email already exists
        $existingTraveler = $this->entityManager->getRepository(Traveler::class)->findOneBy(['email' => $request->email]);
        if ($existingTraveler) {
            throw new \RuntimeException('Email already exists');
        }

        $traveler = new Traveler();
        $traveler->setEmail($request->email);
        $traveler->setFirstName($request->firstName);
        $traveler->setLastName($request->lastName);
        
        // Hash the password using Symfony's password hasher
        $hashedPassword = $this->passwordHasher->hashPassword(
            $traveler,
            $request->password
        );
        $traveler->setPasswordHash($hashedPassword);

        $this->entityManager->persist($traveler);
        $this->entityManager->flush();

        return $traveler;
    }
}
