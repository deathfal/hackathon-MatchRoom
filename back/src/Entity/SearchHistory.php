<?php

namespace App\Entity;

use App\Repository\SearchHistoryRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: SearchHistoryRepository::class)]
class SearchHistory
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne]
    private ?Traveler $traveler = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $searchedAt = null;

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

    public function getSearchedAt(): ?\DateTimeImmutable
    {
        return $this->searchedAt;
    }

    public function setSearchedAt(\DateTimeImmutable $searchedAt): static
    {
        $this->searchedAt = $searchedAt;

        return $this;
    }
}
