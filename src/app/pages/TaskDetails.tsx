import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/avatar";
import { Separator } from "../components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../components/ui/dialog";
import { ArrowLeft, MapPin, Calendar, Euro, Star, CheckCircle, Clock, Shield } from "lucide-react";
import { mockTasks, mockOffers } from "../data/mockData";
import { toast } from "sonner";

export function TaskDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedOffer, setSelectedOffer] = useState<string | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  
  const task = mockTasks.find((t) => t.id === id);
  const offers = mockOffers.filter((o) => o.taskId === id);

  if (!task) {
    return <div>Task not found</div>;
  }

  const handleSelectOffer = (offerId: string) => {
    setSelectedOffer(offerId);
    setShowConfirmDialog(true);
  };

  const handleConfirmBooking = () => {
    toast.success("Buchung bestätigt! Der Dienstleister wurde benachrichtigt.");
    setShowConfirmDialog(false);
    setTimeout(() => {
      navigate("/customer/dashboard");
    }, 1500);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("de-DE", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const selectedOfferData = offers.find((o) => o.id === selectedOffer);

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
          {/* Task Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-2xl mb-2">{task.title}</h1>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {task.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {formatDate(task.createdAt)}
                    </div>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-700">
                  {task.status === "open" ? "Offen" : task.status}
                </Badge>
              </div>

              <Separator className="my-4" />

              <div>
                <h3 className="font-semibold mb-2">Beschreibung</h3>
                <p className="text-gray-700">{task.description}</p>
              </div>

              {task.details && (
                <>
                  <Separator className="my-4" />
                  <div className="grid md:grid-cols-2 gap-4">
                    {task.details.dimensions && (
                      <div>
                        <h4 className="font-semibold text-sm text-gray-600 mb-1">Maße</h4>
                        <p className="text-gray-900">{task.details.dimensions}</p>
                      </div>
                    )}
                    {task.details.materials && (
                      <div>
                        <h4 className="font-semibold text-sm text-gray-600 mb-1">Materialien</h4>
                        <p className="text-gray-900">{task.details.materials}</p>
                      </div>
                    )}
                    {task.details.preparation && (
                      <div>
                        <h4 className="font-semibold text-sm text-gray-600 mb-1">Vorbereitung</h4>
                        <p className="text-gray-900">{task.details.preparation}</p>
                      </div>
                    )}
                    {task.details.tools && (
                      <div>
                        <h4 className="font-semibold text-sm text-gray-600 mb-1">Werkzeug</h4>
                        <p className="text-gray-900">{task.details.tools}</p>
                      </div>
                    )}
                  </div>
                </>
              )}
            </Card>

            {/* Offers */}
            <div>
              <h2 className="text-xl mb-4">
                Angebote ({offers.length})
              </h2>
              <div className="space-y-4">
                {offers.map((offer) => (
                  <Card key={offer.id} className="p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={offer.provider.avatar} />
                        <AvatarFallback>{offer.provider.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-lg">{offer.provider.name}</h3>
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span>{offer.provider.rating}</span>
                                <span>({offer.provider.reviewCount})</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <CheckCircle className="h-4 w-4 text-green-600" />
                                <span>{offer.provider.completedJobs} Aufträge</span>
                              </div>
                              {offer.provider.verified && (
                                <div className="flex items-center gap-1">
                                  <Shield className="h-4 w-4 text-blue-600" />
                                  <span>Verifiziert</span>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-blue-600">
                              {offer.price}€
                            </div>
                            <div className="flex items-center gap-1 text-sm text-gray-600">
                              <Clock className="h-3 w-3" />
                              {offer.estimatedDuration}
                            </div>
                          </div>
                        </div>

                        <div className="mb-3">
                          <div className="flex flex-wrap gap-2">
                            {offer.provider.skills.map((skill, idx) => (
                              <Badge key={idx} variant="secondary">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <p className="text-gray-700 mb-4">{offer.message}</p>

                        <div className="flex gap-3">
                          <Button
                            onClick={() => navigate(`/provider/profile/${offer.providerId}`)}
                            variant="outline"
                          >
                            Profil ansehen
                          </Button>
                          <Button onClick={() => handleSelectOffer(offer.id)}>
                            Angebot auswählen
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}

                {offers.length === 0 && (
                  <Card className="p-8 text-center">
                    <p className="text-gray-600">
                      Noch keine Angebote vorhanden. Dienstleister in deiner Nähe werden
                      benachrichtigt.
                    </p>
                  </Card>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Geschätzte Preisspanne</h3>
              <div className="flex items-center gap-2 mb-2">
                <Euro className="h-5 w-5 text-gray-600" />
                <span className="text-2xl font-bold">
                  {task.suggestedPrice.min}€ - {task.suggestedPrice.max}€
                </span>
              </div>
              <p className="text-sm text-gray-600">
                Basierend auf KI-Analyse und ähnlichen Aufträgen
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold mb-4">Sicherer Ablauf</h3>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Escrow-Zahlung</p>
                    <p className="text-sm text-gray-600">
                      Geld wird erst nach Abschluss freigegeben
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Verifizierte Dienstleister</p>
                    <p className="text-sm text-gray-600">
                      Alle haben ein Gewerbeschein
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Bewertungssystem</p>
                    <p className="text-sm text-gray-600">
                      Echte Bewertungen von Kunden
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold mb-4">Kategorien</h3>
              <Badge>{task.category}</Badge>
            </Card>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Angebot bestätigen</DialogTitle>
            <DialogDescription>
              Möchtest du das Angebot von {selectedOfferData?.provider.name} annehmen?
            </DialogDescription>
          </DialogHeader>

          {selectedOfferData && (
            <div className="space-y-4 py-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={selectedOfferData.provider.avatar} />
                  <AvatarFallback>{selectedOfferData.provider.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{selectedOfferData.provider.name}</p>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span>{selectedOfferData.provider.rating}</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between">
                <span className="text-gray-600">Preis</span>
                <span className="font-bold">{selectedOfferData.price}€</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Dauer</span>
                <span>{selectedOfferData.estimatedDuration}</span>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-900">
                  Nach der Bestätigung wird die Zahlung über Escrow abgewickelt.
                  Das Geld wird erst nach erfolgreicher Fertigstellung freigegeben.
                </p>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>
              Abbrechen
            </Button>
            <Button onClick={handleConfirmBooking}>
              Jetzt buchen
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
