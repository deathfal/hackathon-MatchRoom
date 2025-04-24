<?php

namespace App\DataFixtures;

use App\Entity\Hotel;
use App\Entity\HotelGroup;
use App\Entity\HotelKeeper;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class HotelFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        $hotels = [
            // Accor Hotels
            [
                'name' => 'Sofitel Paris Le Faubourg',
                'description' => 'Luxury hotel in the heart of Paris, steps from Place de la Concorde.',
                'location' => '15 Rue Boissy d\'Anglas, 75008 Paris, France',
                'group' => HotelGroupFixtures::ACCOR_REFERENCE
            ],
            [
                'name' => 'Novotel London Waterloo',
                'description' => 'Contemporary 4-star hotel near the Thames River and Westminster.',
                'location' => '113 Lambeth Rd, London SE1 7LS, UK',
                'group' => HotelGroupFixtures::ACCOR_REFERENCE
            ],
            
            // Marriott Hotels
            [
                'name' => 'JW Marriott Essex House New York',
                'description' => 'Luxury hotel overlooking Central Park with Art Deco touches.',
                'location' => '160 Central Park S, New York, NY 10019, USA',
                'group' => HotelGroupFixtures::MARRIOTT_REFERENCE
            ],
            [
                'name' => 'The Ritz-Carlton, Tokyo',
                'description' => 'Occupying the top nine floors of the Midtown Tower, this luxury hotel offers spectacular views of Tokyo.',
                'location' => 'Tokyo Midtown, 9-7-1 Akasaka, Minato-ku, Tokyo 107-6245, Japan',
                'group' => HotelGroupFixtures::MARRIOTT_REFERENCE
            ],

            // Hilton Hotels
            [
                'name' => 'Waldorf Astoria Amsterdam',
                'description' => 'Set in six 17th-century canal palaces, this luxury hotel offers elegance and Dutch heritage.',
                'location' => 'Herengracht 542-556, 1017 CG Amsterdam, Netherlands',
                'group' => HotelGroupFixtures::HILTON_REFERENCE
            ],
            [
                'name' => 'Conrad Maldives Rangali Island',
                'description' => 'Luxury resort featuring the world\'s first underwater villa and restaurant.',
                'location' => 'Rangali Island 20077, Maldives',
                'group' => HotelGroupFixtures::HILTON_REFERENCE
            ],

            // IHG Hotels
            [
                'name' => 'InterContinental Dubai Marina',
                'description' => 'Waterfront hotel in Dubai Marina with luxury amenities.',
                'location' => 'King Salman Bin Abdulaziz Al Saud St, Dubai Marina, Dubai, UAE',
                'group' => HotelGroupFixtures::IHG_REFERENCE
            ],

            // Independent Hotels
            [
                'name' => 'The Dolder Grand',
                'description' => 'Historic luxury hotel overlooking Zurich with a world-class spa.',
                'location' => 'Kurhausstrasse 65, 8032 Zürich, Switzerland',
                'group' => null
            ],
            [
                'name' => 'Château Marmont',
                'description' => 'Iconic Hollywood hotel known for its celebrity clientele and old-world charm.',
                'location' => '8221 Sunset Blvd, Los Angeles, CA 90046, USA',
                'group' => null
            ],
            [
                'name' => 'Aman Tokyo',
                'description' => 'Urban sanctuary offering traditional Japanese aesthetics with contemporary luxury.',
                'location' => 'The Otemachi Tower, 1-5-6 Otemachi, Chiyoda-ku, Tokyo 100-0004, Japan',
                'group' => null
            ]
        ];

        foreach ($hotels as $index => $hotelData) {
            $hotel = new Hotel();
            $hotel->setName($hotelData['name']);
            $hotel->setDescription($hotelData['description']);
            $hotel->setLocation($hotelData['location']);
            
            if ($hotelData['group']) {
                $hotel->setHotelGroup($this->getReference($hotelData['group'], HotelGroup::class));
            }

            // Add hotel keeper if we haven't used all keepers yet
            if ($index < 3) { // We only have 3 hotel keepers
                $hotelKeeper = $this->getReference('hotel_keeper_' . ($index + 1), HotelKeeper::class);
                $hotel->setHotelKeeper($hotelKeeper);
            }
            
            $manager->persist($hotel);
        }

        $manager->flush();
    }

    public function getDependencies(): array
    {
        return [
            HotelGroupFixtures::class,
            HotelKeeperFixtures::class,
        ];
    }
}
