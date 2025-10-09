import { BACKEND_URL } from "@/lib/api";
import type { Professors, Staff } from "@/lib/types";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Edit,
  Eye,
  GraduationCap,
  Grid,
  List,
  Mail,
  Phone,
  Plus,
  Search,
  Settings,
  Star,
  Trash2,
  Upload,
  User,
  UserCheck,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";

const AnnuairePage = () => {
  const [activeTab, setActiveTab] = useState("professors");
  const [isAdmin] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  const [professors, setProfessors] = useState<Professors[]>([]);
  const [staff, setStaff] = useState<Staff[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        // Lancer les 2 fetch en parallèle avec les bonnes URLs
        const [professorsResponse, staffResponse] = await Promise.all([
          fetch(`${BACKEND_URL}/api/Personne/professeurs`),
          fetch(`${BACKEND_URL}/api/Personne/pats`),
        ]);

        // Vérifier si toutes les réponses sont OK
        if (!professorsResponse.ok || !staffResponse.ok) {
          throw new Error("Une ou plusieurs requêtes ont échoué");
        }

        // Extraire les données JSON
        const professorsData: Professors[] = await professorsResponse.json();
        const staffData: Staff[] = await staffResponse.json();

        // Mettre à jour les états
        setProfessors(professorsData);
        setStaff(staffData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erreur inconnue");
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  // Fonction pour filtrer les données selon le terme de recherche
  const getFilteredData = () => {
    let data: (Professors | Staff)[] = [];

    switch (activeTab) {
      case "professors":
        data = professors;
        break;
      case "staff":
        data = staff;
        break;
      default:
        return [];
    }

    // Filtrer par terme de recherche
    if (searchTerm) {
      data = data.filter(
        (person) =>
          person.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
          person.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ("prenom" in person &&
            person.prenom?.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    return data;
  };

  const filteredData = getFilteredData();
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Reset page when changing tabs or search
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchTerm]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-lg text-slate-600">Chargement des données...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow-lg border border-red-200">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-600 text-2xl">!</span>
          </div>
          <h3 className="text-xl font-semibold text-red-700 mb-2">
            Erreur de chargement
          </h3>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  function isProfessor(person: Professors | Staff): person is Professors {
    return "titre" in person;
  }

  const PersonCard = ({ person }: { person: Staff | Professors }) => {
    const displayName = isProfessor(person)
      ? `${person.prenom || ""} ${person.nom}`.trim()
      : person.nom;

    if (viewMode === "list") {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="group bg-white hover:bg-slate-50 transition-all duration-300 border border-slate-200 hover:border-slate-300 rounded-lg overflow-hidden shadow-sm hover:shadow-md"
        >
          <div className="p-6">
            <div className="flex items-center space-x-6">
              <div className="relative flex-shrink-0">
                {person.photo ? (
                  <img
                    src={person.photo}
                    alt={displayName}
                    className="w-20 h-20 object-cover rounded-full border-2 border-slate-200"
                  />
                ) : (
                  <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center border-2 border-slate-200">
                    <User className="w-8 h-8 text-slate-400" />
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-slate-900 mb-1">
                      {displayName}
                    </h3>
                    <p className="text-purple-600 font-medium mb-3">
                      {isProfessor(person) ? person.titre : person.fonction}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center text-slate-600">
                          <Mail className="w-4 h-4 mr-3 text-slate-400 flex-shrink-0" />
                          <span className="text-sm truncate">
                            {person.email}
                          </span>
                        </div>
                        <div className="flex items-center text-slate-600">
                          <Phone className="w-4 h-4 mr-3 text-slate-400 flex-shrink-0" />
                          <span className="text-sm">{person.tel}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        {person.sexe && (
                          <div className="flex items-center text-slate-600">
                            <User className="w-4 h-4 mr-3 text-slate-400 flex-shrink-0" />
                            <span className="text-sm">{person.sexe}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <Star className="w-5 h-5 text-slate-300 hover:text-yellow-400 cursor-pointer transition-colors" />

                    {isAdmin && (
                      <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-slate-600 hover:bg-blue-50 rounded transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-slate-600 hover:bg-green-50 rounded transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      );
    }

    // Mode grille (cartes)
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="group relative bg-white hover:shadow-xl transition-all duration-300 border border-slate-200 hover:border-purple-300 rounded-lg overflow-hidden"
      >
        <div className="p-6">
          <div className="text-center mb-4">
            <div className="relative mx-auto mb-4">
              {person.photo ? (
                <img
                  src={person.photo}
                  alt={displayName}
                  className="w-24 h-24 object-cover rounded-full border-4 border-slate-200 mx-auto"
                />
              ) : (
                <div className="w-24 h-24 bg-slate-100 border-4 border-slate-200 rounded-full flex items-center justify-center mx-auto">
                  <User className="w-8 h-8 text-slate-400" />
                </div>
              )}
            </div>

            <h3 className="text-lg font-semibold text-slate-900 mb-1">
              {displayName}
            </h3>
            <p className="text-purple-600 font-medium text-sm mb-4">
              {isProfessor(person) ? person.titre : person.fonction}
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center text-slate-600 text-sm">
              <Mail className="w-4 h-4 mr-3 text-slate-400 flex-shrink-0" />
              <span className="truncate">{person.email}</span>
            </div>
            <div className="flex items-center text-slate-600 text-sm">
              <Phone className="w-4 h-4 mr-3 text-slate-400 flex-shrink-0" />
              <span>{person.tel}</span>
            </div>
            {person.sexe && (
              <div className="flex items-center text-slate-600 text-sm">
                <User className="w-4 h-4 mr-3 text-slate-400 flex-shrink-0" />
                <span>{person.sexe}</span>
              </div>
            )}
          </div>

          {isAdmin && (
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="flex space-x-1">
                <button className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="p-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          <div className="mt-4 pt-4 border-t border-slate-100">
            <div className="flex justify-end">
              <Star className="w-5 h-5 text-slate-300 hover:text-yellow-400 cursor-pointer transition-colors" />
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  const AdminPanel = () => (
    <div className="bg-white shadow-sm border border-slate-200 rounded-lg p-8 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-purple-600 text-white rounded-lg">
            <Settings className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Panneau d'Administration
            </h2>
            <p className="text-slate-600">Gérez votre annuaire universitaire</p>
          </div>
        </div>

        <div className="flex space-x-3">
          <button className="flex items-center px-4 py-2 bg-purple-600 text-white hover:bg-purple-700 transition-colors shadow-sm rounded-lg">
            <Plus className="w-5 h-5 mr-2" />
            Ajouter
          </button>
          <button className="flex items-center px-4 py-2 bg-green-600 text-white hover:bg-green-700 transition-colors shadow-sm rounded-lg">
            <Upload className="w-5 h-5 mr-2" />
            Importer
          </button>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-sm rounded-lg">
            <Download className="w-5 h-5 mr-2" />
            Exporter
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-purple-50 p-6 border border-purple-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-600 text-sm font-medium">Professeurs</p>
              <p className="text-3xl font-bold text-purple-700">
                {professors.length}
              </p>
            </div>
            <GraduationCap className="w-12 h-12 text-purple-500" />
          </div>
        </div>

        <div className="bg-amber-50 p-6 border border-amber-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-amber-600 text-sm font-medium">Personnels</p>
              <p className="text-3xl font-bold text-amber-700">
                {staff.length}
              </p>
            </div>
            <UserCheck className="w-12 h-12 text-amber-500" />
          </div>
        </div>

        <div className="bg-blue-50 p-6 border border-blue-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-medium">Total</p>
              <p className="text-3xl font-bold text-blue-700">
                {professors.length + staff.length}
              </p>
            </div>
            <Users className="w-12 h-12 text-blue-500" />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 md:px-6 xl:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative mb-12 mt-16 sm:mb-16 overflow-hidden rounded-xl"
        >
          <div className="absolute inset-0">
            <img
              src="/modern-university-campus-with-science-buildings-an.png"
              alt="Histoire de la faculté"
              className="w-full h-64 sm:h-80 lg:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60"></div>
          </div>
          <div className="relative z-10 text-center py-10 sm:py-16 lg:py-20 px-4 sm:px-6">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-white">
              Annuaire
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Professeurs | Personnels
            </p>
          </div>
        </motion.div>

        {isAdmin && <AdminPanel />}

        {/* Navigation Tabs */}
        <div className="bg-white shadow-sm border border-slate-200 rounded-lg p-2 mt-8 mb-8">
          <div className="flex space-x-2">
            {[
              {
                id: "professors",
                label: "Professeurs",
                icon: GraduationCap,
                count: professors.length,
              },
              {
                id: "staff",
                label: "Personnels",
                icon: UserCheck,
                count: staff.length,
              },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-6 py-4 font-medium transition-all duration-300 rounded-lg ${
                  activeTab === tab.id
                    ? "bg-purple-600 text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <tab.icon className="w-5 h-5 mr-3" />
                {tab.label}
                <span
                  className={`ml-3 px-2 py-1 text-xs rounded-full ${
                    activeTab === tab.id
                      ? "bg-white/20 text-white"
                      : "bg-slate-200 text-slate-700"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white shadow-sm border border-slate-200 rounded-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher une personne..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex bg-slate-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded transition-all ${
                    viewMode === "grid"
                      ? "bg-purple-600 text-white shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded transition-all ${
                    viewMode === "list"
                      ? "bg-purple-600 text-white shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <p className="text-slate-600">
            Total : <span className="font-semibold">{filteredData.length}</span>{" "}
            personne{filteredData.length !== 1 ? "s" : ""}
            {searchTerm && (
              <span className="ml-2 text-purple-600">pour "{searchTerm}"</span>
            )}
          </p>
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value={6}>6 par page</option>
            <option value={12}>12 par page</option>
            <option value={24}>24 par page</option>
          </select>
        </div>

        <div
          className={`${
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-4"
          } mb-8`}
        >
          {currentItems.map((person) => (
            <PersonCard
              key={isProfessor(person) ? person.idProfesseur : person.idPat}
              person={person}
            />
          ))}
        </div>

        {filteredData.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="w-32 h-32 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-16 h-16 text-slate-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">
              Aucun résultat trouvé
            </h3>
            <p className="text-slate-600 mb-4">
              Essayez de modifier vos critères de recherche
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Effacer la recherche
              </button>
            )}
          </motion.div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 mt-8 mb-8">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className={`flex items-center px-4 py-2 rounded-lg border transition-colors ${
                currentPage === 1
                  ? "opacity-50 cursor-not-allowed border-slate-200 text-slate-400"
                  : "hover:bg-purple-50 text-purple-600 border-purple-200"
              }`}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">Précédent</span>
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-10 h-10 flex items-center justify-center rounded-lg border transition-colors ${
                  currentPage === i + 1
                    ? "bg-purple-600 text-white border-purple-600 shadow-md"
                    : "text-slate-600 border-slate-300 hover:bg-slate-100"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className={`flex items-center px-4 py-2 rounded-lg border transition-colors ${
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed border-slate-200 text-slate-400"
                  : "hover:bg-purple-50 text-purple-600 border-purple-200"
              }`}
            >
              <span className="hidden sm:inline">Suivant</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        )}
      </div>

      {/* Floating Action Button for Admin */}
      {isAdmin && (
        <button className="fixed bottom-8 right-8 p-4 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 transition-all hover:scale-105">
          <Plus className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default AnnuairePage;
