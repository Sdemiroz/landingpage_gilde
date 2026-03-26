import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import { ArrowLeft, Euro, Clock, Sparkles, AlertCircle, CheckCircle } from "lucide-react";
import { mockTasks, mockProviders } from "../data/mockData";
import { toast } from "sonner";

export function SubmitOffer() {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const task = mockTasks.find((t) => t.id === taskId);
  const provider = mockProviders[0]; // Current logged in provider

  const [offerData, setOfferData] = useState({
    price: "",
    estimatedDuration: "",
    message: "",
  });

  if (!task) {
    return <div>Task not found</div>;
  }

  const suggestedPrice = Math.round((task.suggestedPrice.min + task.suggestedPrice.max) / 2);
  const isPriceWithinRange =
    offerData.price &&
    parseInt(offerData.price) >= task.suggestedPrice.min &&
    parseInt(offerData.price) <= task.suggestedPrice.max;

  const handleSubmit = () => {
    if (!offerData.price || !offerData.estimatedDuration || !offerData.message) {
      toast.error("Bitte fülle alle Felder aus");
      return;
    }

    toast.success("Angebot erfolgreich gesendet!");
    setTimeout(() => {
      navigate("/provider/dashboard");
    }, 1000);
  };

  const useSuggestedPrice = () => {
    setOfferData({ ...offerData, price: suggestedPrice.toString() });
    toast.success("Vorgeschlagener Preis übernommen");
  };

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
          {/* Offer Form */}
          <div className="lg:col-span-2">
            <Card className="p-8">
              <h1 className="text-2xl mb-6">Angebot erstellen</h1>

              <div className="space-y-6">
                <div>
                  <Label htmlFor="price">Dein Preis (€) *</Label>
                  <div className="relative mt-2">
                    <Euro className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="price"
                      type="number"
                      placeholder="0"
                      value={offerData.price}
                      onChange={(e) => setOfferData({ ...offerData, price: e.target.value })}
                      className="pl-10"
                    />
                  </div>

                  {offerData.price && (
                    <div className="mt-2">
                      {isPriceWithinRange ? (
                        <div className="flex items-center gap-2 text-sm text-green-700">
                          <CheckCircle className="h-4 w-4" />
                          <span>Dein Preis liegt im vorgeschlagenen Bereich</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-sm text-yellow-700">
                          <AlertCircle className="h-4 w-4" />
                          <span>
                            Dein Preis liegt außerhalb der Empfehlung (
                            {task.suggestedPrice.min}€ - {task.suggestedPrice.max}€)
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="mt-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={useSuggestedPrice}
                      className="gap-2"
                    >
                      <Sparkles className="h-4 w-4" />
                      Vorgeschlagenen Preis nutzen ({suggestedPrice}€)
                    </Button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="duration">Geschätzte Dauer *</Label>
                  <div className="relative mt-2">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="duration"
                      placeholder="z.B. 2-3 Stunden"
                      value={offerData.estimatedDuration}
                      onChange={(e) =>
                        setOfferData({ ...offerData, estimatedDuration: e.target.value })
                      }
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="message">Nachricht an den Kunden *</Label>
                  <Textarea
                    id="message"
                    placeholder="Stelle dich vor und erkläre, warum du der richtige Dienstleister für diesen Auftrag bist..."
                    value={offerData.message}
                    onChange={(e) => setOfferData({ ...offerData, message: e.target.value })}
                    className="mt-2 min-h-32"
                  />
                  <p className="text-sm text-gray-600 mt-1">
                    Mindestens 50 Zeichen empfohlen
                  </p>
                </div>

                <Separator />

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Wichtige Hinweise</h3>
                  <ul className="text-sm text-blue-900 space-y-1">
                    <li>• Sei ehrlich und realistisch bei Preis und Zeitangabe</li>
                    <li>• Stelle sicher, dass du die benötigten Werkzeuge hast</li>
                    <li>• Bei Auftragsvergabe wird 15% Plattform-Provision abgezogen</li>
                    <li>• Die Zahlung erfolgt nach erfolgreicher Fertigstellung</li>
                  </ul>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => navigate(-1)} className="flex-1">
                    Abbrechen
                  </Button>
                  <Button onClick={handleSubmit} className="flex-1">
                    Angebot senden
                  </Button>
                </div>
              </div>
            </Card>

            {/* Provider Preview */}
            <Card className="p-6 mt-6">
              <h3 className="font-semibold mb-4">So sieht dein Profil aus:</h3>
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <img
                  src={provider.avatar}
                  alt={provider.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold">{provider.name}</h4>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>⭐ {provider.rating}</span>
                    <span>•</span>
                    <span>{provider.completedJobs} Aufträge</span>
                    {provider.verified && (
                      <>
                        <span>•</span>
                        <Badge className="bg-blue-100 text-blue-700">Verifiziert</Badge>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Task Details Sidebar */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Auftragsdetails</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">{task.title}</h4>
                  <Badge variant="secondary">{task.category}</Badge>
                </div>

                <Separator />

                <div>
                  <p className="text-sm text-gray-600 mb-1">Beschreibung</p>
                  <p className="text-sm">{task.description}</p>
                </div>

                <Separator />

                <div>
                  <p className="text-sm text-gray-600 mb-1">Standort</p>
                  <p className="text-sm font-medium">{task.location}</p>
                </div>

                {task.details && (
                  <>
                    <Separator />
                    <div className="space-y-2">
                      {task.details.dimensions && (
                        <div>
                          <p className="text-sm text-gray-600">Maße</p>
                          <p className="text-sm font-medium">{task.details.dimensions}</p>
                        </div>
                      )}
                      {task.details.materials && (
                        <div>
                          <p className="text-sm text-gray-600">Materialien</p>
                          <p className="text-sm font-medium">{task.details.materials}</p>
                        </div>
                      )}
                      {task.details.tools && (
                        <div>
                          <p className="text-sm text-gray-600">Werkzeug</p>
                          <p className="text-sm font-medium">{task.details.tools}</p>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold mb-4">KI-Preisvorschlag</h3>
              
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-5 w-5 text-blue-600" />
                <span className="text-2xl font-bold">
                  {task.suggestedPrice.min}€ - {task.suggestedPrice.max}€
                </span>
              </div>

              <p className="text-sm text-gray-600 mb-4">
                Basierend auf ähnlichen Aufträgen in dieser Region und Kategorie
              </p>

              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-sm font-medium mb-1">Durchschnittspreis</p>
                <p className="text-xl font-bold text-blue-600">{suggestedPrice}€</p>
              </div>
            </Card>

            <Card className="p-6 bg-green-50 border-green-200">
              <h3 className="font-semibold mb-2">Deine Auszahlung</h3>
              {offerData.price && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Dein Preis</span>
                    <span className="font-medium">{offerData.price}€</span>
                  </div>
                  <div className="flex justify-between text-sm text-red-600">
                    <span>Plattform-Gebühr (15%)</span>
                    <span>-{Math.round(parseInt(offerData.price) * 0.15)}€</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold">
                    <span>Du erhältst</span>
                    <span className="text-green-700">
                      {Math.round(parseInt(offerData.price) * 0.85)}€
                    </span>
                  </div>
                </div>
              )}
              {!offerData.price && (
                <p className="text-sm text-gray-600">
                  Gib einen Preis ein, um deine Auszahlung zu sehen
                </p>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
