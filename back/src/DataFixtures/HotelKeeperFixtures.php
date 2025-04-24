<?php

namespace App\DataFixtures;

use App\Entity\HotelKeeper;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class HotelKeeperFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $hotelKeepers = [
            [
                'email' => 'manager.paris@sofitel.com',
                'password' => 'hotelkeeper123',
                'firstName' => 'Jean',
                'lastName' => 'Dupont',
                'tel' => '+33123456789'
            ],
            [
                'email' => 'manager.london@novotel.com',
                'password' => 'hotelkeeper456',
                'firstName' => 'James',
                'lastName' => 'Smith',
                'tel' => '+44987654321'
            ],
            [
                'email' => 'manager.newyork@marriott.com',
                'password' => 'hotelkeeper789',
                'firstName' => 'Michael',
                'lastName' => 'Johnson',
                'tel' => '+12123456789'
            ],
            [
                'email' => 'manager.tokyo@ritz.com',
                'password' => 'hotelkeeper321',
                'firstName' => 'Takashi',
                'lastName' => 'Yamamoto',
                'tel' => '+81345678901'
            ],
            [
                'email' => 'manager@doldergrand.com',
                'password' => 'hotelkeeper654',
                'firstName' => 'Hans',
                'lastName' => 'Mueller',
                'tel' => '+41789012345'
            ]
        ];

        foreach ($hotelKeepers as $index => $keeperData) {
            $keeper = new HotelKeeper();
            $keeper->setEmail($keeperData['email']);
            $keeper->setPasswordHash(password_hash($keeperData['password'], PASSWORD_BCRYPT));
            $keeper->setFirstName($keeperData['firstName']);
            $keeper->setLastName($keeperData['lastName']);
            $keeper->setTel($keeperData['tel']);
            $keeper->setCreatedAt(new \DateTimeImmutable());
            
            $manager->persist($keeper);
            $this->addReference('hotel_keeper_' . ($index + 1), $keeper);
        }

        $manager->flush();
    }
}
