<?php

namespace App\Controller;

use App\Entity\Hotel;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Contracts\HttpClient\HttpClientInterface;

#[Route('/api/hotel-rooms')]
class HotelRoomController extends AbstractController
{
    private HttpClientInterface $httpClient;

    public function __construct(HttpClientInterface $httpClient)
    {
        $this->httpClient = $httpClient;
    }

    #[Route('/available', name: 'get_available_rooms', methods: ['POST'])]
    public function getAvailableRooms(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (!isset($data['hotelName'])) {
            return new JsonResponse(['error' => 'Hotel name is required'], JsonResponse::HTTP_BAD_REQUEST);
        }

        $hotelName = $data['hotelName'];

        // Find the hotel in the database
        $hotel = $entityManager->getRepository(Hotel::class)->findOneBy(['name' => $hotelName]);

        if (!$hotel) {
            return new JsonResponse(['error' => 'Hotel not found in the database'], JsonResponse::HTTP_NOT_FOUND);
        }

        // Call the Node.js API to get the dataset
        $response = $this->httpClient->request('GET', 'http://host.docker.internal:3000/hotels'); // Remplacez localhost par host.docker.internal
        if ($response->getStatusCode() !== 200) {
            return new JsonResponse(['error' => 'Failed to fetch dataset from API'], JsonResponse::HTTP_INTERNAL_SERVER_ERROR);
        }

        $dataset = $response->toArray();

        // Find the hotel in the dataset (case-insensitive comparison)
        $hotelData = array_filter($dataset, function ($item) use ($hotelName) {
            return strcasecmp($item['hotel']['name'], $hotelName) === 0;
        });

        if (empty($hotelData)) {
            return new JsonResponse(['error' => 'Hotel not found in the datasett'], JsonResponse::HTTP_NOT_FOUND);
        }

        // Extract available rooms
        $hotelDataset = array_values($hotelData)[0]['hotel'];
        $availableRooms = array_filter($hotelDataset['rooms'], function ($room) {
            return $room['validity'] === true;
        });

        $response = [
            'hotelName' => $hotel->getName(),
            'description' => $hotel->getDescription(),
            'location' => $hotel->getLocation(),
            'availableRooms' => array_map(function ($room) {
                return [
                    'averagePrice' => $room['averagePrice']
                ];
            }, $availableRooms)
        ];

        return new JsonResponse($response);
    }
}
