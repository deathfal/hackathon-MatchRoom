<?php

namespace App\Entity;

use App\Repository\MessageRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Uid\Uuid;

#[ORM\Entity(repositoryClass: MessageRepository::class)]
class Message
{
    #[ORM\Id]
    #[ORM\Column(type: 'uuid', unique: true)]
    #[ORM\GeneratedValue(strategy: 'CUSTOM')]
    #[ORM\CustomIdGenerator(class: 'doctrine.uuid_generator')]
    private ?Uuid $id = null;

    #[ORM\ManyToOne(targetEntity: Traveler::class)]
    #[ORM\JoinColumn(nullable: false)]
    private ?Traveler $senderTraveler = null;

    #[ORM\ManyToOne(targetEntity: HotelKeeper::class)]
    #[ORM\JoinColumn(nullable: false)]
    private ?HotelKeeper $receiverHotelKeeper = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $message = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $sentAt = null;

    public function __construct()
    {
        $this->id = Uuid::v4();
        $this->sentAt = new \DateTimeImmutable();
    }

    public function getId(): ?Uuid
    {
        return $this->id;
    }

    public function getSenderTraveler(): ?Traveler
    {
        return $this->senderTraveler;
    }

    public function setSenderTraveler(?Traveler $senderTraveler): static
    {
        $this->senderTraveler = $senderTraveler;
        return $this;
    }

    public function getReceiverHotelKeeper(): ?HotelKeeper
    {
        return $this->receiverHotelKeeper;
    }

    public function setReceiverHotelKeeper(?HotelKeeper $receiverHotelKeeper): static
    {
        $this->receiverHotelKeeper = $receiverHotelKeeper;
        return $this;
    }

    public function getMessage(): ?string
    {
        return $this->message;
    }

    public function setMessage(?string $message): static
    {
        $this->message = $message;
        return $this;
    }

    public function getSentAt(): ?\DateTimeImmutable
    {
        return $this->sentAt;
    }

    public function setSentAt(\DateTimeImmutable $sentAt): static
    {
        $this->sentAt = $sentAt;
        return $this;
    }
}
