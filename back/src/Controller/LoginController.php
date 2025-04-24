<?php

namespace App\Controller;

use App\Service\TravelerLoginService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Exception\BadCredentialsException;

class LoginController extends AbstractController
{
    private TravelerLoginService $loginService;

    public function __construct(TravelerLoginService $loginService)
    {
        $this->loginService = $loginService;
    }

    #[Route('/api/login/traveler', name: 'app_login_traveler', methods: ['POST'])]
    public function login(Request $request): JsonResponse
    {
        try {
            $data = json_decode($request->getContent(), true);
            if (!$data || !isset($data['email']) || !isset($data['password'])) {
                return new JsonResponse(['error' => 'Invalid JSON or missing fields'], Response::HTTP_BAD_REQUEST);
            }

            $email = $data['email'];
            $password = $data['password'];

            // Authentifier l'utilisateur
            $token = $this->loginService->login($email, $password);

            // Retourner la réponse avec le token
            return new JsonResponse([
                'message' => 'Login successful',
                'token' => $token
            ], Response::HTTP_OK);

        } catch (BadCredentialsException $e) {
            return new JsonResponse([
                'error' => 'Invalid credentials'
            ], Response::HTTP_UNAUTHORIZED);
        } catch (\Exception $e) {
            return new JsonResponse([
                'error' => 'An unexpected error occurred'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
