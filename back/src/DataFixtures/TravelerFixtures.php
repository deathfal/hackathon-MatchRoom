<?php

namespace App\DataFixtures;

use App\Entity\Traveler;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class TravelerFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $travelers = [
            [
                'email' => 'john.doe@example.com',
                'password' => 'password123',
                'firstName' => 'John',
                'lastName' => 'Doe',
                'tel' => '1234567890'
            ],
            [
                'email' => 'jane.smith@example.com',
                'password' => 'password456',
                'firstName' => 'Jane',
                'lastName' => 'Smith',
                'tel' => '0987654321'
            ],
            [
                'email' => 'bob.wilson@example.com',
                'password' => 'password789',
                'firstName' => 'Bob',
                'lastName' => 'Wilson',
                'tel' => '5555555555'
            ],
            [
                'email' => 'alice.johnson@example.com',
                'password' => 'password321',
                'firstName' => 'Alice',
                'lastName' => 'Johnson',
                'tel' => '9999999999'
            ],
            [
                'email' => 'charlie.brown@example.com',
                'password' => 'password654',
                'firstName' => 'Charlie',
                'lastName' => 'Brown',
                'tel' => '1111111111'
            ]
        ];

        foreach ($travelers as $travelerData) {
            $traveler = new Traveler();
            $traveler->setEmail($travelerData['email']);
            $traveler->setPasswordHash(password_hash($travelerData['password'], PASSWORD_BCRYPT));
            $traveler->setFirstName($travelerData['firstName']);
            $traveler->setLastName($travelerData['lastName']);
            $traveler->setTel($travelerData['tel']);
            
            $manager->persist($traveler);
        }

        $manager->flush();
    }
}
