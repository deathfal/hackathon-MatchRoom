<?php

namespace App\Entity;

use App\Repository\UserBadgeRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: UserBadgeRepository::class)]
class UserBadge
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne]
    private ?Traveler $travelerÂ_id = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    private ?badge $badge_id = null;

    #[ORM\Column(nullable: true)]
    private ?\DateTimeImmutable $awardedAt = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTravelerÂId(): ?Traveler
    {
        return $this->travelerÂ_id;
    }

    public function setTravelerÂId(?Traveler $travelerÂ_id): static
    {
        $this->travelerÂ_id = $travelerÂ_id;

        return $this;
    }

    public function getBadgeId(): ?badge
    {
        return $this->badge_id;
    }

    public function setBadgeId(?badge $badge_id): static
    {
        $this->badge_id = $badge_id;

        return $this;
    }

    public function getAwardedAt(): ?\DateTimeImmutable
    {
        return $this->awardedAt;
    }

    public function setAwardedAt(?\DateTimeImmutable $awardedAt): static
    {
        $this->awardedAt = $awardedAt;

        return $this;
    }
}
