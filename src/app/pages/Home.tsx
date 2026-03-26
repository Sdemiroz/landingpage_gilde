import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Hammer, Wrench, Paintbrush, TruckIcon, Shield, Euro, Clock, Star } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function Home() {
  const categories = [
    {
      icon: Wrench,
      title: "Möbelmontage",
      description: "IKEA & Co professionell aufbauen lassen",
      image: "https://images.unsplash.com/photo-1758518727613-00192aed759b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBhc3NlbWJsaW5nJTIwZnVybml0dXJlfGVufDF8fHx8MTc3MzI0NTE3Mnww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      icon: Hammer,
      title: "Regale & Bilder",
      description: "Professionelle Wandmontage",
      image: "https://images.unsplash.com/photo-1581783898377-1c85bf937427?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5keW1hbiUyMHRvb2xzJTIwd29ya3Nob3B8ZW58MXx8fHwxNzczMTcxNzUxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      icon: Paintbrush,
      title: "Malerarbeiten",
      description: "Wände und Decken streichen",
      image: "https://images.unsplash.com/photo-1599619585752-c3edb42a414c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwcGFpbnRpbmclMjByZW5vdmF0aW9ufGVufDF8fHx8MTc3MzE4OTI0MXww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      icon: TruckIcon,
      title: "Umzugshilfe",
      description: "Tragen, packen, transportieren",
      image: "https://images.unsplash.com/photo-1772724316733-57e51acf7fac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpbmclMjBib3hlcyUyMGFwYXJ0bWVudHxlbnwxfHx8fDE3NzMyNDM0MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ];

  const features = [
    {
      icon: Shield,
      title: "100% Legal",
      description: "Alle Dienstleister sind registrierte Selbstständige",
    },
    {
      icon: Euro,
      title: "Faire Preise",
      description: "KI-gestützte Preisvorschläge für Transparenz",
    },
    {
      icon: Clock,
      title: "Schnell & Einfach",
      description: "Angebote innerhalb weniger Stunden",
    },
    {
      icon: Star,
      title: "Geprüfte Profis",
      description: "Bewertungen von echten Kunden",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Hammer className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">HAND</span>
            </div>
            <div className="flex gap-3">
              <Link to="/provider/browse">
                <Button variant="ghost">Dienstleister werden</Button>
              </Link>
              <Link to="/customer/dashboard">
                <Button variant="outline">Anmelden</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl mb-6">
              Handwerker-Hilfe in Stuttgart
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Verbinde dich mit geprüften Dienstleistern für kleine Handwerks-Aufgaben.
              Schnell, fair und 100% legal.
            </p>
            <Link to="/create-task">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Jetzt Auftrag erstellen
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl text-center mb-12">Beliebte Dienstleistungen</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <div className="h-48 relative">
                  <ImageWithFallback
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <category.icon className="h-8 w-8 text-blue-600 mb-3" />
                  <h3 className="text-xl mb-2">{category.title}</h3>
                  <p className="text-gray-600">{category.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl text-center mb-12">So funktioniert's</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl mb-3">Auftrag beschreiben</h3>
              <p className="text-gray-600">
                Unser KI-Assistent hilft dir, deinen Auftrag genau zu beschreiben
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-xl mb-3">Angebote erhalten</h3>
              <p className="text-gray-600">
                Dienstleister in deiner Nähe senden dir Preisangebote
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="text-xl mb-3">Auswählen & Bezahlen</h3>
              <p className="text-gray-600">
                Wähle den besten Dienstleister und bezahle sicher über die Plattform
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl text-center mb-12">Warum HAND?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <feature.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl mb-6">Bereit loszulegen?</h2>
          <p className="text-xl mb-8 opacity-90">
            Erstelle jetzt deinen ersten Auftrag oder registriere dich als Dienstleister
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/create-task">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Auftrag erstellen
              </Button>
            </Link>
            <Link to="/provider/onboarding">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-blue-700">
                Als Dienstleister registrieren
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Hammer className="h-6 w-6" />
                <span className="text-xl font-bold">HAND</span>
              </div>
              <p className="text-gray-400">
                Die Plattform für kleine Handwerks-Dienstleistungen in Stuttgart
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Für Kunden</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Auftrag erstellen</li>
                <li>Wie es funktioniert</li>
                <li>Preise</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Für Dienstleister</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Registrieren</li>
                <li>Voraussetzungen</li>
                <li>Verdienst</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Rechtliches</h4>
              <ul className="space-y-2 text-gray-400">
                <li>AGB</li>
                <li>Datenschutz</li>
                <li>Impressum</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2026 HAND. Alle Rechte vorbehalten.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
