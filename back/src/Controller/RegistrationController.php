<?php

namespace App\Controller;

use App\Dto\TravelerRegistrationRequest;
use App\Service\TravelerRegistrationService;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class RegistrationController extends AbstractController
{
    public function __construct(
        private readonly TravelerRegistrationService $registrationService,
        private readonly JWTTokenManagerInterface $jwtManager
    ) {
    }

    #[Route('/api/register/traveler', name: 'app_register_traveler', methods: ['POST'])]
    public function registerTraveler(Request $request): JsonResponse
    {
        try {
            $data = json_decode($request->getContent(), true);
            if (!$data) {
                return new JsonResponse(['error' => 'Invalid JSON'], Response::HTTP_BAD_REQUEST);
            }

            $registrationRequest = new TravelerRegistrationRequest(
                email: $data['email'] ?? '',
                password: $data['password'] ?? '',
                firstName: $data['firstName'] ?? '',
                lastName: $data['lastName'] ?? ''
            );

            // Register the traveler
            $traveler = $this->registrationService->register($registrationRequest);

            // Generate JWT token
            $token = $this->jwtManager->create($traveler);

            // Return success response with token
            return new JsonResponse([
                'message' => 'Traveler registered successfully',
                'id' => $traveler->getId(),
                'token' => $token,
                'user' => [
                    'id' => $traveler->getId(),
                    'email' => $traveler->getEmail(),
                    'firstName' => $traveler->getFirstName(),
                    'lastName' => $traveler->getLastName(),
                    'roles' => $traveler->getRoles()
                ]
            ], Response::HTTP_CREATED);

        } catch (\RuntimeException $e) {
            return new JsonResponse([
                'error' => $e->getMessage()
            ], Response::HTTP_CONFLICT);
        } catch (\Exception $e) {
            return new JsonResponse([
                'error' => 'An unexpected error occurred: ' . $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
