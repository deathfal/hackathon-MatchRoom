<?php

namespace App\Service;

use App\Entity\Traveler;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Security\Core\Exception\BadCredentialsException;

class TravelerLoginService
{
    public function __construct(
        private readonly EntityManagerInterface $entityManager
    ) {
    }

    public function login(string $email, string $password): string
    {
        $traveler = $this->entityManager->getRepository(Traveler::class)->findOneBy(['email' => $email]);

        if (!$traveler) {
            throw new BadCredentialsException('Invalid credentials');
        }

        if (!password_verify($password, $traveler->getPasswordHash())) {
            throw new BadCredentialsException('Invalid credentials');
        }

        $token = $this->generateToken($traveler);

        return $token;
    }

    private function generateToken(Traveler $traveler): string
    {
        return base64_encode($traveler->getEmail() . ':' . time());
    }
}
