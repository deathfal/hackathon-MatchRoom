<?php

namespace App\Entity;

use App\Repository\UserBadgeRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: UserBadgeRepository::class)]
class UserBadge
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne]
    private ?Traveler $traveler = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    private ?Badge $badge = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $awardedAt = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTraveler(): ?Traveler
    {
        return $this->traveler;
    }

    public function setTraveler(?Traveler $traveler): static
    {
        $this->traveler = $traveler;

        return $this;
    }

    public function getBadge(): ?Badge
    {
        return $this->badge;
    }

    public function setBadge(?Badge $badge): static
    {
        $this->badge = $badge;

        return $this;
    }

    public function getAwardedAt(): ?\DateTimeInterface
    {
        return $this->awardedAt;
    }

    public function setAwardedAt(?\DateTimeInterface $awardedAt): static
    {
        $this->awardedAt = $awardedAt;

        return $this;
    }
}
