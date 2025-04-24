<?php

namespace App\Controller;

use App\Entity\Message;
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
                'senderId' => $message->getSenderId(),
                'receiverId' => $message->getReceiverId(),
                'senderType' => $message->getSenderType(),
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
            'senderId' => $message->getSenderId(),
            'receiverId' => $message->getReceiverId(),
            'senderType' => $message->getSenderType(),
            'message' => $message->getMessage(),
            'sentAt' => $message->getSentAt()->format('Y-m-d H:i:s'),
        ];

        return new JsonResponse($data);
    }

    #[Route('/', name: 'create_message', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (!isset($data['senderId'], $data['receiverId'], $data['senderType'], $data['message'])) {
            return new JsonResponse(['error' => 'Invalid data'], JsonResponse::HTTP_BAD_REQUEST);
        }

        $message = new Message();
        $message->setSenderId($data['senderId']);
        $message->setReceiverId($data['receiverId']);
        $message->setSenderType($data['senderType']);
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

        if (isset($data['senderId'])) {
            $message->setSenderId($data['senderId']);
        }
        if (isset($data['receiverId'])) {
            $message->setReceiverId($data['receiverId']);
        }
        if (isset($data['senderType'])) {
            $message->setSenderType($data['senderType']);
        }
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