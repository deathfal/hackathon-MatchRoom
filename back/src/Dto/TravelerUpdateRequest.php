<?php

namespace App\Dto;

use Symfony\Component\Validator\Constraints as Assert;

class TravelerUpdateRequest
{
    public function __construct(
        #[Assert\Email(message: 'The email {{ value }} is not a valid email.')]
        public readonly ?string $email = null,

        #[Assert\Length(min: 6, minMessage: 'Password must be at least {{ limit }} characters long')]
        public readonly ?string $newPassword = null,

        #[Assert\NotBlank(message: 'Current password is required when updating sensitive information')]
        public readonly ?string $currentPassword = null,

        #[Assert\Length(min: 2, max: 100, minMessage: 'First name must be at least {{ limit }} characters long')]
        public readonly ?string $firstName = null,

        #[Assert\Length(min: 2, max: 100, minMessage: 'Last name must be at least {{ limit }} characters long')]
        public readonly ?string $lastName = null,

        public readonly ?string $tel = null,
    ) {
    }
}
