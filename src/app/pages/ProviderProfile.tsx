import { useNavigate, useParams } from "react-router";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/avatar";
import { Separator } from "../components/ui/separator";
import { ArrowLeft, Star, Shield, MapPin, Euro, CheckCircle, Clock } from "lucide-react";
import { mockProviders } from "../data/mockData";

export function ProviderProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const provider = mockProviders.find((p) => p.id === id);

  if (!provider) {
    return <div>Provider not found</div>;
  }

  const reviews = [
    {
      id: "1",
      author: "Lisa K.",
      rating: 5,
      date: "2026-03-05",
      task: "IKEA Kleiderschrank montieren",
      comment: "Sehr professionell und schnell. Hat alles perfekt aufgebaut. Kann ich nur empfehlen!",
    },
    {
      id: "2",
      author: "Max B.",
      rating: 5,
      date: "2026-02-28",
      task: "Wandregal anbringen",
      comment: "Pünktlich, freundlich und saubere Arbeit. Gerne wieder!",
    },
    {
      id: "3",
      author: "Sarah W.",
      rating: 4,
      date: "2026-02-20",
      task: "Umzugshilfe",
      comment: "Gute Arbeit, sehr hilfsbereit. Kleiner Abzug für die Kommunikation vorher, aber ansonsten top.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <Button variant="ghost" onClick={() => navigate(-1)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Zurück
          </Button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Profile */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-8">
              <div className="flex items-start gap-6 mb-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={provider.avatar} />
                  <AvatarFallback>{provider.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-bold">{provider.name}</h1>
                    {provider.verified && (
                      <Badge className="bg-blue-100 text-blue-700 gap-1">
                        <Shield className="h-3 w-3" />
                        Verifiziert
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-bold">{provider.rating}</span>
                      <span className="text-gray-600">({provider.reviewCount} Bewertungen)</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>{provider.completedJobs} abgeschlossene Aufträge</span>
                    </div>
                  </div>
                  <p className="text-gray-700">{provider.description}</p>
                </div>
              </div>

              <Separator className="my-6" />

              <div>
                <h3 className="font-semibold mb-3">Fähigkeiten</h3>
                <div className="flex flex-wrap gap-2">
                  {provider.skills.map((skill, idx) => (
                    <Badge key={idx} variant="secondary" className="text-sm">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>

            {/* Reviews */}
            <Card className="p-8">
              <h2 className="text-2xl mb-6">Bewertungen ({reviews.length})</h2>
              
              {/* Rating Distribution */}
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <div className="flex items-center gap-8">
                  <div className="text-center">
                    <div className="text-5xl font-bold mb-2">{provider.rating}</div>
                    <div className="flex items-center gap-1 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(provider.rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="text-sm text-gray-600">
                      {provider.reviewCount} Bewertungen
                    </div>
                  </div>

                  <div className="flex-1">
                    {[5, 4, 3, 2, 1].map((stars) => (
                      <div key={stars} className="flex items-center gap-2 mb-2">
                        <span className="text-sm w-8">{stars} ★</span>
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-yellow-400"
                            style={{
                              width: `${stars === 5 ? 85 : stars === 4 ? 12 : 3}%`,
                            }}
                          />
                        </div>
                        <span className="text-sm text-gray-600 w-12">
                          {stars === 5 ? "85%" : stars === 4 ? "12%" : "3%"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Individual Reviews */}
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id}>
                    <div className="flex items-start gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>{review.author[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold">{review.author}</span>
                          <span className="text-sm text-gray-600">•</span>
                          <span className="text-sm text-gray-600">
                            {new Date(review.date).toLocaleDateString("de-DE")}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {review.task}
                          </Badge>
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                      </div>
                    </div>
                    {review.id !== reviews[reviews.length - 1].id && (
                      <Separator className="mt-6" />
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Preise & Verfügbarkeit</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Euro className="h-5 w-5" />
                    <span>Stundensatz</span>
                  </div>
                  <span className="font-bold text-lg">{provider.hourlyRate}€</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="h-5 w-5" />
                    <span>Arbeitsbereich</span>
                  </div>
                  <span className="font-medium">{provider.radius} km</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="h-5 w-5" />
                    <span>Antwortzeit</span>
                  </div>
                  <span className="font-medium">{"< 2 Std"}</span>
                </div>
              </div>

              <Separator className="my-4" />

              <Button className="w-full" size="lg">
                Angebot anfragen
              </Button>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold mb-4">Standort</h3>
              <div className="flex items-center gap-2 text-gray-600 mb-3">
                <MapPin className="h-5 w-5" />
                <span>{provider.location}</span>
              </div>
              <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center">
                <p className="text-gray-500">Kartenansicht</p>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold mb-4">Verifizierungen</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-sm">Gewerbeschein geprüft</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-sm">Identität bestätigt</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-sm">E-Mail verifiziert</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-sm">Telefon verifiziert</span>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-blue-50 border-blue-200">
              <h3 className="font-semibold mb-2">100% Sicher</h3>
              <p className="text-sm text-gray-700 mb-4">
                Alle Zahlungen werden über Escrow abgewickelt. Dein Geld ist geschützt bis
                zur erfolgreichen Fertigstellung.
              </p>
              <div className="flex items-center gap-2 text-sm text-blue-700">
                <Shield className="h-4 w-4" />
                <span>Käuferschutz aktiv</span>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
