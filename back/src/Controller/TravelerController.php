<?php

namespace App\Controller;

use App\Controller\Trait\ApiResponseTrait;
use App\Dto\TravelerUpdateRequest;
use App\Service\TravelerService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

#[Route('/api/travelers')]
class TravelerController extends AbstractController
{
    use ApiResponseTrait;

    public function __construct(
        private readonly TravelerService $travelerService,
        private readonly SerializerInterface $serializer,
        private readonly ValidatorInterface $validator
    ) {
    }

    #[Route('', methods: ['GET'])]
    public function list(): JsonResponse
    {
        $travelers = $this->travelerService->findAll();
        return $this->successResponse($travelers);
    }

    #[Route('/{id}', methods: ['GET'])]
    public function getOne(int $id): JsonResponse
    {
        try {
            $traveler = $this->travelerService->findById($id);
            return $this->successResponse($traveler);
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), 'TRAVELER_NOT_FOUND', 404);
        }
    }

    #[Route('/search', methods: ['GET'])]
    public function search(Request $request): JsonResponse
    {
        $query = $request->query->get('q');
        if (!$query) {
            return $this->errorResponse('Search query is required', 'INVALID_SEARCH_QUERY');
        }

        $travelers = $this->travelerService->search($query);
        return $this->successResponse($travelers);
    }

    #[Route('/{id}', methods: ['PUT'])]
    public function update(int $id, Request $request): JsonResponse
    {
        try {
            $traveler = $this->travelerService->findById($id);
            
            $updateRequest = $this->serializer->deserialize(
                $request->getContent(),
                TravelerUpdateRequest::class,
                'json'
            );

            $errors = $this->validator->validate($updateRequest);
            if (count($errors) > 0) {
                return $this->errorResponse($errors[0]->getMessage(), 'VALIDATION_ERROR');
            }

            $updatedTraveler = $this->travelerService->update($traveler, $updateRequest);
            return $this->successResponse($updatedTraveler);
        } catch (BadRequestHttpException $e) {
            return $this->errorResponse($e->getMessage(), 'UPDATE_ERROR');
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), 'TRAVELER_NOT_FOUND', 404);
        }
    }

    #[Route('/{id}', methods: ['DELETE'])]
    public function delete(int $id): JsonResponse
    {
        try {
            $this->travelerService->delete($id);
            return $this->successResponse(['message' => 'Traveler deleted successfully']);
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), 'TRAVELER_NOT_FOUND', 404);
        }
    }
}
