<?php

namespace App\Entity;

use App\Repository\HotelRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: HotelRepository::class)]
class Hotel
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $description = null;

    #[ORM\Column(length: 255)]
    private ?string $location = null;

    #[ORM\ManyToMany(targetEntity: HotelKeeper::class, mappedBy: 'hotels')]
    private Collection $hotelKeepers;

    public function __construct()
    {
        $this->hotelKeepers = new ArrayCollection();
    }

    public function getId(): ?int
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

    public function getHotelKeepers(): Collection
    {
        return $this->hotelKeepers;
    }

    public function addHotelKeeper(HotelKeeper $hotelKeeper): static
    {
        if (!$this->hotelKeepers->contains($hotelKeeper)) {
            $this->hotelKeepers->add($hotelKeeper);
            $hotelKeeper->addHotel($this);
        }
        return $this;
    }

    public function removeHotelKeeper(HotelKeeper $hotelKeeper): static
    {
        if ($this->hotelKeepers->removeElement($hotelKeeper)) {
            $hotelKeeper->removeHotel($this);
        }
        return $this;
    }
}
