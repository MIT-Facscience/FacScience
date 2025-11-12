import {
  Award,
  BookOpen,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  FileText,
  Filter,
  Search,
  Users,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface Publication {
  id: string;
  title: string;
  authors: string[];
  venue: string;
  year: number;
  type: "journal" | "conference" | "workshop" | "book";
  abstract: string;
  keywords: string[];
  doi?: string;
  url?: string;
  citations?: number;
}

const ITEMS_PER_PAGE = 4;
const API_BASE_URL = "http://localhost:5194";

export default function PublicationsPage() {
  const { t } = useTranslation("publication");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedYear, setSelectedYear] = useState<string>("all");
  // const [customYear, setCustomYear] = useState<string>("");
  // const [useCustomYear, setUseCustomYear] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // États pour l'API
  const [publications, setPublications] = useState<Publication[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const publicationTypes = [
    { value: "all", label: t("publications.types.all") },
    { value: "journal", label: t("publications.types.journal") },
    { value: "conference", label: t("publications.types.conference") },
    { value: "workshop", label: t("publications.types.workshop") },
    { value: "book", label: t("publications.types.book") },
  ];

  // Années disponibles
  const years = ["all", "2024", "2023", "2022", "2021"];

  // Fetch des publications depuis l'API
  useEffect(() => {
    const fetchPublications = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams();
        
        // N'ajouter les paramètres que s'ils sont différents de "all" ou non vides
        if (searchTerm.trim()) {
          params.append('search', searchTerm.trim());
        }
        if (selectedType && selectedType !== 'all') {
          params.append('type', selectedType);
        }
        if (selectedYear && selectedYear !== 'all') {
          params.append('year', selectedYear);
        }
        params.append('page', currentPage.toString());
        params.append('limit', ITEMS_PER_PAGE.toString());

        const url = `${API_BASE_URL}/api/publications?${params.toString()}`;
        console.log('Fetching URL:', url);
        
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
        const data = await response.json();
        console.log('Fetched data:', data);
        setPublications(data.publications || []);
        setTotal(data.total || 0);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPublications();
  }, [searchTerm, selectedType, selectedYear, currentPage]);

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  // Réinitialiser la page à 1 quand les filtres changent
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedType, selectedYear]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Réinitialiser la page à 1 quand les filtres changent
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedType, selectedYear]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "journal":
        return <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />;
      case "conference":
        return <Users className="w-4 h-4 sm:w-5 sm:h-5" />;
      case "workshop":
        return <Zap className="w-4 h-4 sm:w-5 sm:h-5" />;
      case "book":
        return <Award className="w-4 h-4 sm:w-5 sm:h-5" />;
      default:
        return <FileText className="w-4 h-4 sm:w-5 sm:h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "journal":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "conference":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "workshop":
        return "bg-green-100 text-green-800 border-green-200";
      case "book":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`w-8 h-8 sm:w-10 sm:h-10  font-medium transition-all duration-200 ${
              i === currentPage
                ? "bg-primary text-white shadow-lg"
                : "bg-card text-foreground hover:bg-muted border border-border"
            }`}
          >
            {i}
          </button>
        );
      }
    } else {
      buttons.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className={`w-8 h-8 sm:w-10 sm:h-10  font-medium transition-all duration-200 ${
            1 === currentPage
              ? "bg-primary text-white shadow-lg"
              : "bg-card text-foreground hover:bg-muted border border-border"
          }`}
        >
          1
        </button>
      );

      if (currentPage > 3) {
        buttons.push(
          <span key="ellipsis1" className="px-1 sm:px-2 text-muted-foreground">
            ...
          </span>
        );
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        buttons.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`w-8 h-8 sm:w-10 sm:h-10  font-medium transition-all duration-200 ${
              i === currentPage
                ? "bg-primary text-white shadow-lg"
                : "bg-card text-foreground hover:bg-muted border border-border"
            }`}
          >
            {i}
          </button>
        );
      }

      if (currentPage < totalPages - 2) {
        buttons.push(
          <span key="ellipsis2" className="px-1 sm:px-2 text-muted-foreground">
            ...
          </span>
        );
      }

      if (totalPages > 1) {
        buttons.push(
          <button
            key={totalPages}
            onClick={() => handlePageChange(totalPages)}
            className={`w-8 h-8 sm:w-10 sm:h-10  font-medium transition-all duration-200 ${
              totalPages === currentPage
                ? "bg-primary text-white shadow-lg"
                : "bg-card text-foreground hover:bg-muted border border-border"
            }`}
          >
            {totalPages}
          </button>
        );
      }
    }

    return buttons;
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#fafafa" }}>
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-10 mb-16 md:mb-8">
        <div className="container mx-auto h-64 sm:h-80 md:h-96 px-4 md:px-6 xl:px-8 pt-4 sm:pt-6 md:pt-8">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-hover to-ring bg-clip-text text-transparent mt-4 sm:mt-8 md:mt-12">
              {t("publications.title")}
            </h1>
            <p
              className="text-base sm:text-lg max-w-2xl mx-auto mt-3 sm:mt-4 px-4"
              style={{ color: "#524751" }}
            >
              {t("publications.description")}
            </p>
          </div>

          {/* Filtres et recherche */}
          <div className="bg-white/60 backdrop-blur-sm shadow-lg border border-amber-200 p-4 sm:p-6 mt-8 sm:mt-12 md:mt-16">
            <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
              {/* Barre de recherche */}
              <div className="flex-1 relative min-w-0">
                <Search className="absolute text-black left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5" />
                <input
                  type="text"
                  placeholder={t("publications.searchPlaceholder")}
                  className="w-full pl-10 sm:pl-12 text-slate-800 pr-3 sm:pr-4 py-2.5 sm:py-3 border border-amber-200 bg-white/80 backdrop-blur-sm focus:ring-2 transition-all duration-200 rounded-md"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Filtres */}
              <div className="grid grid-cols-2 md:flex gap-2 sm:gap-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:flex-none min-w-0">
                  <Filter className="absolute text-slate-800 left-2.5 sm:left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <select
                    className="w-full pl-9 sm:pl-10 pr-7 sm:pr-8 py-2.5 sm:py-3 text-sm sm:text-base border border-amber-200 bg-white/80 backdrop-blur-sm focus:ring-2 appearance-none cursor-pointer rounded-md text-slate-800"
                    value={selectedType}
                    onChange={(e) => {
                      console.log('Type sélectionné:', e.target.value);
                      setSelectedType(e.target.value);
                    }}
                  >
                    {publicationTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="relative flex-1 sm:flex-none min-w-0">
                  <Calendar className="absolute text-slate-800 left-2.5 sm:left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <select
                    className="w-full pl-9 sm:pl-10 pr-7 sm:pr-8 py-2.5 sm:py-3 text-sm sm:text-base border border-amber-200 bg-white/80 backdrop-blur-sm focus:ring-2 appearance-none cursor-pointer rounded-md text-slate-800"
                    value={selectedYear}
                    onChange={(e) => {
                      console.log('Année sélectionnée:', e.target.value);
                      setSelectedYear(e.target.value);
                    }}
                  >
                    <option value="all">{t("publications.years.all")}</option>
                    {years.slice(1).map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="container mx-auto px-4 md:px-6 xl:px-8 pb-8">
        {/* Statistiques */}
        <div className="mb-6 sm:mb-8">
          <div className="bg-white/60 backdrop-blur-sm shadow-lg border border-pink-200 p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
              <div>
                <p className="text-xl sm:text-2xl font-bold" style={{ color: "#111011" }}>
                  {loading ? "..." : total}
                </p>
                <p className="text-sm sm:text-base" style={{ color: "#524751" }}>{t("publications.found")}</p>
              </div>
              <div className="text-right">
                <p className="text-xs sm:text-sm" style={{ color: "#524751" }}>
                  {t("publications.page", { current: currentPage, total: totalPages || 1 })}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Liste des publications */}
        <div className="space-y-4 sm:space-y-6">
          {loading ? (
            <div className="text-center py-8 sm:py-12">
              <p className="text-lg sm:text-xl" style={{ color: "#524751" }}>
                {t("publications.loading")}
              </p>
            </div>
         ) : error ? (
            <div className="bg-white/70 backdrop-blur-sm shadow-lg border border-red-200 p-6 sm:p-8 ">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-red-50 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 sm:w-10 sm:h-10 text-red-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-2" style={{ color: "#111011" }}>
                    {t("publications.errorTitle")}
                  </h3>
                  <p className="text-base sm:text-lg" style={{ color: "#524751" }}>
                    {error}
                  </p>
                </div>
                <button
                  onClick={() => window.location.reload()}
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white rounded-md transition-colors duration-200"
                  style={{ backgroundColor: "#780376" }}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  {t("publications.retry")}
                </button>
              </div>
            </div>
          ) : publications.length > 0 ? (
            publications.map((publication) => (
              <div
                key={publication.id}
                className="bg-white/70 backdrop-blur-sm shadow-lg border border-pink-200 p-4 sm:p-6 md:p-8 hover:shadow-xl transition-all duration-300 group "
              >
                {/* En-tête de la publication */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-3 sm:mb-4 gap-3 sm:gap-0">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                      <span
                        className={`inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium border ${getTypeColor(
                          publication.type
                        )}`}
                      >
                        {getTypeIcon(publication.type)}
                        {
                          publicationTypes.find(
                            (t) => t.value === publication.type
                          )?.label
                        }
                      </span>
                      <span
                        className="inline-flex items-center gap-1 px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium border"
                        style={{
                          backgroundColor: "#f1f5f9",
                          color: "#524751",
                          borderColor: "#b40ab1",
                        }}
                      >
                        <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        {publication.year}
                      </span>
                    </div>
                    <h2
                      className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3 transition-colors duration-200 leading-tight"
                      style={{ color: "#111011" }}
                    >
                      {publication.title}
                    </h2>
                  </div>
                  {publication.citations && (
                    <div className="text-right sm:ml-4">
                      <p
                        className="text-lg sm:text-2xl font-bold"
                        style={{ color: "#780376" }}
                      >
                        {publication.citations}
                      </p>
                      <p className="text-xs sm:text-sm hidden sm:block" style={{ color: "#524751" }}>
                        {t("publications.citationsFull")}
                      </p>
                      <p className="text-xs block sm:hidden" style={{ color: "#524751" }}>
                        {t("publications.citationsShort")}
                      </p>
                    </div>
                  )}
                </div>

                {/* Auteurs */}
                <div className="flex items-start gap-2 mb-3 sm:mb-4">
                  <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 mt-0.5" style={{ color: "#524751" }} />
                  <p className="text-sm sm:text-base" style={{ color: "#111011" }}>
                    {t("publications.authors")} {publication.authors.join(", ")}
                  </p>
                </div>

                {/* Venue */}
                <div className="flex items-start gap-2 mb-3 sm:mb-4">
                  <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 mt-0.5" style={{ color: "#524751" }} />
                  <p className="text-sm sm:text-base font-medium" style={{ color: "#111011" }}>
                    {t("publications.venue")} {publication.venue}
                  </p>
                </div>

                {/* Abstract */}
                <div className="mb-3 sm:mb-4">
                  <p className="leading-relaxed text-sm sm:text-base" style={{ color: "#524751" }}>
                    {publication.abstract}
                  </p>
                </div>

                {/* Mots-clés */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                  {publication.keywords.map((keyword, index) => (
                    <span
                      key={index}
                      className="px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-full border"
                      style={{
                        backgroundColor: "#f0e0f0",
                        color: "#780376",
                        borderColor: "#b40ab1",
                      }}
                    >
                      {keyword}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div
                  className="flex items-center justify-start pt-3 sm:pt-4 border-t"
                  style={{ borderColor: "#b40ab1" }}
                >
                  <div className="flex gap-2 sm:gap-3 flex-wrap">
                    {publication.doi && (
                      <button
                        className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-white rounded-md transition-colors duration-200 flex-shrink-0"
                        style={{ backgroundColor: "#780376" }}
                      >
                        <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        {t("publications.doi")}
                      </button>
                    )}
                    {publication.url && (
                      <button
                        className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm rounded-md transition-colors duration-200 flex-shrink-0"
                        style={{ backgroundColor: "#f1f5f9", color: "#524751" }}
                      >
                        <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        {t("publications.link")}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 sm:py-12">
              <p className="text-lg sm:text-xl" style={{ color: "#524751" }}>
                {t("publications.noResults")}
              </p>
              <p className="text-sm mt-2" style={{ color: "#524751" }}>
                {t("publications.noResultsHint")}
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 sm:mt-12 mb-8 sm:mb-12">
            <div className="bg-white/60 backdrop-blur-sm shadow-lg border border-pink-200 p-4 sm:p-6 ">
              <div className="flex items-center justify-between gap-2 sm:gap-0 flex-wrap">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-slate-400 bg-white/80 rounded-md border hover:bg-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex-shrink-0 order-1"
                >
                  <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 hover:text-amber-100" />
                  {t("publications.previous")}
                </button>

                <div className="flex items-center gap-1 sm:gap-2 flex-1 justify-center order-3 sm:order-2">
                  {renderPaginationButtons()}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-slate-400 bg-white/80 rounded-md border hover:bg-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex-shrink-0 order-2 sm:order-3"
                >
                  {t("publications.next")}
                  <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}