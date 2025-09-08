import { useState } from "react"
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  Building,
  MessageSquare,
  Users,
  Globe,
  Star,
  Zap,
  Heart,
  Award,
  BookOpen,
  Microscope,
  ChevronDown,

  MessageCircleMore,
  Mailbox,
  BookText
} from "lucide-react"

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState("departements")
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    telephone: "",
    sujet: "",
    message: ""
  })

  const departements_contacts = [
    {
      nom: "Mathématiques et Informatique",
      responsable: "Prof. RAKOTO Jean Claude",
      email: "mi@sciences.univ-antananarivo.mg",
      telephone: "+261 20 22 123 45",
      bureau: "Bâtiment A, Bureau 201",
      horaires: "Lun-Ven: 8h-16h",
      icon: "💻",
      color: "from-purple-500 to-purple-700"
    },
    {
      nom: "Physique",
      responsable: "Prof. ANDRY Marie Jeanne",
      email: "physique@sciences.univ-antananarivo.mg",
      telephone: "+261 20 22 123 46",
      bureau: "Bâtiment B, Bureau 105",
      horaires: "Lun-Ven: 8h-16h",
      icon: "⚛️",
      color: "from-amber-500 to-orange-600"
    },
    {
      nom: "Chimie",
      responsable: "Dr. RABE Paul Henri",
      email: "chimie@sciences.univ-antananarivo.mg",
      telephone: "+261 20 22 123 47",
      bureau: "Bâtiment C, Bureau 102",
      horaires: "Lun-Ven: 8h-16h",
      icon: "🧪",
      color: "from-purple-600 to-indigo-600"
    },
    {
      nom: "Biologie/Sciences de la Vie",
      responsable: "Prof. HERY Sophie Claudine",
      email: "biologie@sciences.univ-antananarivo.mg",
      telephone: "+261 20 22 123 48",
      bureau: "Bâtiment D, Bureau 201",
      horaires: "Lun-Ven: 8h-16h",
      icon: "🧬",
      color: "from-amber-400 to-yellow-500"
    },
    {
      nom: "Géologie/Sciences de la Terre",
      responsable: "Dr. SOLO Michel André",
      email: "geologie@sciences.univ-antananarivo.mg",
      telephone: "+261 20 22 123 49",
      bureau: "Bâtiment E, Bureau 103",
      horaires: "Lun-Ven: 8h-16h",
      icon: "🌍",
      color: "from-purple-700 to-purple-900"
    },
  ]

  const services_administratifs = [
    {
      service: "Scolarité",
      responsable: "Mme RAZAFY Hanta",
      email: "scolarite@sciences.univ-antananarivo.mg",
      telephone: "+261 20 22 123 50",
      bureau: "Administration, Rez-de-chaussée",
      icon: "📚",
      color: "from-amber-500 to-orange-500"
    },
    {
      service: "Recherche et Coopération",
      responsable: "Dr. RANDRIA Paul",
      email: "recherche@sciences.univ-antananarivo.mg",
      telephone: "+261 20 22 123 51",
      bureau: "Administration, 1er étage",
      icon: "🔬",
      color: "from-purple-500 to-indigo-600"
    },
    {
      service: "Finances",
      responsable: "M. RAKOTO Hery",
      email: "finances@sciences.univ-antananarivo.mg",
      telephone: "+261 20 22 123 52",
      bureau: "Administration, Rez-de-chaussée",
      icon: "💰",
      color: "from-amber-600 to-yellow-600"
    },
    {
      service: "Informatique",
      responsable: "M. NIVO Tiana",
      email: "informatique@sciences.univ-antananarivo.mg",
      telephone: "+261 20 22 123 53",
      bureau: "Bâtiment F, Sous-sol",
      icon: "⚡",
      color: "from-purple-600 to-purple-800"
    },
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Ici vous pourriez ajouter la logique d'envoi
    alert('Message envoyé ! Nous vous répondrons sous 24h')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
      {/* Éléments décoratifs flottants */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-purple-400/10 to-amber-400/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-amber-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-gradient-to-r from-purple-300/5 to-amber-300/5 rounded-full blur-2xl animate-bounce"></div>
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-16 relative">
          <div className="inline-flex items-center gap-2 bg-purple-50 px-4 py-2 rounded-full text-sm font-medium text-primary mb-6">
            <Star className="h-4 w-4" />
            Faculté d'Excellence
            <Star className="h-4 w-4" />
          </div>
          
          <h1 className="text-6xl font-black bg-primary bg-clip-text text-transparent mb-6 leading-tight">
            Contactez-nous
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Nous sommes là pour vous accompagner dans votre parcours scientifique. 
            <span className="text-gray-600 font-semibold"> Une équipe passionnée</span> à votre service.
          </p>
          
          {/* Stats rapides */}
          {/* <div className="flex justify-center gap-8 mt-12">
            <div className="text-center group cursor-pointer">
              <div className="w-16 h-16 mx-auto bg-purple-300 rounded-2xl flex items-center justify-center mb-3 transform group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-purple-300/50">
                <Users className="h-8 w-8 text-white" />
              </div>
              <p className="text-2xl font-bold text-purple-300">5000+</p>
              <p className="text-sm text-slate-600">Étudiants</p>
            </div>
            <div className="text-center group cursor-pointer">
              <div className="w-16 h-16 mx-auto bg-amber-200 rounded-2xl flex items-center justify-center mb-3 transform group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-amber-300/50">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <p className="text-2xl font-bold text-amber-700">5</p>
              <p className="text-sm text-slate-600">Départements</p>
            </div>
            <div className="text-center group cursor-pointer">
              <div className="w-16 h-16 mx-auto bg-purple-300 rounded-2xl flex items-center justify-center mb-3 transform group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-purple-300/50">
                <Award className="h-8 w-8 text-white" />
              </div>
              <p className="text-2xl font-bold text-purple-300">50+</p>
              <p className="text-sm text-slate-600">Années</p>
            </div>
          </div> */}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Colonne principale */}
          <div className="lg:col-span-2 space-y-8">
            {/* Coordonnées générales */}
            <div className="bg-white/80 backdrop-blur-sm border-0  transition-all duration-500 overflow-hidden relative group ">
              <div className="absolute inset-0 bg-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="p-6 relative">
                <div className="flex items-center gap-3 text-2xl mb-6">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <Building className="h-6 w-6 text-white" />
                  </div>
                  <span className="bg-primary bg-clip-text text-transparent font-bold">
                    Informations Principales
                  </span>
                </div>
                
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="p-4 border-gradient-to-r from-purple-50 to-purple-100/50  border border-amber-200/50">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-amber-200/100 rounded-full flex items-center justify-center flex-shrink-0">
                            <MapPin className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-bold text-secondary mb-2">Notre Adresse</h4>
                            <p className="text-slate-700 leading-relaxed">
                              Faculté des Sciences<br />
                              Université d'Antananarivo<br />
                              BP 906, Antananarivo 101<br />
                              <span className="text-amber-400 font-semibold">Madagascar 🇲🇬</span>
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 border-gradient-to-r from-amber-50 to-amber-100/50  border border-amber-200/50">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-amber-200/100 rounded-full flex items-center justify-center flex-shrink-0">
                            <Phone className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-bold text-secondary mb-2">Téléphone</h4>
                            <p className="text-slate-700">
                              <span className="block text-lg font-semibold">+261 20 22 123 40</span>
                              <span className="text-sm text-slate-500">Fax: +261 20 22 123 41</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="p-4 border-gradient-to-r from-purple-50 to-purple-100/50  border border-amber-200/50">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-amber-200/100 rounded-full flex items-center justify-center flex-shrink-0">
                            <Mail className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-bold text-secondary mb-2">Email</h4>
                            <p className="text-slate-700 space-y-1">
                              <span className="block hover:text-purple-600 cursor-pointer transition-colors">contact@sciences.univ-antananarivo.mg</span>
                              <span className="block hover:text-purple-600 cursor-pointer transition-colors">doyen@sciences.univ-antananarivo.mg</span>
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 border-gradient-to-r from-amber-50 to-yellow-100/50  border border-amber-200/50">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-amber-200/100 rounded-full flex items-center justify-center flex-shrink-0">
                            <Clock className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-bold text-secondary mb-2">Horaires</h4>
                            <p className="text-slate-700 text-sm space-y-1">
                              <span className="block">📅 Lun-Ven: <strong>7h30 - 17h00</strong></span>
                              <span className="block">📅 Samedi: <strong>8h00 - 12h00</strong></span>
                              <span className="block text-red-600">📅 Dimanche: <strong>Fermé</strong></span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Réseaux sociaux */}
                  <div className="pt-6 border-t border-slate-200">
                    <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                      <Globe className="h-5 w-5 text-purple-600" />
                      Suivez-nous
                    </h4>
                    <div className="flex gap-3">
                      {[
                        { icon: Facebook, color: "from-blue-500 to-blue-700", hoverColor: "hover:shadow-blue-300/50" },
                        { icon: Twitter, color: "from-sky-500 to-sky-700", hoverColor: "hover:shadow-sky-300/50" },
                        { icon: Linkedin, color: "from-blue-600 to-blue-800", hoverColor: "hover:shadow-blue-300/50" },
                        { icon: Youtube, color: "from-red-500 to-red-700", hoverColor: "hover:shadow-red-300/50" }
                      ].map((social, index) => (
                        <button
                          key={index}
                          className={`w-12 h-12 bg-gradient-to-r ${social.color} rounded-lg flex items-center justify-center transform hover:scale-110 transition-all duration-300 shadow-lg ${social.hoverColor} group`}
                        >
                          <social.icon className="h-5 w-5 text-white group-hover:rotate-12 transition-transform duration-300" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Formulaire de contact */}
            <div className="bg-white/80 backdrop-blur-sm border-1 border-purple-100  transition-all duration-500 overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-purple-500/5 opacity-0"></div>
              <div className="p-6 relative">
                <div className="flex items-center gap-3 text-2xl mb-2">
                  <div className="w-12 h-12 bg-border rounded-full flex items-center justify-center">
                    <MessageSquare className="h-6 w-6 text-white" />
                  </div>
                  <span className="bg-border bg-clip-text text-transparent font-bold">
                    Envoyez-nous un Message
                  </span>
                </div>
                <p className="text-slate-600 mb-6">Nous vous répondrons dans les <strong>24h</strong> !</p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 mb-2  flex items-center gap-2">
                        <Heart className="h-4 w-4 text-border" />
                        Nom complet
                      </label>
                      <input 
                        type="text"
                        name="nom"
                        value={formData.nom}
                        onChange={handleInputChange}
                        placeholder="Votre nom complet" 
                        className="w-full px-4 py-3 border focus:border-border focus:ring-4 focus:ring-purple-100 transition-all duration-300  h-12 outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                        <Mail className="h-4 w-4 text-border" />
                        Email
                      </label>
                      <input 
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="votre.email@exemple.com" 
                        className="w-full px-4 py-3 border-1 border-border focus:border-border focus:ring-4 focus:ring-purple-100 transition-all duration-300  h-12 outline-none"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                        <Phone className="h-4 w-4 text-border" />
                        Téléphone
                      </label>
                      <input 
                        type="tel"
                        name="telephone"
                        value={formData.telephone}
                        onChange={handleInputChange}
                        placeholder="+261 XX XX XXX XX" 
                        className="w-full px-4 py-3 border-1 border-border focus:border-border focus:ring-4 focus:ring-purple-100 transition-all duration-300  h-12 outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 mb-2  flex items-center gap-2">
                        <Zap className="h-4 w-4 text-border" />
                        Sujet
                      </label>
                      <div className="relative">
                        <select
                          name="sujet"
                          value={formData.sujet}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border-1 border-border focus:border-border focus:ring-4 focus:ring-purple-100 transition-all duration-300  h-12 outline-none appearance-none bg-white"
                        >
                          <option value="">Choisir un sujet</option>
                          <option value="admission">🎓 Admission</option>
                          <option value="formation">📚 Formation</option>
                          <option value="recherche">🔬 Recherche</option>
                          <option value="partenariat">🤝 Partenariat</option>
                          <option value="autre">💭 Autre</option>
                        </select>
                        <ChevronDown className="h-5 w-5 text-border absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 mb-2  flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-border" />
                      Votre Message
                    </label>
                    <textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Décrivez votre demande en détail... " 
                      className="w-full px-4 py-3 min-h-[140px] border-1 border-border focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all duration-300  resize-none outline-none"
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full h-14 bg-border hover:from-purple-700 hover:to-amber-700 text-white font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3"
                  >
                    <Send className="h-5 w-5" />
                    Envoyer le message 
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl shadow-purple-500/5 overflow-hidden ">
              <div className="p-6">
                <div className="flex items-center gap-3 text-xl mb-6">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <Microscope className="h-5 w-5 text-white" />
                  </div>
                  <span className="bg-primary bg-clip-text text-transparent font-bold">
                    Départements
                  </span>
                </div>
                
                <div className="space-y-4">
                  {departements_contacts.slice(0, 3).map((dept, index) => (
                    <div
                      key={index}
                      className="group p-4  bg-gray-50  hover:to-amber-50 border border-slate-200 hover:border-purple-300 cursor-pointer transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`min-w-8 h-8 bg-gradient-to-r bg-amber-200 rounded-full flex items-center justify-center text-sm`}>
                          {/* {dept.icon} */}
                          <BookText className="w-4 h-4 text-white"/>
                        </div>
                        <h4 className="font-bold text-slate-800 text-sm group-hover:text-purple-700 transition-colors">
                          {dept.nom}
                        </h4>
                      </div>
                      <p className="text-xs text-slate-600 mb-2">{dept.responsable}</p>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Mail className="h-3 w-3" />
                        <span className="truncate">{dept.email}</span>
                      </div>
                    </div>
                  ))}
                  <button className="w-full mt-4 px-4 py-2 border-2 border-purple-200 hover:border-purple-400 hover:bg-purple-50  text-purple-700 font-medium transition-all duration-300">
                    Voir tous les départements
                  </button>
                </div>
              </div>
            </div>

            {/* Quick actions */}
            <div className="bg-white border-1 border-purple-200 text-white overflow-hidden relative">
              <div className="absolute inset-0 "></div>
              <div className="p-6 relative">
                <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                  <Zap className="h-6 w-6 text-black" />
                <h2 className="text-black"> Actions Rapides</h2> 
                </h3>
                <div className="space-y-3">
                  <button className="w-full p-3 bg-white/20 hover:bg-white/30 rounded-lg text-left transition-all duration-300 hover:transform hover:scale-105">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-gray-600"/>
                      </div>
                      <div>
                        <p className="font-semibold text-black">Plan du Campus</p>
                        <p className="text-xs text-black opacity-80">Trouvez votre chemin</p>
                      </div>
                    </div>
                  </button>
                  <button className="w-full p-3 bg-white/20 hover:bg-white/30 rounded-lg text-left transition-all duration-300 hover:transform hover:scale-105">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                        <Phone className="w-6 h-6 text-gray-600"/>
                      </div>
                      <div>
                        <p className="font-semibold text-black">Urgence</p>
                        <p className="text-xs text-black opacity-80">Contact immédiat</p>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section départements complète */}
        <div className="mt-12 bg-white/80 backdrop-blur-sm border-0  overflow-hidden ">
          <div className="p-6">
            <div className="flex items-center gap-3 text-2xl mb-6">
              <div className="w-12 h-12 bg-border rounded-full flex items-center justify-center">
                <Building className="h-6 w-6 text-white" />
              </div>
              <span className="bg-primary bg-clip-text text-transparent font-bold">
                Tous nos Départements & Services
              </span>
            </div>
            
            <div className="w-full">
              <div className="flex bg-gradient-to-r from-purple-100 to-amber-100 p-1 mb-6">
                <button 
                  onClick={() => setActiveTab("departements")}
                  className={`flex-1 py-3 px-4  font-semibold transition-all duration-300 ${
                    activeTab === "departements" 
                      ? "bg-white  shadow-lg" 
                      : "text-purple-700 hover:bg-white/50"
                  }`}
                >
                   Départements
                </button>
                <button 
                  onClick={() => setActiveTab("services")}
                  className={`flex-1 py-3 px-4 font-semibold transition-all duration-300 ${
                    activeTab === "services" 
                      ? "bg-white shadow-lg" 
                      : "text-amber-700 hover:bg-white/50"
                  }`}
                >
                   Services Admin
                </button>
              </div>
              
              {activeTab === "departements" && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {departements_contacts.map((dept, index) => (
                    <div key={index} className="group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 border-1 border-purple-100 hover:border-purple-200 bg-gradient-to-br from-white to-slate-50 overflow-hidden">
                      <div className="p-6">
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`min-w-12 h-12 bg-gradient-to-r bg-border rounded-full flex items-center justify-center text-xl`}>
                            {/* {dept.icon} */}
                            <BookOpen className="text-gray-100"/>
                          </div>
                          <div>
                            <h3 className="text-lg leading-tight group-hover:text-border transition-colors font-bold">
                              {dept.nom}
                            </h3>
                            <p className="text-sm font-medium text-slate-600">
                              {dept.responsable}
                            </p>
                          </div>
                        </div>
                      
                        <div className="space-y-3 mt-4">
                          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors group/item cursor-pointer">
                            <Mail className="h-4 w-4 text-slate-500 group-hover/item:scale-110 transition-transform" />
                            <span className="text-sm text-slate-600 group-hover/item:text-slate-800 transition-colors truncate">{dept.email}</span>
                          </div>
                          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors group/item cursor-pointer">
                            <Phone className="h-4 w-4 text-slate-500 group-hover/item:scale-110 transition-transform" />
                            <span className="text-sm text-slate-600 group-hover/item:text-slate-800 transition-colors">{dept.telephone}</span>
                          </div>
                          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors group/item">
                            <Building className="h-4 w-4 text-slate-500" />
                            <span className="text-sm text-slate-600 group-hover/item:text-slate-700 transition-colors">{dept.bureau}</span>
                          </div>
                          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors group/item">
                            <Clock className="h-4 w-4 text-slate-500" />
                            <span className="text-sm text-slate-600 group-hover/item:text-slate-700 transition-colors">{dept.horaires}</span>
                          </div>
                        </div>
                       <button 
                          className={`flex w-full items-center justify-center gap-2 mt-4 px-4 py-2 bg-gradient-to-r bg-border hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg text-white border-0  font-medium`}
                        >
                          <h2 className="text-white">Contacter</h2>
                          <MessageCircleMore className="text-gray-100" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {activeTab === "services" && (
                <div className="grid md:grid-cols-2 gap-6">
                  {services_administratifs.map((service, index) => (
                    <div key={index} className="group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 border-2 border-amber-100 hover:border-amber-200 bg-gradient-to-br from-white to-amber-50/30 overflow-hidden">
                      <div className="p-6">
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`w-12 h-12 bg-gradient-to-r bg-secondary rounded-full flex items-center justify-center text-xl shadow-lg`}>
                            {/* {service.icon} */}
                            <Mailbox className="w-6 h-6 text-gray-100 "/>
                          </div>
                          <div>
                            <h3 className="text-lg group-hover:text-secondary transition-colors font-bold">
                              {service.service}
                            </h3>
                            <p className="text-sm font-medium text-slate-600">
                              {service.responsable}
                            </p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 gap-3 mt-4">
                          <div className="flex items-center gap-3 p-3  bg-gradient-to-r from-slate-50 to-slate-50 hover:from-slate-100 hover:to-slate-100 transition-all group/item cursor-pointer">
                            <Mail className="h-4 w-4 text-slate-600 group-hover/item:scale-110 transition-transform" />
                            <span className="text-sm text-slate-700 group-hover/item:text-slate-800 transition-colors font-medium truncate">{service.email}</span>
                          </div>
                          <div className="flex items-center gap-3 p-3  bg-gradient-to-r from-slate-50 to-slate-50 hover:from-slate-100 hover:to-slate-100 transition-all group/item cursor-pointer">
                            <Phone className="h-4 w-4 text-slate-600 group-hover/item:scale-110 transition-transform" />
                            <span className="text-sm text-slate-700 group-hover/item:text-slate-800 transition-colors font-medium">{service.telephone}</span>
                          </div>
                          <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-slate-50 to-slate-100 hover:from-slate-100 hover:to-slate-200 transition-all group/item">
                            <Building className="h-4 w-4 text-slate-600" />
                            <span className="text-sm text-slate-700 group-hover/item:text-slate-800 transition-colors font-medium">{service.bureau}</span>
                          </div>
                        </div>
                        <button 
                          className={`flex w-full items-center justify-center mt-4 px-4 py-2 bg-gradient-to-r bg-secondary hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg text-white border-0  font-medium`}
                        >
                         <h2>Contacter le Service </h2> 
                         <Phone className="ml-2 w-4 h-4"/>
                        </button>
                      </div>
                    </div>
                  ))} 
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Section CTA finale */}
        <div className="mt-16 text-center">
          <div className="bg-purple-100  p-12 relative overflow-hidden">
            <div className="absolute inset-0"></div>
            <div className="absolute top-0 left-1/4 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
            
            <div className="relative z-10 text-gray-400">
              <div className="inline-flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
                <Star className="h-4 w-4" />
                Excellence Scientifique
                <Star className="h-4 w-4" />
              </div>
              
              <h2 className="text-4xl text-gray-400 font-black mb-4">
                Rejoignez l'Excellence Scientifique !
              </h2>
              <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto opacity-90">
                Une question ? Un projet ? Une collaboration ? 
                Notre équipe passionnée vous attend !
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button className="px-8 py-4 bg-white text-primary hover:bg-slate-100 font-bold  transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Nous Écrire Maintenant
                </button>
                <button className="px-8 py-4 border-2 border-white text-gray-500 hover:bg-white hover:text-primary font-bold  transform hover:scale-105 transition-all duration-300 bg-transparent flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Appeler Directement 
                </button>
              </div>
              
              <div className="mt-8 flex justify-center gap-6 text-sm opacity-80">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Réponse sous 24h
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4" />
                  Support personnalisé
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  50+ ans d'excellence
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer rapide */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-6 bg-white/80 backdrop-blur-sm px-8 py-4  shadow-lg border border-slate-200">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-slate-600">En ligne maintenant</span>
            </div>
            <div className="w-px h-6 bg-slate-300"></div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Users className="h-4 w-4" />
              5000+ étudiants nous font confiance
            </div>
            <div className="w-px h-6 bg-slate-300"></div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Award className="h-4 w-4" />
              Excellence depuis 1955
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}