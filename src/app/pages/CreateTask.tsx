import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Sparkles, ArrowLeft, Check } from "lucide-react";
import { toast } from "sonner";

export function CreateTask() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [taskDetails, setTaskDetails] = useState({
    dimensions: "",
    materials: "",
    preparation: "",
    tools: "",
  });

  const categories = [
    "Möbelmontage",
    "Wandmontage",
    "Malerarbeiten",
    "Umzugshilfe",
    "Sonstiges",
  ];

  const getAiSuggestions = () => {
    // Simulate AI suggestions based on category
    const suggestions = {
      "Möbelmontage": [
        "Welche Art von Möbel soll montiert werden? (z.B. IKEA PAX, Billy Regal)",
        "Wie groß ist das Möbelstück ungefähr? (Breite x Höhe x Tiefe)",
        "Sind alle Teile und Schrauben vorhanden?",
        "Wird Werkzeug benötigt oder ist es vorhanden?",
      ],
      "Wandmontage": [
        "Was soll angebracht werden? (Regale, Bilder, TV-Halterung)",
        "Aus welchem Material ist die Wand? (Beton, Rigips, Ziegel)",
        "Wie viele Gegenstände sollen montiert werden?",
        "Sind Dübel und Schrauben bereits vorhanden?",
      ],
      "Malerarbeiten": [
        "Wie groß ist die zu streichende Fläche in m²?",
        "Welche Oberflächen sollen gestrichen werden? (Wände, Decke, Türen)",
        "In welcher Farbe soll gestrichen werden?",
        "Ist die Farbe bereits gekauft oder soll der Dienstleister sie besorgen?",
      ],
      "Umzugshilfe": [
        "Wie viele Zimmer hat die Wohnung?",
        "Gibt es einen Aufzug in beiden Gebäuden?",
        "Müssen Möbel ab- und aufgebaut werden?",
        "Wie weit ist die Entfernung zwischen den Wohnungen?",
      ],
    };

    return suggestions[category as keyof typeof suggestions] || [];
  };

  const handleCategorySelect = (value: string) => {
    setCategory(value);
    setStep(2);
  };

  const handleGetAiHelp = () => {
    const suggestions = getAiSuggestions();
    setAiSuggestions(suggestions);
    toast.success("KI-Assistent aktiviert!");
  };

  const calculatePriceEstimate = () => {
    const estimates = {
      "Möbelmontage": { min: 60, max: 150 },
      "Wandmontage": { min: 50, max: 100 },
      "Malerarbeiten": { min: 200, max: 400 },
      "Umzugshilfe": { min: 150, max: 300 },
      "Sonstiges": { min: 50, max: 200 },
    };

    return estimates[category as keyof typeof estimates] || { min: 50, max: 150 };
  };

  const handleSubmit = () => {
    if (!title || !description || !location) {
      toast.error("Bitte fülle alle Pflichtfelder aus");
      return;
    }

    toast.success("Auftrag erfolgreich erstellt!");
    setTimeout(() => {
      navigate("/task/1");
    }, 1000);
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
            <span className="text-sm text-gray-600">Schritt {step} von 3</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full">
            <div
              className="h-full bg-blue-600 rounded-full transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* Step 1: Category */}
        {step === 1 && (
          <Card className="p-8">
            <h2 className="text-2xl mb-6">Was möchtest du erledigen lassen?</h2>
            <div className="space-y-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategorySelect(cat)}
                  className="w-full p-4 text-left border rounded-lg hover:border-blue-600 hover:bg-blue-50 transition-colors"
                >
                  {cat}
                </button>
              ))}
            </div>
          </Card>
        )}

        {/* Step 2: Description */}
        {step === 2 && (
          <Card className="p-8">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl">Beschreibe deinen Auftrag</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={handleGetAiHelp}
                className="gap-2"
              >
                <Sparkles className="h-4 w-4" />
                KI-Hilfe
              </Button>
            </div>

            <div className="space-y-6">
              <div>
                <Label htmlFor="title">Titel *</Label>
                <Input
                  id="title"
                  placeholder="z.B. IKEA Kleiderschrank montieren"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="description">Beschreibung *</Label>
                <Textarea
                  id="description"
                  placeholder="Beschreibe was gemacht werden soll..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-2 min-h-32"
                />
              </div>

              {aiSuggestions.length > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="h-5 w-5 text-blue-600" />
                    <span className="font-semibold text-blue-900">KI-Vorschläge</span>
                  </div>
                  <div className="space-y-2">
                    {aiSuggestions.map((suggestion, index) => (
                      <p key={index} className="text-sm text-blue-800">
                        • {suggestion}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <Label htmlFor="location">Standort *</Label>
                <Input
                  id="location"
                  placeholder="z.B. Stuttgart-Mitte, 70173"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="mt-2"
                />
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

        {/* Step 3: Details & Submit */}
        {step === 3 && (
          <Card className="p-8">
            <h2 className="text-2xl mb-6">Zusätzliche Details (optional)</h2>

            <div className="space-y-6">
              <div>
                <Label htmlFor="dimensions">Maße / Größe</Label>
                <Input
                  id="dimensions"
                  placeholder="z.B. 2.5m breit x 2.4m hoch"
                  value={taskDetails.dimensions}
                  onChange={(e) =>
                    setTaskDetails({ ...taskDetails, dimensions: e.target.value })
                  }
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="materials">Materialien</Label>
                <Input
                  id="materials"
                  placeholder="z.B. Alle Teile vorhanden"
                  value={taskDetails.materials}
                  onChange={(e) =>
                    setTaskDetails({ ...taskDetails, materials: e.target.value })
                  }
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="preparation">Vorbereitung</Label>
                <Input
                  id="preparation"
                  placeholder="z.B. Raum ist leer"
                  value={taskDetails.preparation}
                  onChange={(e) =>
                    setTaskDetails({ ...taskDetails, preparation: e.target.value })
                  }
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="tools">Werkzeug</Label>
                <Input
                  id="tools"
                  placeholder="z.B. Werkzeug vorhanden / benötigt"
                  value={taskDetails.tools}
                  onChange={(e) =>
                    setTaskDetails({ ...taskDetails, tools: e.target.value })
                  }
                  className="mt-2"
                />
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="h-5 w-5 text-green-600" />
                  <span className="font-semibold text-green-900">
                    Geschätzte Preisspanne
                  </span>
                </div>
                <p className="text-2xl font-bold text-green-700">
                  {calculatePriceEstimate().min}€ - {calculatePriceEstimate().max}€
                </p>
                <p className="text-sm text-green-700 mt-1">
                  Basierend auf ähnlichen Aufträgen in deiner Region
                </p>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                  Zurück
                </Button>
                <Button onClick={handleSubmit} className="flex-1 gap-2">
                  <Check className="h-4 w-4" />
                  Auftrag veröffentlichen
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
