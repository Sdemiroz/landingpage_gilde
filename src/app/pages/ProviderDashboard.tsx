import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/avatar";
import { Hammer, Star, Euro, TrendingUp, Calendar, MapPin, CheckCircle } from "lucide-react";
import { mockProviders, mockTasks } from "../data/mockData";

export function ProviderDashboard() {
  const navigate = useNavigate();
  const provider = mockProviders[0]; // Current logged in provider
  
  const stats = [
    {
      icon: Euro,
      label: "Monatlicher Verdienst",
      value: "2.450€",
      change: "+12%",
    },
    {
      icon: CheckCircle,
      label: "Abgeschlossene Jobs",
      value: provider.completedJobs,
      change: "+8",
    },
    {
      icon: Star,
      label: "Bewertung",
      value: provider.rating,
      change: "Sehr gut",
    },
    {
      icon: TrendingUp,
      label: "Erfolgsrate",
      value: "94%",
      change: "+2%",
    },
  ];

  const activeBookings = [
    {
      id: "1",
      task: "IKEA Kleiderschrank montieren",
      customer: "Lisa K.",
      location: "Stuttgart-Mitte",
      date: "2026-03-13",
      price: 95,
      status: "confirmed",
    },
    {
      id: "2",
      task: "Wandregal anbringen",
      customer: "Max B.",
      location: "Stuttgart-West",
      date: "2026-03-14",
      price: 75,
      status: "in_progress",
    },
  ];

  const availableTasks = mockTasks.filter((task) => task.status === "open");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Hammer className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">HAND</span>
              <Badge variant="secondary" className="ml-2">Dienstleister</Badge>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="ghost">Startseite</Button>
              </Link>
              <Avatar className="h-10 w-10 cursor-pointer">
                <AvatarImage src={provider.avatar} />
                <AvatarFallback>{provider.name[0]}</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl mb-2">Willkommen zurück, {provider.name}!</h1>
          <p className="text-gray-600">Hier ist eine Übersicht deiner Aktivitäten</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <stat.icon className="h-8 w-8 text-blue-600" />
                <Badge variant="secondary">{stat.change}</Badge>
              </div>
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="bookings" className="space-y-6">
          <TabsList>
            <TabsTrigger value="bookings">Meine Buchungen</TabsTrigger>
            <TabsTrigger value="available">Verfügbare Aufträge</TabsTrigger>
            <TabsTrigger value="profile">Profil</TabsTrigger>
          </TabsList>

          {/* Active Bookings */}
          <TabsContent value="bookings" className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl">Aktive Buchungen ({activeBookings.length})</h2>
            </div>

            {activeBookings.map((booking) => (
              <Card key={booking.id} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-lg font-semibold">{booking.task}</h3>
                      <Badge className={
                        booking.status === "confirmed"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-green-100 text-green-700"
                      }>
                        {booking.status === "confirmed" ? "Bestätigt" : "In Arbeit"}
                      </Badge>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback>{booking.customer[0]}</AvatarFallback>
                        </Avatar>
                        <span>{booking.customer}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{booking.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(booking.date).toLocaleDateString("de-DE")}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right ml-4">
                    <div className="text-2xl font-bold text-blue-600 mb-2">
                      {booking.price}€
                    </div>
                    <Button size="sm">
                      {booking.status === "confirmed" ? "Details" : "Als erledigt markieren"}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}

            {activeBookings.length === 0 && (
              <Card className="p-8 text-center">
                <p className="text-gray-600 mb-4">Keine aktiven Buchungen</p>
                <Button onClick={() => navigate("/provider/browse")}>
                  Verfügbare Aufträge ansehen
                </Button>
              </Card>
            )}
          </TabsContent>

          {/* Available Tasks */}
          <TabsContent value="available" className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl">Verfügbare Aufträge in deiner Nähe</h2>
              <Button onClick={() => navigate("/provider/browse")}>
                Alle durchsuchen
              </Button>
            </div>

            {availableTasks.slice(0, 3).map((task) => (
              <Card key={task.id} className="p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-lg font-semibold">{task.title}</h3>
                      <Badge variant="secondary">{task.category}</Badge>
                    </div>
                    
                    <p className="text-gray-700 mb-4">{task.description}</p>

                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{task.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(task.createdAt).toLocaleDateString("de-DE")}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right ml-4">
                    <div className="text-sm text-gray-600 mb-1">Vorgeschlagener Preis</div>
                    <div className="text-xl font-bold text-blue-600 mb-3">
                      {task.suggestedPrice.min}€ - {task.suggestedPrice.max}€
                    </div>
                    <Button onClick={() => navigate(`/provider/offer/${task.id}`)}>
                      Angebot abgeben
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          {/* Profile */}
          <TabsContent value="profile">
            <Card className="p-8">
              <div className="flex items-start gap-6 mb-8">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={provider.avatar} />
                  <AvatarFallback>{provider.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl font-bold">{provider.name}</h2>
                    {provider.verified && (
                      <Badge className="bg-blue-100 text-blue-700">
                        Verifiziert
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{provider.rating}</span>
                    <span className="text-gray-600">({provider.reviewCount} Bewertungen)</span>
                  </div>
                  <p className="text-gray-700 mb-4">{provider.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {provider.skills.map((skill, idx) => (
                      <Badge key={idx} variant="secondary">{skill}</Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-semibold mb-3">Arbeitsbereich</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Standort</span>
                      <span className="font-medium">{provider.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Radius</span>
                      <span className="font-medium">{provider.radius} km</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Stundensatz</span>
                      <span className="font-medium">{provider.hourlyRate}€/Std</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Statistiken</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Abgeschlossene Jobs</span>
                      <span className="font-medium">{provider.completedJobs}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Bewertung</span>
                      <span className="font-medium">{provider.rating} / 5.0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Mitglied seit</span>
                      <span className="font-medium">Januar 2024</span>
                    </div>
                  </div>
                </div>
              </div>

              <Button>Profil bearbeiten</Button>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
