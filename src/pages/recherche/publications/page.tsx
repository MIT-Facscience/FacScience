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
import { useMemo, useState } from "react";

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

// Données d'exemple
const mockPublications: Publication[] = [
  {
    id: "1",
    title:
      "Deep Learning Approaches for Natural Language Understanding in Conversational AI Systems",
    authors: ["Marie Dubois", "Jean Dupont", "Sophie Martin"],
    venue: "Journal of Artificial Intelligence Research",
    year: 2024,
    type: "journal",
    abstract:
      "This paper presents novel deep learning architectures for improving natural language understanding in conversational AI systems. We propose a hybrid approach combining transformer models with graph neural networks.",
    keywords: ["Deep Learning", "NLP", "Conversational AI", "Transformers"],
    doi: "10.1613/jair.1.12345",
    citations: 42,
  },
  {
    id: "2",
    title:
      "Quantum Machine Learning: A Comprehensive Survey of Current Approaches and Future Perspectives",
    authors: ["Pierre Quantum", "Alice Computing", "Bob Analysis"],
    venue: "International Conference on Machine Learning (ICML)",
    year: 2024,
    type: "conference",
    abstract:
      "We provide a comprehensive survey of quantum machine learning algorithms, analyzing their theoretical foundations and practical implementations on current quantum hardware.",
    keywords: ["Quantum Computing", "Machine Learning", "Quantum Algorithms"],
    citations: 28,
  },
  {
    id: "3",
    title:
      "Federated Learning with Privacy-Preserving Techniques: Challenges and Solutions",
    authors: ["Emma Privacy", "Lucas Federated", "Nina Secure"],
    venue: "IEEE Transactions on Information Forensics and Security",
    year: 2023,
    type: "journal",
    abstract:
      "This work addresses the challenges of maintaining privacy in federated learning systems while ensuring model performance and convergence.",
    keywords: [
      "Federated Learning",
      "Privacy",
      "Security",
      "Differential Privacy",
    ],
    citations: 67,
  },
  {
    id: "4",
    title:
      "Computer Vision for Autonomous Driving: Real-time Object Detection and Tracking",
    authors: ["Thomas Vision", "Clara Detection"],
    venue: "European Conference on Computer Vision (ECCV)",
    year: 2023,
    type: "conference",
    abstract:
      "We present a novel real-time object detection and tracking system specifically designed for autonomous driving applications.",
    keywords: ["Computer Vision", "Autonomous Driving", "Object Detection"],
    citations: 35,
  },
  {
    id: "5",
    title: "Blockchain-based Smart Contracts for IoT Device Management",
    authors: ["Alex Blockchain", "Sarah IoT", "David Smart"],
    venue: "Workshop on Blockchain and IoT",
    year: 2023,
    type: "workshop",
    abstract:
      "This paper explores the integration of blockchain technology with IoT devices through smart contracts for enhanced security and management.",
    keywords: ["Blockchain", "IoT", "Smart Contracts"],
    citations: 15,
  },
  {
    id: "6",
    title: "Advances in Reinforcement Learning for Robotics Applications",
    authors: ["Robot Master", "Learning Expert"],
    venue: "Robotics and Autonomous Systems",
    year: 2022,
    type: "journal",
    abstract:
      "A comprehensive analysis of reinforcement learning techniques applied to robotics, with focus on manipulation and navigation tasks.",
    keywords: ["Reinforcement Learning", "Robotics", "Navigation"],
    citations: 89,
  },
  {
    id: "7",
    title:
      "Explainable AI for Medical Diagnosis: Interpretable Models and Clinical Applications",
    authors: ["Dr. Sarah Analysis", "Prof. John Explain", "Dr. Maria Clinical"],
    venue: "Nature Machine Intelligence",
    year: 2024,
    type: "journal",
    abstract:
      "We present interpretable machine learning models for medical diagnosis, focusing on transparency and clinical applicability in healthcare settings.",
    keywords: [
      "Explainable AI",
      "Medical Diagnosis",
      "Healthcare",
      "Interpretability",
    ],
    doi: "10.1038/s42256-024-00789-1",
    citations: 73,
  },
  {
    id: "8",
    title: "Edge Computing for Real-time Data Processing in Smart Cities",
    authors: ["Urban Tech", "Smart City Expert", "Data Scientist"],
    venue: "IEEE International Conference on Smart Cities",
    year: 2024,
    type: "conference",
    abstract:
      "This paper explores edge computing architectures for real-time data processing in smart city applications, addressing latency and scalability challenges.",
    keywords: ["Edge Computing", "Smart Cities", "Real-time Processing", "IoT"],
    citations: 31,
  },
  {
    id: "9",
    title:
      "Sustainable Machine Learning: Energy-Efficient Neural Network Training",
    authors: ["Green AI Researcher", "Sustainable Computing", "Energy Expert"],
    venue: "Workshop on Green AI",
    year: 2023,
    type: "workshop",
    abstract:
      "We investigate energy-efficient training methods for neural networks, proposing novel techniques to reduce carbon footprint in ML training.",
    keywords: [
      "Green AI",
      "Energy Efficiency",
      "Sustainable Computing",
      "Neural Networks",
    ],
    citations: 18,
  },
  {
    id: "10",
    title: "Cybersecurity in Cloud Computing: A Multi-layered Defense Approach",
    authors: ["Security Expert", "Cloud Architect", "Cyber Analyst"],
    venue: "ACM Transactions on Information and System Security",
    year: 2023,
    type: "journal",
    abstract:
      "This work presents a comprehensive multi-layered security framework for cloud computing environments, addressing emerging threats and vulnerabilities.",
    keywords: [
      "Cybersecurity",
      "Cloud Computing",
      "Defense Systems",
      "Security Framework",
    ],
    doi: "10.1145/3456789.3456790",
    citations: 54,
  },
];

const ITEMS_PER_PAGE = 4;

export default function ScientificPublications() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);

  const publicationTypes = [
    { value: "all", label: "Tous types" },
    { value: "journal", label: "Articles de revue" },
    { value: "conference", label: "Conférences" },
    { value: "workshop", label: "Ateliers" },
    { value: "book", label: "Livres" },
  ];

  const years = [
    "all",
    ...Array.from(new Set(mockPublications.map((pub) => pub.year))).sort(
      (a, b) => b - a
    ),
  ];

  const filteredPublications = useMemo(() => {
    const filtered = mockPublications.filter((pub) => {
      const matchesSearch =
        searchTerm === "" ||
        pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pub.authors.some((author) =>
          author.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        pub.keywords.some((keyword) =>
          keyword.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesType = selectedType === "all" || pub.type === selectedType;
      const matchesYear =
        selectedYear === "all" || pub.year.toString() === selectedYear;

      return matchesSearch && matchesType && matchesYear;
    });

    // Reset current page if it's beyond available pages
    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }

    return filtered;
  }, [searchTerm, selectedType, selectedYear, currentPage]);

  const totalPages = Math.ceil(filteredPublications.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedPublications = filteredPublications.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Scroll to top when page changes
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "journal":
        return <BookOpen className="w-5 h-5" />;
      case "conference":
        return <Users className="w-5 h-5" />;
      case "workshop":
        return <Zap className="w-5 h-5" />;
      case "book":
        return <Award className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
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
      // Show all pages if total pages is small
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`w-10 h-10 rounded-lg font-medium transition-all duration-200 ${
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
      // Show first page
      buttons.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className={`w-10 h-10 rounded-lg font-medium transition-all duration-200 ${
            1 === currentPage
              ? "bg-primary text-white shadow-lg"
              : "bg-card text-foreground hover:bg-muted border border-border"
          }`}
        >
          1
        </button>
      );

      // Add ellipsis if needed
      if (currentPage > 3) {
        buttons.push(
          <span key="ellipsis1" className="px-2 text-muted-foreground">
            ...
          </span>
        );
      }

      // Add pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        buttons.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`w-10 h-10 rounded-lg font-medium transition-all duration-200 ${
              i === currentPage
                ? "bg-primary text-white shadow-lg"
                : "bg-card text-foreground hover:bg-muted border border-border"
            }`}
          >
            {i}
          </button>
        );
      }

      // Add ellipsis if needed
      if (currentPage < totalPages - 2) {
        buttons.push(
          <span key="ellipsis2" className="px-2 text-muted-foreground">
            ...
          </span>
        );
      }

      // Show last page
      if (totalPages > 1) {
        buttons.push(
          <button
            key={totalPages}
            onClick={() => handlePageChange(totalPages)}
            className={`w-10 h-10 rounded-lg font-medium transition-all duration-200 ${
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
      <div className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-10">
        <div className="container mx-auto h-96 px-4 md:px-6 xl:px-8 pt-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-hover to-ring bg-clip-text text-transparent mt-12">
              Publications Scientifiques
            </h1>
            <p
              className="text-lg max-w-2xl mx-auto mt-4"
              style={{ color: "#524751" }}
            >
              Découvrez nos dernières recherches et contributions académiques
              dans les domaines de pointe
            </p>
          </div>

          {/* Filtres et recherche */}
          <div className="bg-white/60 backdrop-blur-sm  shadow-lg border border-amber-200  p-6 mt-16">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Tous les départements"
                  className="w-full pl-4 pr-4 py-3 text-slate-800 border border-amber-200  bg-white/80 backdrop-blur-sm focus:ring-2 transition-all duration-200"
                />
              </div>

              {/* Barre de recherche */}
              <div className="flex-1 relative">
                {/* <h1>salut</h1> */}
                <Search className="absolute text-black left-4 top-1/2 transform -translate-y-1/2 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Rechercher par titre, auteur ou mot-clé..."
                  className="w-full pl-12 text-slate-800 pr-4 py-3 border border-amber-200  bg-white/80 backdrop-blur-sm focus:ring-2 transition-all duration-200"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Filtres */}
              <div className="flex gap-3">
                <div className="relative">
                  <Filter className="absolute  text-slate-800 left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" />
                  <select
                    className="pl-10 pr-8 py-3  border border-amber-200 bg-white/80 backdrop-blur-sm focus:ring-2 appearance-none cursor-pointer "
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                  >
                    {publicationTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="relative">
                  <Calendar className="absolute text-slate-800 left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" />
                  <select
                    className="pl-10 pr-8 py-3   border  border-amber-200 bg-white/80 backdrop-blur-sm focus:ring-2 appearance-none cursor-pointer"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                  >
                    <option value="all">Toutes années</option>
                    {years.slice(1).map((year) => (
                      <option key={year} value={year.toString()}>
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
      <div className="container mx-auto px-4 md:px-6 xl:px-8">
        {/* Statistiques */}
        <div className="mb-8">
          <div className="bg-white/60 backdrop-blur-sm shadow-lg border border-pink-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold" style={{ color: "#111011" }}>
                  {filteredPublications.length}
                </p>
                <p style={{ color: "#524751" }}>Publications trouvées</p>
              </div>
              <div className="text-right">
                <p className="text-sm" style={{ color: "#524751" }}>
                  Page {currentPage} sur {totalPages}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Liste des publications */}
        <div className="space-y-6">
          {paginatedPublications.length > 0 ? (
            paginatedPublications.map((publication) => (
              <div
                key={publication.id}
                className="bg-white/70 backdrop-blur-sm  shadow-lg border border-pink-200 p-8 hover:shadow-xl transition-all duration-300 group"
              >
                {/* En-tête de la publication */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ${getTypeColor(
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
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border"
                        style={{
                          backgroundColor: "#f1f5f9",
                          color: "#524751",
                          borderColor: "#b40ab1",
                        }}
                      >
                        <Calendar className="w-4 h-4" />
                        {publication.year}
                      </span>
                    </div>
                    <h2
                      className="text-xl font-bold mb-3 transition-colors duration-200"
                      style={{ color: "#111011" }}
                    >
                      {publication.title}
                    </h2>
                  </div>
                  {publication.citations && (
                    <div className="text-right">
                      <p
                        className="text-2xl font-bold"
                        style={{ color: "#780376" }}
                      >
                        {publication.citations}
                      </p>
                      <p className="text-sm" style={{ color: "#524751" }}>
                        citations
                      </p>
                    </div>
                  )}
                </div>

                {/* Auteurs */}
                <div className="flex items-center gap-2 mb-4">
                  <Users className="w-4 h-4" style={{ color: "#524751" }} />
                  <p style={{ color: "#111011" }}>
                    {publication.authors.join(", ")}
                  </p>
                </div>

                {/* Venue */}
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="w-4 h-4" style={{ color: "#524751" }} />
                  <p className="font-medium" style={{ color: "#111011" }}>
                    {publication.venue}
                  </p>
                </div>

                {/* Abstract */}
                <div className="mb-4">
                  <p className="leading-relaxed" style={{ color: "#524751" }}>
                    {publication.abstract}
                  </p>
                </div>

                {/* Mots-clés */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {publication.keywords.map((keyword, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-sm rounded-full border"
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
                  className="flex items-center justify-between pt-4 border-t"
                  style={{ borderColor: "#b40ab1" }}
                >
                  <div className="flex gap-3">
                    {publication.doi && (
                      <button
                        className="inline-flex items-center gap-2 px-4 py-2 text-white rounded-lg transition-colors duration-200"
                        style={{ backgroundColor: "#780376" }}
                      >
                        <ExternalLink className="w-4 h-4" />
                        DOI
                      </button>
                    )}
                    {publication.url && (
                      <button
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200"
                        style={{ backgroundColor: "#f1f5f9", color: "#524751" }}
                      >
                        <ExternalLink className="w-4 h-4" />
                        Lien
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-xl" style={{ color: "#524751" }}>
                Aucune publication trouvée
              </p>
              <p className="text-sm mt-2" style={{ color: "#524751" }}>
                Essayez de modifier vos critères de recherche
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 mb-12">
            <div className="bg-white/60 backdrop-blur-sm  shadow-lg border border-pink-200 p-6">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="inline-flex items-center gap-2 px-4 py-2 text-slate-400 bg-white/80 rounded-lg border hover:bg-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  <ChevronLeft className="w-4 h-4 hover:text-amber-100" />
                  Précédent
                </button>

                <div className="flex items-center gap-2">
                  {renderPaginationButtons()}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="inline-flex items-center gap-2 px-4 py-2 text-slate-400 bg-white/80 rounded-lg border hover:bg-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  Suivant
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
