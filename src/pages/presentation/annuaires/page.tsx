import type { Professors, Staff, Student } from "@/lib/types";
import { motion } from "framer-motion";
import {
  BarChart3,
  Building2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Download,
  Edit,
  Eye,
  GraduationCap,
  Grid,
  List,
  Mail,
  MapPin,
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
import { useState,useEffect } from "react";


const AnnuairePage = () => {
  const [activeTab, setActiveTab] = useState("students");
  const [isAdmin] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  
  const [professors, setProfessor] = useState<Professors[]>([]);
  const [staff, setStaff] = useState<Staff[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

   useEffect(() => {
    const fetchAllData = async () => {
      try {
        // Lancer les 3 fetch en parallèle
        const [staff, professors] = await Promise.all([
          fetch('http://localhost:3001/api/users'),
          fetch('http://localhost:3001/api/products'),
        ]);

        // Vérifier si toutes les réponses sont OK
        if (!staff.ok || !professors.ok ) {
          throw new Error('Une ou plusieurs requêtes ont échoué');
        }

        // Extraire les données JSON
     
        const profData: Professors[] = await professors.json();
        const paffData: Staff[] = await staff.json();

        // Mettre à jour les états
        setProfessor(profData);
        setStaff(paffData);
        
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  if (loading) return <p>Chargement des données...</p>;
  if (error) return <p style={{ color: 'red' }}>Erreur : {error}</p>;

  function isStudent(person: Student | Professors | Staff): person is Student {
    return "program" in person && "year" in person;
  }

  function isProfessor(
    person: Student | Professors | Staff
  ): person is Professors {
    return "title" in person;
  }

  function isStaff(person: Student | Professors | Staff): person is Staff {
    return "office" in person && "hours" in person;
  }

  

  // const professors: Professors[] = [
  //   {
  //     idProfesseur: 1,
  //     Nom: "Dr. Paul Andriamanana",
  //     Email: "paul.andriamanana@univ.edu",
  //     Tel: "+261 34 11 22 33",
  //     titre: "Professeur Titulaire",
  //     // department: "Sciences & Technologies",
  //     // speciality: "Intelligence Artificielle",
  //     // office: "Bât. A - Bureau 205",
  //     // consultationHours: "Lun-Mer 14h-16h",
  //     photo:
  //       "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  //   },
  
  // ];

  // const staff: Staff[] = [
  //   {
  //     id: 1,
  //     name: "Hery Rasolofo",
  //     email: "hery.rasolofo@univ.edu",
  //     phone: "+261 34 77 88 99",
  //     position: "Responsable Scolarité",
  //     // department: "Administration",
  //     // office: "Bât. Admin - Bureau 15",
  //     // hours: "Lun-Ven 8h-16h",
  //     photo:
  //       "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
  //   },
   
  // ];

  const getCurrentData = () => {
    switch (activeTab) {
    
      case "professors":
        return professors;
      case "staff":
        return staff;
      default:
        return [];
    }
  };
  const data = getCurrentData();
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const PersonCard = ({ person }: { person: Staff  | Professors }) => {
    if (viewMode === "list") {
      return (
        <div className="group bg-white hover:bg-slate-50 transition-all duration-300 border border-slate-200 hover:border-slate-300 overflow-hidden">
          <div className="p-6">
            <div className="flex items-center space-x-6">
              <div className="relative flex-shrink-0">
                {person.photo ? (
                  <img
                    src={person.photo}
                    alt={person.nom}
                    className="w-24 h-24 object-cover"
                  />
                ) : (
                  <div className="w-24 h-24 bg-slate-100 flex items-center justify-center">
                    <User className="w-12 h-12 text-slate-400" />
                  </div>
                )}
                {/* <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 border-2 border-white"></div> */}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-slate-900 mb-1">
                      {person.nom}
                    </h3>
                    <p className="text-primary font-medium mb-3">
                      {/* {"program" in person
                        ? person.program
                        : isProfessor(person)
                        ? person.title
                    //    : person.fonction
                        } */}
                    </p>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-3">
                        {/* <div className="flex items-center text-slate-600">
                          <Building2 className="w-4 h-4 mr-3 text-slate-400" />
                          <span className="text-sm">{person.department}</span>
                        </div> */}
                        <div className="flex items-center text-slate-600">
                          <Mail className="w-4 h-4 mr-3 text-slate-400" />
                          <span className="text-sm">{person.email}</span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center text-slate-600">
                          <Phone className="w-4 h-4 mr-3 text-slate-400" />
                          <span className="text-sm">{person.tel}</span>
                        </div>

                        {/* {isProfessor(person) && (
                          <div className="flex items-center text-slate-600">
                            <MapPin className="w-4 h-4 mr-3 text-slate-400" />
                            <span className="text-sm">{person.office}</span>
                          </div>
                        )} */}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    {isStudent(person) && (
                      <span className="px-3 py-1 bg-purple-100 text-primary text-xs font-medium">
                        {person.year}
                      </span>
                    )}
                    {/* {isProfessor(person) && (
                      <span className="px-3 py-1 bg-amber-100 text-slate-700 text-xs font-medium">
                        {person.speciality}
                      </span>
                    )} */}
                    {/* {isStaff(person) && (
                      <span className="px-3 py-1 bg-amber-100 text-slate-700 text-xs font-medium">
                        {person.hours}
                      </span>
                    )} */}

                    <Star className="w-5 h-5 text-slate-300 hover:text-yellow-400 cursor-pointer transition-colors" />

                    {isAdmin && (
                      <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-slate-600 hover:bg-blue-50 transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-slate-600 hover:bg-green-50 transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-red-600 hover:bg-red-50 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Mode grille (cartes)
    return (
      <div className="group relative bg-white hover:shadow-lg transition-all duration-300 border border-slate-200 hover:border-slate-300 overflow-hidden">
        <div className="p-6">
          <div className="flex items-start space-x-4">
            <div className="relative flex-shrink-0">
              {person.photo ? (
                <img
                  src={person.photo}
                  alt={person.nom}
                  className="w-24 h-36 object-cover border-2 border-slate-200"
                />
              ) : (
                <div className="w-28 h-36 bg-slate-100 border-2 border-slate-200 flex items-center justify-center">
                  <User className="w-8 h-8 text-slate-400" />
                </div>
              )}
              {/* <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 border-2 border-white"></div> */}
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-slate-900 mb-1">
                {person.nom}
              </h3>
              <p className="text-primary font-medium text-sm mb-3">
                {/* {"program" in person
                  ? person.program
                  : isProfessor(person)
                  ? person.titre
                  : person.fonction
                } */}
              </p>

              <div className="space-y-2">
                {/* <div className="flex items-center text-slate-600 text-sm">
                  <Building2 className="w-4 h-4 mr-2 text-slate-400" />
                  {person.department}
                </div> */}
                <div className="flex items-center text-slate-600 text-sm">
                  <Mail className="w-4 h-4 mr-2 text-slate-400" />
                  {person.email}
                </div>
                <div className="flex items-center text-slate-600 text-sm">
                  <Phone className="w-4 h-4 mr-2 text-slate-400" />
                  {person.tel}
                </div>

                {isProfessor(person) && (
                  <>
                    {/* <div className="flex items-center text-slate-600 text-sm">
                      <MapPin className="w-4 h-4 mr-2 text-slate-400" />
                      {person.office}
                    </div> */}
                    {/* <div className="flex items-center text-slate-600 text-sm">
                      <Clock className="w-4 h-4 mr-2 text-slate-400" />
                      {person.consultationHours}
                    </div> */}
                  </>
                )}
              </div>
            </div>
          </div>

          {isAdmin && (
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="flex space-x-2">
                <button className="p-2 bg-blue-500 text-white hover:bg-blue-600 transition-colors">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="p-2 bg-green-500 text-white hover:bg-green-600 transition-colors">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-2 bg-red-500 text-white hover:bg-red-600 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          <div className="mt-4 pt-4 border-t border-slate-100">
            <div className="flex justify-between items-center">
              {isStudent(person) && (
                <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium">
                  {person.year}
                </span>
              )}
              {isProfessor(person) && (
                <span className="px-3 py-1 bg-transparent text-slate-700 text-xs font-medium">
                
                </span>
              )}
              {isStaff(person) && (
                <span className="px-3 py-1 bg-black text-slate-700 text-xs font-medium">
                
                </span>
              )}
               {/* <div className="flex  items-end justify-end"> */}
              <Star className="w-5 h-5  text-slate-300 hover:text-yellow-400 cursor-pointer transition-colors" />
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const AdminPanel = () => (
    <div className="bg-white shadow-sm border border-slate-200 p-8 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-primary text-white">
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
          <button className="flex items-center px-4 py-2 bg-purple-600 text-white hover:bg-purple-700 transition-colors shadow-sm">
            <Plus className="w-5 h-5 mr-2" />
            Ajouter
          </button>
          <button className="flex items-center px-4 py-2 bg-green-600 text-white hover:bg-green-700 transition-colors shadow-sm">
            <Upload className="w-5 h-5 mr-2" />
            Importer
          </button>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-sm">
            <Download className="w-5 h-5 mr-2" />
            Exporter
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* <div className="bg-blue-50 p-6 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm font-medium">Étudiants</p>
              <p className="text-3xl font-bold text-slate-900">
                {students.length}
              </p>
            </div>
            <Users className="w-12 h-12 text-slate-500" />
          </div>
      </div> */}

        <div className="bg-purple-50 p-6 border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-600 text-sm font-medium">Professeurs</p>
              <p className="text-3xl font-bold text-primary">
                {professors.length}
              </p>
            </div>
            <GraduationCap className="w-12 h-12 text-purple-500" />
          </div>
        </div>

        <div className="bg-amber-50 p-6 border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm font-medium">Personnel</p>
              <p className="text-3xl font-bold text-slate-900">
                {staff.length}
              </p>
            </div>
            <UserCheck className="w-12 h-12 text-slate-500" />
          </div>
        </div>

        <div className="bg-yellow-50 p-6 border border-yellow-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-600 text-sm font-medium">
                Départements
              </p>
              <p className="text-3xl font-bold text-yellow-900">8</p>
            </div>
            <BarChart3 className="w-12 h-12 text-yellow-500" />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen  bg-slate-50">
      <div className="container mx-auto px-4 md:px-6 xl:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative mb-12   mt-16 sm:mb-16 overflow-hidden"
        >
          <div className="absolute inset-0">
            <img
              src="/modern-university-campus-with-science-buildings-an.png"
              alt="Histoire de la faculté"
              className="w-full h-64 sm:h-80 lg:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white-900/80 via-gray-800/60"></div>
          </div>
          <div className="relative z-10 text-center py-10 sm:py-16 lg:py-20 px-4 sm:px-6">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-white">
              Annuaire
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-purple-100 max-w-3xl mx-auto leading-relaxed">
              Etudiants | Professeurs | Personnels
            </p>
          </div>
        </motion.div>

        {isAdmin && <AdminPanel />}

        {/* Navigation Tabs */}
        <div className="bg-white shadow-sm border border-slate-200 p-2  mt-8 mb-8">
          <div className="flex space-x-2">
            {[
              // {
              //   id: "students",
              //   label: "Étudiants",
              //   icon: Users,
              //   count: students.length,
              // },
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
                className={`flex items-center px-6 py-4 font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-primary text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <tab.icon className="w-5 h-5 mr-3" />
                {tab.label}
                {/* <span className={`ml-3 px-2 py-1 text-xs ${
                  activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                }`}>
                  {tab.count}
                </span> */}
              </button>
            ))}
          </div>
        </div>

        {/* Search and Filters */}
        <div className="  bg-white shadow-sm border border-slate-200 p-6 mb-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher une personne..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
            </div>

            <div className="flex items-center space-x-4">
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-4 py-3 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              >
                <option value="all">Tous les départements</option>
                <option value="tech">Sciences & Technologies</option>
                <option value="econ">Sciences Économiques</option>
                <option value="admin">Administration</option>
              </select>

              <div className="flex bg-slate-100 p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 transition-all ${
                    viewMode === "grid"
                      ? "bg-primary text-white shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 transition-all ${
                    viewMode === "list"
                      ? "bg-primary text-white shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center  mb-4">
          <p className="text-slate-600">Total : {data.length} personnes</p>
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="border border-slate-300 px-3 py-2"
          >
            <option value={2}>2 par page</option>
            <option value={6}>6 par page</option>
            <option value={15}>15 par page</option>
          </select>
        </div>
        <div
          className={`space-y-4 ${
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 space-y-0"
              : ""
          }`}
        >
          {currentItems.map((person) => (
            <PersonCard key={person.idProfesseur} person={person} />
          ))}
        </div>

        {currentItems.length === 0 && (
          <div className="text-center py-16">
            <div className="w-32 h-32 bg-slate-100 flex items-center justify-center mx-auto mb-6">
              <Search className="w-16 h-16 text-slate-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">
              Aucun résultat trouvé
            </h3>
            <p className="text-slate-600">
              Essayez de modifier vos critères de recherche
            </p>
          </div>
        )}
      </div>

      {/* Floating Action Button for Admin */}
      {isAdmin && (
        <button className="fixed bottom-8 right-8 p-4 bg-purple-600 text-white shadow-lg hover:bg-purple-700 transition-all hover:scale-105">
          <Plus className="w-6 h-6" />
        </button>
      )}

      <div className="flex justify-center items-center space-x-2 mt-8 mb-8">
        {/* Bouton Précédent */}
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className={`flex items-center px-3 py-2 rounded-lg border transition-colors ${
            currentPage === 1
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-purple-100 text-primary border-border"
          }`}
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          <span className="hidden sm:inline">Précédent</span>
        </button>

        {/* Numéros de page */}
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`w-10 h-10 flex items-center justify-center rounded-lg border transition-colors ${
              currentPage === i + 1
                ? "bg-primary text-white border-primary shadow-md"
                : "text-slate-600 border-slate-300 hover:bg-slate-100"
            }`}
          >
            {i + 1}
          </button>
        ))}

        {/* Bouton Suivant */}
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className={`flex items-center px-3 py-2 rounded-lg border transition-colors ${
            currentPage === totalPages
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-purple-100 text-primary border-primary"
          }`}
        >
          <span className="hidden sm:inline">Suivant</span>
          <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>
    </div>
  );
};

export default AnnuairePage;
