import { Link, useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Hammer, Plus, Calendar, MapPin, Euro, MessageSquare, Star } from "lucide-react";
import { mockTasks } from "../data/mockData";

export function CustomerDashboard() {
  const navigate = useNavigate();
  
  const myTasks = [
    {
      id: "1",
      title: "IKEA Kleiderschrank montieren",
      status: "offers_received",
      offerCount: 3,
      location: "Stuttgart-Mitte",
      createdAt: "2026-03-10",
      price: { min: 80, max: 120 },
    },
    {
      id: "5",
      title: "Bilder aufhängen",
      status: "confirmed",
      provider: "Anna Müller",
      location: "Stuttgart-West",
      date: "2026-03-15",
      price: 65,
    },
    {
      id: "6",
      title: "Wohnzimmer streichen",
      status: "completed",
      provider: "Michael Schmidt",
      location: "Stuttgart-Süd",
      completedAt: "2026-03-08",
      price: 320,
      rating: 5,
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "offers_received":
        return <Badge className="bg-blue-100 text-blue-700">3 Angebote erhalten</Badge>;
      case "confirmed":
        return <Badge className="bg-green-100 text-green-700">Bestätigt</Badge>;
      case "completed":
        return <Badge className="bg-gray-100 text-gray-700">Abgeschlossen</Badge>;
      default:
        return <Badge>Offen</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Hammer className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">HAND</span>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="ghost">Startseite</Button>
              </Link>
              <Link to="/create-task">
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Neuer Auftrag
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl mb-2">Meine Aufträge</h1>
          <p className="text-gray-600">Verwalte deine Aufträge und finde die besten Dienstleister</p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Aktive Aufträge</p>
                <p className="text-2xl font-bold">2</p>
              </div>
              <Calendar className="h-10 w-10 text-blue-600 opacity-20" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Abgeschlossen</p>
                <p className="text-2xl font-bold">8</p>
              </div>
              <Star className="h-10 w-10 text-yellow-400 opacity-20" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Neue Angebote</p>
                <p className="text-2xl font-bold">3</p>
              </div>
              <MessageSquare className="h-10 w-10 text-green-600 opacity-20" />
            </div>
          </Card>
        </div>

        {/* Tasks Tabs */}
        <Tabs defaultValue="active" className="space-y-6">
          <TabsList>
            <TabsTrigger value="active">Aktiv (2)</TabsTrigger>
            <TabsTrigger value="completed">Abgeschlossen (8)</TabsTrigger>
          </TabsList>

          {/* Active Tasks */}
          <TabsContent value="active" className="space-y-4">
            {myTasks
              .filter((task) => task.status !== "completed")
              .map((task) => (
                <Card key={task.id} className="p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-lg font-semibold">{task.title}</h3>
                        {getStatusBadge(task.status)}
                      </div>

                      <div className="grid md:grid-cols-2 gap-3 text-sm text-gray-600 mb-4">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span>{task.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {task.status === "confirmed"
                              ? `Termin: ${new Date(task.date!).toLocaleDateString("de-DE")}`
                              : `Erstellt: ${new Date(task.createdAt!).toLocaleDateString("de-DE")}`}
                          </span>
                        </div>
                        {task.provider && (
                          <div className="flex items-center gap-2">
                            <span>Dienstleister: {task.provider}</span>
                          </div>
                        )}
                      </div>

                      {task.status === "offers_received" && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
                          <p className="text-sm text-blue-900">
                            Du hast {task.offerCount} neue Angebote erhalten. Wähle das beste
                            Angebot für dich aus.
                          </p>
                        </div>
                      )}

                      {task.status === "confirmed" && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-3">
                          <p className="text-sm text-green-900">
                            Dein Termin mit {task.provider} ist bestätigt. Die Zahlung ist im
                            Escrow hinterlegt.
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="text-right ml-4">
                      {task.status === "offers_received" && (
                        <>
                          <div className="text-sm text-gray-600 mb-1">Vorgeschlagen</div>
                          <div className="text-lg font-bold text-blue-600 mb-3">
                            {task.price!.min}€ - {task.price!.max}€
                          </div>
                        </>
                      )}
                      {task.status === "confirmed" && (
                        <>
                          <div className="text-sm text-gray-600 mb-1">Preis</div>
                          <div className="text-lg font-bold text-blue-600 mb-3">
                            {task.price}€
                          </div>
                        </>
                      )}
                      <div className="flex flex-col gap-2">
                        {task.status === "offers_received" && (
                          <Button onClick={() => navigate(`/task/${task.id}`)}>
                            Angebote ansehen
                          </Button>
                        )}
                        {task.status === "confirmed" && (
                          <>
                            <Button variant="outline">Chat öffnen</Button>
                            <Button variant="outline">Details</Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
          </TabsContent>

          {/* Completed Tasks */}
          <TabsContent value="completed" className="space-y-4">
            {myTasks
              .filter((task) => task.status === "completed")
              .map((task) => (
                <Card key={task.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-lg font-semibold">{task.title}</h3>
                        {getStatusBadge(task.status)}
                        {task.rating && (
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{task.rating}.0</span>
                          </div>
                        )}
                      </div>

                      <div className="grid md:grid-cols-2 gap-3 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span>{task.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>
                            Abgeschlossen: {new Date(task.completedAt!).toLocaleDateString("de-DE")}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span>Dienstleister: {task.provider}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Euro className="h-4 w-4" />
                          <span>{task.price}€</span>
                        </div>
                      </div>
                    </div>

                    <div className="ml-4">
                      <Button variant="outline" size="sm">
                        Erneut buchen
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}

            <Card className="p-8 text-center bg-gray-50">
              <p className="text-gray-600 mb-4">
                Weitere abgeschlossene Aufträge anzeigen
              </p>
              <Button variant="outline">Alle anzeigen</Button>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
