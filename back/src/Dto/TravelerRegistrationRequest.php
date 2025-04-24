<?php

namespace App\Dto;

use Symfony\Component\Validator\Constraints as Assert;

class TravelerRegistrationRequest
{
    public function __construct(
        #[Assert\NotBlank]
        #[Assert\Email]
        public readonly string $email,

        #[Assert\NotBlank]
        #[Assert\Length(min: 6)]
        public readonly string $password,

        #[Assert\NotBlank]
        #[Assert\Length(min: 2, max: 100)]
        public readonly string $firstName,

        #[Assert\NotBlank]
        #[Assert\Length(min: 2, max: 100)]
        public readonly string $lastName,
    ) {
    }
}
