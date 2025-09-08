import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Users, 
  GraduationCap, 
  UserCheck, 
  Settings, 
  Plus, 
  Filter, 
  Grid, 
  List,
  Star,
  MapPin,
  Mail,
  Phone,
  Calendar,
  BookOpen,
  Award,
  Clock,
  Building2,
  ChevronRight,
  Eye,
  Edit,
  Trash2,
  Download,
  Upload,
  BarChart3
} from 'lucide-react';

const AnnuairePage = () => {
  const [activeTab, setActiveTab] = useState('students');
  const [isAdmin, setIsAdmin] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedFilter, setSelectedFilter] = useState('all');

type Staff = {
  id: number;
  name: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  office: string;
  hours: string;
  photo: string;
};

type  Student={
      
      id: number,
      name:string,
      email: string,
      phone: string,
      program: string,
      year: string,
      department:string,
      photo:string
    
}

type Professors = {
      id: number,
      name: string,
      email: string,
      phone: string,
      title: string,
      department: string,
      speciality: string,
      office: string,
      consultationHours: string,
      photo: string

}
function isStudent(person: Student | Professors | Staff): person is Student {
  return 'program' in person && 'year' in person;
}

function isProfessor(person: Student | Professors | Staff): person is Professors {
  return 'title' in person && 'speciality' in person;
}

function isStaff(person: Student | Professors | Staff): person is Staff {
  return 'office' in person && 'hours' in person;
}

  const students:Student[] = [
    {
      id: 1,
      name: "Marie Dubois",
      email: "marie.dubois@univ.edu",
      phone: "+261 34 12 345 67",
      program: "Master en Informatique",
      year: "2ème année",
      department: "Sciences & Technologies",
      photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Jean Rakoto",
      email: "jean.rakoto@univ.edu",
      phone: "+261 33 98 765 43",
      program: "Licence en Économie",
      year: "3ème année",
      department: "Sciences Économiques",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Sophie Martin",
      email: "sophie.martin@univ.edu",
      phone: "+261 32 55 123 89",
      program: "Doctorat en Biologie",
      year: "1ère année",
      department: "Sciences Naturelles",
      photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    }
  ];

  const professors:Professors[] = [
    {
      id: 1,
      name: "Dr. Paul Andriamanana",
      email: "paul.andriamanana@univ.edu",
      phone: "+261 34 11 22 33",
      title: "Professeur Titulaire",
      department: "Sciences & Technologies",
      speciality: "Intelligence Artificielle",
      office: "Bât. A - Bureau 205",
      consultationHours: "Lun-Mer 14h-16h",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Dr. Christine Ranaivo",
      email: "christine.ranaivo@univ.edu",
      phone: "+261 33 44 55 66",
      title: "Maître de Conférences",
      department: "Sciences Économiques",
      speciality: "Économie du Développement",
      office: "Bât. B - Bureau 112",
      consultationHours: "Mar-Jeu 10h-12h",
      photo: "https://images.unsplash.com/photo-1559209172-0ff8f5ed0cb6?w=150&h=150&fit=crop&crop=face"
    }
  ];

  const staff: Staff[] = [
    {
      id: 1,
      name: "Hery Rasolofo",
      email: "hery.rasolofo@univ.edu",
      phone: "+261 34 77 88 99",
      position: "Responsable Scolarité",
      department: "Administration",
      office: "Bât. Admin - Bureau 15",
      hours: "Lun-Ven 8h-16h",
      photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face"
    }
  ];

  const getCurrentData = () => {
    switch(activeTab) {
      case 'students': return students;
      case 'professors': return professors;
      case 'staff': return staff;
      default: return [];
    }
  };

  const PersonCard = ({ person }:{person:Staff | Student| Professors}) => (
    <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-purple-100 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-yellow-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative p-6">
        <div className="flex items-start space-x-4">
          <div className="relative">
            <img
              src={person.photo}
              alt={person.name}
              className="w-16 h-16 rounded-xl object-cover border-2 border-purple-200 group-hover:border-yellow-400 transition-colors duration-300"
            />
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-purple-700 transition-colors duration-300">
              {person.name}
            </h3>
            <p className="text-purple-600 font-medium text-sm mb-2">
              {'program' in person ? person.program : isProfessor(person) ? person.title : person.position}
            </p>
            
            <div className="space-y-2">
              <div className="flex items-center text-gray-600 text-sm">
                <Building2 className="w-4 h-4 mr-2 text-purple-500" />
                {person.department}
              </div>
              <div className="flex items-center text-gray-600 text-sm">
                <Mail className="w-4 h-4 mr-2 text-yellow-600" />
                {person.email}
              </div>
              <div className="flex items-center text-gray-600 text-sm">
                <Phone className="w-4 h-4 mr-2 text-green-600" />
                {person.phone}
              </div>
              
              {isProfessor(person) && (
                <>
                  <div className="flex items-center text-gray-600 text-sm">
                    <MapPin className="w-4 h-4 mr-2 text-red-500" />
                    {person.office}
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <Clock className="w-4 h-4 mr-2 text-blue-500" />
                    {person.consultationHours}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        
        {isAdmin && (
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex space-x-2">
              <button className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                <Eye className="w-4 h-4" />
              </button>
              <button className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                <Edit className="w-4 h-4" />
              </button>
              <button className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
        
        <div className="mt-4 pt-4 border-t border-purple-100">
          <div className="flex justify-between items-center">
            {isStudent(person) && (
              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                {person.year}
              </span>
            )}
            {isProfessor(person) && (
              <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
                {person.speciality}
              </span>
            )}
            {isStaff(person) && (
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                {person.hours}
              </span>
            )}
            
            <Star className="w-5 h-5 text-yellow-400 hover:text-yellow-500 cursor-pointer transition-colors" />
          </div>
        </div>
      </div>
    </div>
  );

  const AdminPanel = () => (
    <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-purple-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-gradient-to-r from-purple-500 to-yellow-500 rounded-xl">
            <Settings className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Panneau d'Administration</h2>
            <p className="text-gray-600">Gérez votre annuaire universitaire</p>
          </div>
        </div>
        
        <div className="flex space-x-3">
          <button className="flex items-center px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl">
            <Plus className="w-5 h-5 mr-2" />
            Ajouter
          </button>
          <button className="flex items-center px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl">
            <Upload className="w-5 h-5 mr-2" />
            Importer
          </button>
          <button className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl">
            <Download className="w-5 h-5 mr-2" />
            Exporter
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-medium">Étudiants</p>
              <p className="text-3xl font-bold text-blue-900">{students.length}</p>
            </div>
            <Users className="w-12 h-12 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-600 text-sm font-medium">Professeurs</p>
              <p className="text-3xl font-bold text-purple-900">{professors.length}</p>
            </div>
            <GraduationCap className="w-12 h-12 text-purple-500" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-sm font-medium">Personnel</p>
              <p className="text-3xl font-bold text-green-900">{staff.length}</p>
            </div>
            <UserCheck className="w-12 h-12 text-green-500" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-2xl border border-yellow-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-600 text-sm font-medium">Départements</p>
              <p className="text-3xl font-bold text-yellow-900">8</p>
            </div>
            <BarChart3 className="w-12 h-12 text-yellow-500" />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div 
      className="min-h-screen transition-all duration-1000"
      style={{ 
        background: 'linear-gradient(135deg, #f3f3f3 0%, #e6b20b15 50%, #78037615 100%)',
        fontFamily: 'Inter, system-ui, sans-serif'
      }}
    >
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-lg shadow-xl border-b border-purple-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-yellow-500 rounded-2xl shadow-lg">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-yellow-600 bg-clip-text text-transparent">
                  Annuaire Universitaire
                </h1>
                <p className="text-gray-600 text-sm">Université de Madagascar</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsAdmin(!isAdmin)}
                className={`flex items-center px-4 py-2 rounded-xl font-medium transition-all duration-300 shadow-lg ${
                  isAdmin 
                    ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Settings className="w-5 h-5 mr-2" />
                {isAdmin ? 'Mode Utilisateur' : 'Mode Admin'}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {isAdmin && <AdminPanel />}
        
        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl shadow-xl p-2 mb-8 border border-purple-100">
          <div className="flex space-x-2">
            {[
              { id: 'students', label: 'Étudiants', icon: Users, count: students.length },
              { id: 'professors', label: 'Professeurs', icon: GraduationCap, count: professors.length },
              { id: 'staff', label: 'Personnel', icon: UserCheck, count: staff.length }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-6 py-4 rounded-xl font-medium transition-all duration-500 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-purple-500 to-yellow-500 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <tab.icon className="w-5 h-5 mr-3" />
                {tab.label}
                <span className={`ml-3 px-2 py-1 rounded-full text-xs ${
                  activeTab === tab.id ? 'bg-white/20' : 'bg-gray-200'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-purple-100">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher une personne..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
              />
            </div>
            
            <div className="flex items-center space-x-4">
              <select 
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-4 py-3 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
              >
                <option value="all">Tous les départements</option>
                <option value="tech">Sciences & Technologies</option>
                <option value="econ">Sciences Économiques</option>
                <option value="admin">Administration</option>
              </select>
              
              <div className="flex bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    viewMode === 'grid' ? 'bg-purple-500 text-white shadow' : 'text-gray-600'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    viewMode === 'list' ? 'bg-purple-500 text-white shadow' : 'text-gray-600'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
          {getCurrentData().map((person) => (
            <PersonCard key={person.id} person={person} type={activeTab} />
          ))}
        </div>

        {getCurrentData().length === 0 && (
          <div className="text-center py-16">
            <div className="w-32 h-32 bg-gradient-to-r from-purple-100 to-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-16 h-16 text-purple-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Aucun résultat trouvé</h3>
            <p className="text-gray-600">Essayez de modifier vos critères de recherche</p>
          </div>
        )}
      </div>

      {/* Floating Action Button for Admin */}
      {isAdmin && (
        <button className="fixed bottom-8 right-8 p-4 bg-gradient-to-r from-purple-500 to-yellow-500 text-white rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110">
          <Plus className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default AnnuairePage;