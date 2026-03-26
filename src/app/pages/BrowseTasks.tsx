import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { ArrowLeft, Search, MapPin, Calendar, Euro, Filter } from "lucide-react";
import { mockTasks } from "../data/mockData";

export function BrowseTasks() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const categories = ["all", "Furniture Assembly", "Mounting", "Painting", "Moving"];

  const filteredTasks = mockTasks
    .filter((task) => task.status === "open")
    .filter((task) => {
      if (categoryFilter === "all") return true;
      return task.category === categoryFilter;
    })
    .filter((task) => {
      if (!searchQuery) return true;
      return (
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    })
    .sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else if (sortBy === "price_high") {
        return b.suggestedPrice.max - a.suggestedPrice.max;
      } else {
        return a.suggestedPrice.min - b.suggestedPrice.min;
      }
    });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Button variant="ghost" onClick={() => navigate(-1)}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Zurück
            </Button>
            <Button onClick={() => navigate("/provider/dashboard")}>
              Zum Dashboard
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl mb-2">Verfügbare Aufträge</h1>
          <p className="text-gray-600">Finde passende Aufträge in deiner Nähe</p>
        </div>

        {/* Filters */}
        <Card className="p-6 mb-6">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Aufträge durchsuchen..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Kategorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle Kategorien</SelectItem>
                {categories.slice(1).map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sortieren" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Neueste zuerst</SelectItem>
                <SelectItem value="price_high">Höchster Preis</SelectItem>
                <SelectItem value="price_low">Niedrigster Preis</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Results Count */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-gray-600">
            {filteredTasks.length} {filteredTasks.length === 1 ? "Auftrag" : "Aufträge"}{" "}
            gefunden
          </p>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-600" />
            <span className="text-sm text-gray-600">
              {categoryFilter !== "all" && `Kategorie: ${categoryFilter}`}
            </span>
          </div>
        </div>

        {/* Task List */}
        <div className="space-y-4">
          {filteredTasks.map((task) => (
            <Card key={task.id} className="p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-xl font-semibold">{task.title}</h3>
                    <Badge variant="secondary">{task.category}</Badge>
                  </div>

                  <p className="text-gray-700 mb-4">{task.description}</p>

                  <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{task.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>
                        Erstellt:{" "}
                        {new Date(task.createdAt).toLocaleDateString("de-DE", {
                          day: "2-digit",
                          month: "short",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>Kunde: {task.customerName}</span>
                    </div>
                  </div>

                  {task.details && (
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <div className="grid md:grid-cols-2 gap-3 text-sm">
                        {task.details.dimensions && (
                          <div>
                            <span className="text-gray-600">Maße: </span>
                            <span className="font-medium">{task.details.dimensions}</span>
                          </div>
                        )}
                        {task.details.materials && (
                          <div>
                            <span className="text-gray-600">Materialien: </span>
                            <span className="font-medium">{task.details.materials}</span>
                          </div>
                        )}
                        {task.details.tools && (
                          <div>
                            <span className="text-gray-600">Werkzeug: </span>
                            <span className="font-medium">{task.details.tools}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-4">
                    <Button onClick={() => navigate(`/provider/offer/${task.id}`)}>
                      Angebot abgeben
                    </Button>
                    <Button variant="outline" onClick={() => navigate(`/task/${task.id}`)}>
                      Details ansehen
                    </Button>
                  </div>
                </div>

                <div className="text-right ml-6">
                  <div className="text-sm text-gray-600 mb-1">Vorgeschlagener Preis</div>
                  <div className="flex items-center gap-1 mb-2">
                    <Euro className="h-5 w-5 text-blue-600" />
                    <span className="text-2xl font-bold text-blue-600">
                      {task.suggestedPrice.min} - {task.suggestedPrice.max}
                    </span>
                  </div>
                  <Badge className="bg-green-100 text-green-700">In deiner Nähe</Badge>
                </div>
              </div>
            </Card>
          ))}

          {filteredTasks.length === 0 && (
            <Card className="p-12 text-center">
              <p className="text-gray-600 mb-4">
                Keine Aufträge gefunden, die deinen Kriterien entsprechen.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setCategoryFilter("all");
                }}
              >
                Filter zurücksetzen
              </Button>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
