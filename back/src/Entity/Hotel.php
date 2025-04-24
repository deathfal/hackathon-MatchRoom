<?php

namespace App\Entity;

use App\Repository\HotelRepository;
use App\Entity\HotelGroup;
use App\Entity\HotelKeeper;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Uid\Uuid;

#[ORM\Entity(repositoryClass: HotelRepository::class)]
class Hotel
{
    #[ORM\Id]
    #[ORM\Column(type: 'uuid', unique: true)]
    private ?Uuid $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $description = null;

    #[ORM\Column(length: 255)]
    private ?string $location = null;

    #[ORM\ManyToOne(targetEntity: HotelGroup::class)]
    private ?HotelGroup $hotelGroup = null;

    #[ORM\OneToOne(targetEntity: HotelKeeper::class)]
    #[ORM\JoinColumn(nullable: true)]
    private ?HotelKeeper $hotelKeeper = null;

    public function __construct()
    {
        $this->id = Uuid::v4();
    }

    public function getId(): ?Uuid
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;
        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;
        return $this;
    }

    public function getLocation(): ?string
    {
        return $this->location;
    }

    public function setLocation(string $location): static
    {
        $this->location = $location;
        return $this;
    }

    public function getHotelKeeper(): ?HotelKeeper
    {
        return $this->hotelKeeper;
    }

    public function setHotelKeeper(?HotelKeeper $hotelKeeper): static
    {
        $this->hotelKeeper = $hotelKeeper;
        return $this;
    }

    public function getHotelGroup(): ?HotelGroup
    {
        return $this->hotelGroup;
    }

    public function setHotelGroup(?HotelGroup $hotelGroup): static
    {
        $this->hotelGroup = $hotelGroup;
        return $this;
    }
}
