<?php

namespace App\Controller\Trait;

use Symfony\Component\HttpFoundation\JsonResponse;

trait ApiResponseTrait
{
    protected function successResponse(mixed $data, int $status = 200): JsonResponse
    {
        return new JsonResponse([
            'success' => true,
            'data' => $data
        ], $status);
    }

    protected function errorResponse(string $message, string $code, int $status = 400): JsonResponse
    {
        return new JsonResponse([
            'success' => false,
            'error' => [
                'message' => $message,
                'code' => $code
            ]
        ], $status);
    }
}
