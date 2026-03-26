import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Checkbox } from "../components/ui/checkbox";
import { Badge } from "../components/ui/badge";
import { ArrowLeft, Upload, CheckCircle, AlertCircle, FileText, Shield } from "lucide-react";
import { toast } from "sonner";

export function ProviderOnboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    radius: "15",
    skills: [] as string[],
    description: "",
    hourlyRate: "",
    gewerbeschein: null as File | null,
    agreedToTerms: false,
    confirmedSelfEmployed: false,
  });

  const availableSkills = [
    "Möbelmontage",
    "Wandmontage",
    "Malerarbeiten",
    "Umzugshilfe",
    "Elektroarbeiten",
    "Sanitär",
    "Gartenarbeit",
    "Reinigung",
  ];

  const toggleSkill = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, gewerbeschein: e.target.files[0] });
      toast.success("Dokument hochgeladen");
    }
  };

  const handleSubmit = () => {
    if (!formData.gewerbeschein) {
      toast.error("Bitte lade deinen Gewerbeschein hoch");
      return;
    }
    if (!formData.agreedToTerms || !formData.confirmedSelfEmployed) {
      toast.error("Bitte akzeptiere die Bedingungen");
      return;
    }

    toast.success("Registrierung erfolgreich! Wir prüfen deine Unterlagen.");
    setTimeout(() => {
      navigate("/provider/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
          <Button variant="ghost" onClick={() => navigate(-1)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Zurück
          </Button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Schritt {step} von 4</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full">
            <div
              className="h-full bg-blue-600 rounded-full transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* Step 1: Personal Info */}
        {step === 1 && (
          <Card className="p-8">
            <h2 className="text-2xl mb-6">Persönliche Informationen</h2>
            <div className="space-y-6">
              <div>
                <Label htmlFor="name">Vollständiger Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="email">E-Mail *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="phone">Telefonnummer *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="location">Standort *</Label>
                <Input
                  id="location"
                  placeholder="z.B. Stuttgart-Mitte"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="radius">Arbeitsradius (km) *</Label>
                <Input
                  id="radius"
                  type="number"
                  value={formData.radius}
                  onChange={(e) => setFormData({ ...formData, radius: e.target.value })}
                  className="mt-2"
                />
                <p className="text-sm text-gray-600 mt-1">
                  In welchem Umkreis möchtest du Aufträge annehmen?
                </p>
              </div>

              <Button onClick={() => setStep(2)} className="w-full">
                Weiter
              </Button>
            </div>
          </Card>
        )}

        {/* Step 2: Skills & Services */}
        {step === 2 && (
          <Card className="p-8">
            <h2 className="text-2xl mb-6">Fähigkeiten & Dienstleistungen</h2>
            <div className="space-y-6">
              <div>
                <Label className="mb-3 block">Welche Dienstleistungen bietest du an? *</Label>
                <div className="grid md:grid-cols-2 gap-3">
                  {availableSkills.map((skill) => (
                    <div
                      key={skill}
                      onClick={() => toggleSkill(skill)}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        formData.skills.includes(skill)
                          ? "border-blue-600 bg-blue-50"
                          : "border-gray-300 hover:border-blue-300"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{skill}</span>
                        {formData.skills.includes(skill) && (
                          <CheckCircle className="h-5 w-5 text-blue-600" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="description">Beschreibung deiner Dienstleistungen *</Label>
                <Textarea
                  id="description"
                  placeholder="Beschreibe deine Erfahrung und Kompetenzen..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="mt-2 min-h-32"
                />
              </div>

              <div>
                <Label htmlFor="hourlyRate">Stundensatz (€) *</Label>
                <Input
                  id="hourlyRate"
                  type="number"
                  placeholder="z.B. 45"
                  value={formData.hourlyRate}
                  onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })}
                  className="mt-2"
                />
                <p className="text-sm text-gray-600 mt-1">
                  Du kannst für jeden Auftrag individuelle Preise festlegen
                </p>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                  Zurück
                </Button>
                <Button onClick={() => setStep(3)} className="flex-1">
                  Weiter
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Step 3: Gewerbeschein Upload */}
        {step === 3 && (
          <Card className="p-8">
            <h2 className="text-2xl mb-6">Gewerbeanmeldung</h2>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex gap-3">
                <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-900">
                  <p className="font-semibold mb-1">Wichtiger Hinweis</p>
                  <p>
                    Als Dienstleister auf HAND musst du selbstständig und gewerblich
                    angemeldet sein. Lade hier deinen Gewerbeschein hoch.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <Label className="mb-3 block">Gewerbeschein hochladen *</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  {formData.gewerbeschein ? (
                    <div className="flex flex-col items-center gap-3">
                      <CheckCircle className="h-12 w-12 text-green-600" />
                      <p className="font-medium">{formData.gewerbeschein.name}</p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setFormData({ ...formData, gewerbeschein: null })}
                      >
                        Anderes Dokument wählen
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="mb-2">Klicke hier oder ziehe dein Dokument hinein</p>
                      <p className="text-sm text-gray-600 mb-4">
                        PDF, JPG oder PNG (max. 10MB)
                      </p>
                      <input
                        type="file"
                        id="file-upload"
                        className="hidden"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleFileUpload}
                      />
                      <Button
                        variant="outline"
                        onClick={() => document.getElementById("file-upload")?.click()}
                      >
                        Datei auswählen
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex gap-3">
                  <FileText className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-yellow-900">
                    <p className="font-semibold mb-1">Noch kein Gewerbe?</p>
                    <p>
                      Du kannst dich beim zuständigen Gewerbeamt anmelden. Wir stellen dir
                      Informationen und Hilfestellungen bereit.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                  Zurück
                </Button>
                <Button
                  onClick={() => setStep(4)}
                  className="flex-1"
                  disabled={!formData.gewerbeschein}
                >
                  Weiter
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Step 4: Legal & Confirmation */}
        {step === 4 && (
          <Card className="p-8">
            <h2 className="text-2xl mb-6">Rechtliches & Bestätigung</h2>

            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold mb-4">Was du wissen solltest:</h3>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Selbstständigkeit</p>
                      <p className="text-sm text-gray-600">
                        Du bist selbstständiger Auftragnehmer, kein Angestellter
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Steuern</p>
                      <p className="text-sm text-gray-600">
                        Du bist für deine Steuererklärung selbst verantwortlich
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Versicherung</p>
                      <p className="text-sm text-gray-600">
                        Stelle sicher, dass du ausreichend versichert bist
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Provision</p>
                      <p className="text-sm text-gray-600">
                        HAND behält 15% Provision von jedem Auftrag ein
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="selfEmployed"
                    checked={formData.confirmedSelfEmployed}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, confirmedSelfEmployed: checked === true })
                    }
                  />
                  <Label htmlFor="selfEmployed" className="cursor-pointer">
                    Ich bestätige, dass ich als selbstständiger Gewerbetreibender angemeldet
                    bin und alle rechtlichen Anforderungen erfülle.
                  </Label>
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox
                    id="terms"
                    checked={formData.agreedToTerms}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, agreedToTerms: checked === true })
                    }
                  />
                  <Label htmlFor="terms" className="cursor-pointer">
                    Ich akzeptiere die{" "}
                    <span className="text-blue-600 underline">Allgemeinen Geschäftsbedingungen</span>{" "}
                    und die{" "}
                    <span className="text-blue-600 underline">Datenschutzerklärung</span>.
                  </Label>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex gap-3">
                  <Shield className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-green-900">
                    <p className="font-semibold mb-1">Deine Daten sind sicher</p>
                    <p>
                      Wir prüfen deine Dokumente vertraulich und geben sie nicht weiter.
                      Die Verifizierung dauert in der Regel 1-2 Werktage.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(3)} className="flex-1">
                  Zurück
                </Button>
                <Button
                  onClick={handleSubmit}
                  className="flex-1"
                  disabled={!formData.agreedToTerms || !formData.confirmedSelfEmployed}
                >
                  Registrierung abschließen
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
