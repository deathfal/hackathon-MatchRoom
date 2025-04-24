<?php

namespace App\Service;

use App\Dto\TravelerRegistrationRequest;
use App\Entity\Traveler;
use Doctrine\ORM\EntityManagerInterface;
class TravelerRegistrationService
{
    public function __construct(
        private readonly EntityManagerInterface $entityManager
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
        
        // Hash the password
        $hashedPassword = password_hash($request->password, PASSWORD_BCRYPT);
        $traveler->setPasswordHash($hashedPassword);

        $this->entityManager->persist($traveler);
        $this->entityManager->flush();

        return $traveler;
    }
}
