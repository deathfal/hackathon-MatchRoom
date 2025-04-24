"use client"

import { useState } from "react"
import { User, Building, Clock, MessageSquare, Trash2, Check, X, MoreVertical, Search, Bell } from "lucide-react"
import BottomMenu from "../components/bottom-menu"

export default function DashboardAdmin() {
  const [activeTab, setActiveTab] = useState("hotels")


  const hotels = [
    { id: 1, name: "Hôtel Splendid", location: "Paris", rating: 4.8, rooms: 45, status: "actif" },
    { id: 2, name: "Grand Hôtel", location: "Lyon", rating: 4.5, rooms: 78, status: "actif" },
    { id: 3, name: "Hôtel de la Mer", location: "Marseille", rating: 4.2, rooms: 35, status: "actif" },
    { id: 4, name: "Résidence du Port", location: "Nice", rating: 4.6, rooms: 22, status: "suspendu" },
  ]

  const clients = [
    { id: 1, name: "Marie Dupont", email: "marie@example.com", reservations: 8, lastActive: "2 jours" },
    { id: 2, name: "Paul Martin", email: "paul@example.com", reservations: 3, lastActive: "5 jours" },
    { id: 3, name: "Sophie Moreau", email: "sophie@example.com", reservations: 12, lastActive: "1 jour" },
    { id: 4, name: "Thomas Bernard", email: "thomas@example.com", reservations: 0, lastActive: "30 jours" },
  ]

  const hotelApplications = [
    { id: 1, hotelName: "Villa Boréale", managerName: "Antoine Durand", location: "Chamonix", date: "12/05/2023" },
    { id: 2, hotelName: "Auberge du Soleil", managerName: "Claire Lefebvre", location: "Aix-en-Provence", date: "16/05/2023" },
    { id: 3, hotelName: "Le Petit Palais", managerName: "Nicolas Martin", location: "Bordeaux", date: "18/05/2023" },
  ]

  const comments = [
    { 
      id: 1, 
      user: "Jean Dupuis", 
      hotel: "Hôtel Splendid", 
      rating: 2, 
      content: "Service terrible, personnel désagréable.", 
      date: "10/05/2023",
      flagged: true
    },
    { 
      id: 2, 
      user: "Alice Mercier", 
      hotel: "Grand Hôtel", 
      rating: 5, 
      content: "Excellent séjour, tout était parfait !", 
      date: "13/05/2023",
      flagged: false
    },
    { 
      id: 3, 
      user: "Michel Blanc", 
      hotel: "Hôtel de la Mer", 
      rating: 3, 
      content: "Correct mais le petit-déjeuner laisse à désirer.", 
      date: "15/05/2023",
      flagged: false
    },
  ]

  const handleDeleteHotel = (id: number) => {
    console.log(`Suppression de l'hôtel ${id}`)
  }

  const handleDeleteClient = (id: number) => {
    console.log(`Suppression du client ${id}`)
  }

  const handleApproveApplication = (id: number) => {
    console.log(`Approbation de la demande ${id}`)
  }

  const handleRejectApplication = (id: number) => {
    console.log(`Rejet de la demande ${id}`)
  }

  const handleDeleteComment = (id: number) => {
    console.log(`Suppression du commentaire ${id}`)
  }

  const handleApproveComment = (id: number) => {
    console.log(`Approbation du commentaire ${id}`)
  }

  return (
    <div className="flex flex-col h-screen bg-white">
      <div className="flex-1 p-4 flex flex-col pb-16">
        <div className="flex items-center mb-4">
          <div className="flex-1 mr-4 flex items-center">
            <div className="relative mr-2 w-full max-w-md">
              <input
                type="text"
                placeholder="Rechercher..."
                className="w-full bg-gray-200 h-10 rounded-full pl-10 pr-4"
              />
              <Search className="absolute left-3 top-2 text-gray-500 w-4 h-4" />
            </div>
          </div>
          <div className="relative">
            <Bell className="w-6 h-6 text-gray-600" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </div>
          <div className="w-8 h-8 bg-blue-600 rounded-full ml-3 flex items-center justify-center text-white text-xs font-bold">
            AD
          </div>
        </div>

        <div className="bg-gray-200 rounded-lg p-4 mb-4">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-xl font-bold">Panneau d'administration</h1>
              <div className="flex items-center mt-2">
                <span className="text-sm">{hotelApplications.length} nouvelles demandes en attente</span>
                <Clock className="w-4 h-4 ml-2" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex mb-4 border-b">
          <button
            onClick={() => setActiveTab("hotels")}
            className={`px-4 py-2 ${activeTab === "hotels" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-600"}`}
          >
            <div className="flex items-center">
              <Building className="w-4 h-4 mr-2" />
              <span>Hôtels</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab("clients")}
            className={`px-4 py-2 ${activeTab === "clients" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-600"}`}
          >
            <div className="flex items-center">
              <User className="w-4 h-4 mr-2" />
              <span>Clients</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab("applications")}
            className={`px-4 py-2 ${activeTab === "applications" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-600"}`}
          >
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              <span>Demandes</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab("comments")}
            className={`px-4 py-2 ${activeTab === "comments" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-600"}`}
          >
            <div className="flex items-center">
              <MessageSquare className="w-4 h-4 mr-2" />
              <span>Avis</span>
            </div>
          </button>
        </div>

        <div className="flex-1 overflow-auto">
          {activeTab === "hotels" && (
            <div className="bg-white rounded-lg shadow-md">
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-lg font-medium text-gray-700">Liste des hôtels</h2>
                <button className="bg-blue-500 text-white text-sm px-4 py-1 rounded-md">
                  + Ajouter un hôtel
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Localisation</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Note</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chambres</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {hotels.map((hotel) => (
                      <tr key={hotel.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{hotel.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{hotel.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{hotel.location}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{hotel.rating}/5</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{hotel.rooms}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${hotel.status === 'actif' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {hotel.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button 
                            onClick={() => handleDeleteHotel(hotel.id)} 
                            className="text-red-600 hover:text-red-900 mr-2"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <button className="text-gray-600 hover:text-gray-900">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "clients" && (
            <div className="bg-white rounded-lg shadow-md">
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-lg font-medium text-gray-700">Liste des clients</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Réservations</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dernière activité</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {clients.map((client) => (
                      <tr key={client.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{client.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{client.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{client.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{client.reservations}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Il y a {client.lastActive}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button 
                            onClick={() => handleDeleteClient(client.id)} 
                            className="text-red-600 hover:text-red-900 mr-2"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <button className="text-gray-600 hover:text-gray-900">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "applications" && (
            <div className="bg-white rounded-lg shadow-md">
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-lg font-medium text-gray-700">Demandes d'inscription hôtelières</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom de l'établissement</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Responsable</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Localisation</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {hotelApplications.map((application) => (
                      <tr key={application.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{application.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{application.hotelName}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{application.managerName}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{application.location}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{application.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            <button 
                              onClick={() => handleApproveApplication(application.id)} 
                              className="bg-green-500 hover:bg-green-600 text-white p-1 rounded"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleRejectApplication(application.id)} 
                              className="bg-red-500 hover:bg-red-600 text-white p-1 rounded"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "comments" && (
            <div className="bg-white rounded-lg shadow-md">
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-lg font-medium text-gray-700">Gestion des avis clients</h2>
                <div>
                  <select className="border rounded px-2 py-1 text-sm text-gray-600">
                    <option>Tous les avis</option>
                    <option>Avis signalés</option>
                    <option>Note &lt; 3</option>
                  </select>
                </div>
              </div>
              <div className="p-4 space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className={`p-4 rounded-lg border ${comment.flagged ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}>
                    <div className="flex justify-between mb-2">
                      <div>
                        <span className="font-medium">{comment.user}</span>
                        <span className="text-gray-500 text-sm ml-2">sur {comment.hotel}</span>
                      </div>
                      <div className="flex items-center">
                        <div className="text-amber-500 flex items-center">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span key={i} className={i < comment.rating ? "text-amber-500" : "text-gray-300"}>★</span>
                          ))}
                        </div>
                        <span className="text-gray-500 text-sm ml-2">{comment.date}</span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-2">{comment.content}</p>
                    <div className="flex justify-end space-x-2">
                      <button 
                        onClick={() => handleDeleteComment(comment.id)} 
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      {comment.flagged && (
                        <button 
                          onClick={() => handleApproveComment(comment.id)} 
                          className="text-green-600 hover:text-green-900"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <BottomMenu />
    </div>
  )
}
