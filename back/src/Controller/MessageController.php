<?php

namespace App\Controller;

use App\Entity\Message;
use App\Entity\Traveler;
use App\Entity\HotelKeeper;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/messages')]
class MessageController extends AbstractController
{
    #[Route('/', name: 'get_messages', methods: ['GET'])]
    public function index(EntityManagerInterface $entityManager): JsonResponse
    {
        $messages = $entityManager->getRepository(Message::class)->findAll();

        $data = array_map(function (Message $message) {
            return [
                'id' => $message->getId(),
                'senderTraveler' => $message->getSenderTraveler()?->getId(),
                'receiverHotelKeeper' => $message->getReceiverHotelKeeper()?->getId(),
                'message' => $message->getMessage(),
                'sentAt' => $message->getSentAt()->format('Y-m-d H:i:s'),
            ];
        }, $messages);

        return new JsonResponse($data);
    }

    #[Route('/{id}', name: 'get_message', methods: ['GET'])]
    public function show(Message $message): JsonResponse
    {
        $data = [
            'id' => $message->getId(),
            'senderTraveler' => $message->getSenderTraveler()?->getId(),
            'receiverHotelKeeper' => $message->getReceiverHotelKeeper()?->getId(),
            'message' => $message->getMessage(),
            'sentAt' => $message->getSentAt()->format('Y-m-d H:i:s'),
        ];

        return new JsonResponse($data);
    }

    #[Route('/', name: 'create_message', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (!isset($data['senderTravelerId'], $data['receiverHotelKeeperId'], $data['message'])) {
            return new JsonResponse(['error' => 'Invalid data'], JsonResponse::HTTP_BAD_REQUEST);
        }

        $senderTraveler = $entityManager->getRepository(Traveler::class)->find($data['senderTravelerId']);
        $receiverHotelKeeper = $entityManager->getRepository(HotelKeeper::class)->find($data['receiverHotelKeeperId']);

        if (!$senderTraveler || !$receiverHotelKeeper) {
            return new JsonResponse(['error' => 'Invalid sender or receiver'], JsonResponse::HTTP_BAD_REQUEST);
        }

        $message = new Message();
        $message->setSenderTraveler($senderTraveler);
        $message->setReceiverHotelKeeper($receiverHotelKeeper);
        $message->setMessage($data['message']);
        $message->setSentAt(new \DateTimeImmutable());

        $entityManager->persist($message);
        $entityManager->flush();

        return new JsonResponse(['message' => 'Message created successfully'], JsonResponse::HTTP_CREATED);
    }

    #[Route('/{id}', name: 'update_message', methods: ['PUT'])]
    public function update(Request $request, Message $message, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (isset($data['message'])) {
            $message->setMessage($data['message']);
        }

        $entityManager->flush();

        return new JsonResponse(['message' => 'Message updated successfully']);
    }

    #[Route('/{id}', name: 'delete_message', methods: ['DELETE'])]
    public function delete(Message $message, EntityManagerInterface $entityManager): JsonResponse
    {
        $entityManager->remove($message);
        $entityManager->flush();

        return new JsonResponse(['message' => 'Message deleted successfully']);
    }
}