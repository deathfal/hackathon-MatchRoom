<?php

namespace App\DataFixtures;

use App\Entity\HotelGroup;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class HotelGroupFixtures extends Fixture
{
    public const ACCOR_REFERENCE = 'hotel-group-accor';
    public const MARRIOTT_REFERENCE = 'hotel-group-marriott';
    public const HILTON_REFERENCE = 'hotel-group-hilton';
    public const IHG_REFERENCE = 'hotel-group-ihg';

    public function load(ObjectManager $manager): void
    {
        $hotelGroups = [
            [
                'name' => 'Accor Hotels',
                'description' => 'A French multinational hospitality company that owns, manages and franchises hotels, resorts and vacation properties.',
                'logoUrl' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Accor_logo.svg/2560px-Accor_logo.svg.png',
                'reference' => self::ACCOR_REFERENCE
            ],
            [
                'name' => 'Marriott International',
                'description' => 'An American multinational company that operates, franchises, and licenses lodging including hotels, residential, and timeshare properties.',
                'logoUrl' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Marriott_Logo.svg/2560px-Marriott_Logo.svg.png',
                'reference' => self::MARRIOTT_REFERENCE
            ],
            [
                'name' => 'Hilton Worldwide',
                'description' => 'An American multinational hospitality company that manages and franchises a broad portfolio of hotels and resorts.',
                'logoUrl' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Hilton_Hotels_%26_Resorts_logo.svg/2560px-Hilton_Hotels_%26_Resorts_logo.svg.png',
                'reference' => self::HILTON_REFERENCE
            ],
            [
                'name' => 'InterContinental Hotels Group (IHG)',
                'description' => 'A British multinational hospitality company headquartered in Denham, Buckinghamshire.',
                'logoUrl' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/IHG_logo.svg/2560px-IHG_logo.svg.png',
                'reference' => self::IHG_REFERENCE
            ]
        ];

        foreach ($hotelGroups as $groupData) {
            $group = new HotelGroup();
            $group->setName($groupData['name']);
            $group->setDescription($groupData['description']);
            $group->setLogoUrl($groupData['logoUrl']);
            
            $manager->persist($group);
            $this->addReference($groupData['reference'], $group);
        }

        $manager->flush();
    }
}
