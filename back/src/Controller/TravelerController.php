<?php

namespace App\Controller;

<<<<<<< HEAD
use App\Entity\Traveler;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
=======
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
>>>>>>> back-adam

#[Route('/api/travelers')]
class TravelerController extends AbstractController
{
<<<<<<< HEAD
    #[Route('/', name: 'get_travelers', methods: ['GET'])]
    public function index(EntityManagerInterface $entityManager): JsonResponse
    {
        $travelers = $entityManager->getRepository(Traveler::class)->findAll();

        $data = array_map(function (Traveler $traveler) {
            return [
                'id' => $traveler->getId(),
                'email' => $traveler->getEmail(),
                'firstName' => $traveler->getFirstName(),
                'lastName' => $traveler->getLastName(),
                'tel' => $traveler->getTel(),
                'createdAt' => $traveler->getCreatedAt()->format('Y-m-d H:i:s'),
            ];
        }, $travelers);

        return new JsonResponse($data);
    }

    #[Route('/{id}', name: 'get_traveler', methods: ['GET'])]
    public function show(Traveler $traveler): JsonResponse
    {
        $data = [
            'id' => $traveler->getId(),
            'email' => $traveler->getEmail(),
            'firstName' => $traveler->getFirstName(),
            'lastName' => $traveler->getLastName(),
            'tel' => $traveler->getTel(),
            'createdAt' => $traveler->getCreatedAt()->format('Y-m-d H:i:s'),
        ];

        return new JsonResponse($data);
    }

    #[Route('/', name: 'create_traveler', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (!isset($data['email'], $data['firstName'], $data['lastName'])) {
            return new JsonResponse(['error' => 'Invalid data'], JsonResponse::HTTP_BAD_REQUEST);
        }

        $traveler = new Traveler();
        $traveler->setEmail($data['email']);
        $traveler->setFirstName($data['firstName']);
        $traveler->setLastName($data['lastName']);
        $traveler->setTel($data['tel'] ?? null);

        $entityManager->persist($traveler);
        $entityManager->flush();

        return new JsonResponse(['message' => 'Traveler created successfully'], JsonResponse::HTTP_CREATED);
    }

    #[Route('/{id}', name: 'update_traveler', methods: ['PUT'])]
    public function update(Request $request, Traveler $traveler, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (isset($data['email'])) {
            $traveler->setEmail($data['email']);
        }
        if (isset($data['firstName'])) {
            $traveler->setFirstName($data['firstName']);
        }
        if (isset($data['lastName'])) {
            $traveler->setLastName($data['lastName']);
        }
        if (isset($data['tel'])) {
            $traveler->setTel($data['tel']);
        }

        $entityManager->flush();

        return new JsonResponse(['message' => 'Traveler updated successfully']);
    }

    #[Route('/{id}', name: 'delete_traveler', methods: ['DELETE'])]
    public function delete(Traveler $traveler, EntityManagerInterface $entityManager): JsonResponse
    {
        $entityManager->remove($traveler);
        $entityManager->flush();

        return new JsonResponse(['message' => 'Traveler deleted successfully']);
    }
}
=======
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
>>>>>>> back-adam
