import {
  Award,
  BarChart3,
  BookOpen,
  ClipboardList,
  Download,
  Edit,
  Eye,
  FileText,
  GraduationCap,
  Mail,
  Plus,
  Shield,
  Trash2,
  Upload,
  Users,
} from "lucide-react";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { Textarea } from "../../components/ui/textarea";

export default function AdminPage() {
  const stats_admin = {
    formations: 28,
    actualites: 45,
    programmes: 156,
    publications: 180,
    messages: 23,
  };

  const actualites_recentes = [
    {
      id: 1,
      titre: "Salon des Étudiants à Ankatso",
      date: "2025-09-11",
      statut: "Publié",
      vues: 1250,
    },
    {
      id: 2,
      titre: "Cérémonie de Remise des Diplômes 2025",
      date: "2025-07-15",
      statut: "Publié",
      vues: 890,
    },
    {
      id: 3,
      titre: "Nouveau Laboratoire de Biotechnologie",
      date: "2025-06-20",
      statut: "Brouillon",
      vues: 0,
    },
  ];

  const formations_recentes = [
    {
      nom: "Licence Mathématiques et Informatique",
      type: "Licence",
      departement: "Mathématiques et Informatique",
      etudiants: 245,
      statut: "Active",
    },
    {
      nom: "Master IGCRR",
      type: "Master",
      departement: "Géologie",
      etudiants: 32,
      statut: "Active",
    },
    {
      nom: "Doctorat en Physique",
      type: "Doctorat",
      departement: "Physique",
      etudiants: 18,
      statut: "Active",
    },
  ];

  const messages_contact = [
    {
      nom: "RAZAFY Hanta",
      email: "hanta.razafy@gmail.com",
      sujet: "Demande d'admission",
      date: "2025-09-25",
      statut: "Non lu",
    },
    {
      nom: "RANDRIA Paul",
      email: "paul.randria@yahoo.fr",
      sujet: "Partenariat recherche",
      date: "2025-09-24",
      statut: "Lu",
    },
    {
      nom: "NIVO Clara",
      email: "clara.nivo@hotmail.com",
      sujet: "Information formation",
      date: "2025-09-23",
      statut: "Répondu",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">
              Administration
            </h1>
            <p className="text-slate-600">
              Gestion du site web de la Faculté des Sciences
            </p>
          </div>
          <Badge variant="secondary" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Administrateur
          </Badge>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <GraduationCap className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-slate-800">
                {stats_admin.formations}
              </div>
              <div className="text-sm text-slate-600">Formations</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <FileText className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-slate-800">
                {stats_admin.actualites}
              </div>
              <div className="text-sm text-slate-600">Actualités</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <BookOpen className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-slate-800">
                {stats_admin.programmes}
              </div>
              <div className="text-sm text-slate-600">Programmes</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <BarChart3 className="h-8 w-8 text-red-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-slate-800">
                {stats_admin.publications}
              </div>
              <div className="text-sm text-slate-600">Publications</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Mail className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-slate-800">
                {stats_admin.messages}
              </div>
              <div className="text-sm text-slate-600">Messages</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="dashboard">Tableau de bord</TabsTrigger>
            <TabsTrigger value="actualites">Actualités</TabsTrigger>
            <TabsTrigger value="formations">Formations</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="fichiers">Fichiers</TabsTrigger>
            <TabsTrigger value="parametres">Paramètres</TabsTrigger>
          </TabsList>

          {/* Tableau de bord */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Activité récente */}
              <Card>
                <CardHeader>
                  <CardTitle>Activité Récente</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                    <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        Nouvelle formation ajoutée
                      </p>
                      <p className="text-xs text-slate-600">Il y a 2 heures</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                    <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        Résultats d'admission publiés
                      </p>
                      <p className="text-xs text-slate-600">Il y a 4 heures</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                    <div className="h-2 w-2 bg-purple-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        Avis de candidature créé
                      </p>
                      <p className="text-xs text-slate-600">Il y a 6 heures</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Statistiques mensuelles */}
              <Card>
                <CardHeader>
                  <CardTitle>Statistiques du Mois</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Candidatures reçues</span>
                    <span className="font-bold text-blue-600">1,245</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Admissions validées</span>
                    <span className="font-bold text-green-600">456</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Programmes créés</span>
                    <span className="font-bold text-purple-600">12</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Actualités publiées</span>
                    <span className="font-bold text-red-600">8</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="actualites" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Formulaire d'ajout d'actualité */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    Nouvelle Actualité
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="titre-actu">Titre</Label>
                    <Input id="titre-actu" placeholder="Titre de l'actualité" />
                  </div>
                  <div>
                    <Label htmlFor="contenu-actu">Contenu</Label>
                    <Textarea
                      id="contenu-actu"
                      placeholder="Contenu de l'actualité"
                      rows={4}
                    />
                  </div>
                  <div>
                    <Label htmlFor="date-actu">Date de publication</Label>
                    <Input id="date-actu" type="date" />
                  </div>
                  <div>
                    <Label htmlFor="statut-actu">Statut</Label>
                    <select
                      id="statut-actu"
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="brouillon">Brouillon</option>
                      <option value="publie">Publié</option>
                    </select>
                  </div>
                  <Button className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter l'actualité
                  </Button>
                </CardContent>
              </Card>

              {/* Liste des actualités */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Actualités Récentes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {actualites_recentes.map((actu) => (
                      <div
                        key={actu.id}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-800">
                            {actu.titre}
                          </h4>
                          <div className="flex items-center gap-4 mt-1">
                            <span className="text-sm text-slate-600">
                              {actu.date}
                            </span>
                            <Badge
                              variant={
                                actu.statut === "Publié"
                                  ? "default"
                                  : "secondary"
                              }
                            >
                              {actu.statut}
                            </Badge>
                            <span className="text-sm text-slate-600">
                              {actu.vues} vues
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="formations" className="space-y-6">
            <Tabs defaultValue="filieres" className="space-y-4">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="filieres">Filières</TabsTrigger>
                <TabsTrigger value="programmes">Programmes</TabsTrigger>
                <TabsTrigger value="candidatures">Candidatures</TabsTrigger>
                <TabsTrigger value="conditions">Conditions</TabsTrigger>
                <TabsTrigger value="selections">Sélections</TabsTrigger>
                <TabsTrigger value="admis">Admis</TabsTrigger>
              </TabsList>

              {/* Gestion des filières */}
              <TabsContent value="filieres" className="space-y-6">
                <div className="grid lg:grid-cols-3 gap-6">
                  <Card className="lg:col-span-1">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Plus className="h-5 w-5" />
                        Nouvelle Filière
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="nom-filiere">Nom de la filière</Label>
                        <Input
                          id="nom-filiere"
                          placeholder="Ex: Mathématiques et Informatique"
                        />
                      </div>
                      <div>
                        <Label htmlFor="code-filiere">Code</Label>
                        <Input id="code-filiere" placeholder="Ex: MI" />
                      </div>
                      <div>
                        <Label htmlFor="departement-filiere">Département</Label>
                        <select
                          id="departement-filiere"
                          className="w-full p-2 border rounded-md"
                        >
                          <option value="">Sélectionner un département</option>
                          <option value="mi">
                            Mathématiques et Informatique
                          </option>
                          <option value="physique">Physique</option>
                          <option value="chimie">Chimie</option>
                          <option value="biologie">Biologie</option>
                          <option value="geologie">Géologie</option>
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="description-filiere">Description</Label>
                        <Textarea
                          id="description-filiere"
                          placeholder="Description de la filière"
                          rows={3}
                        />
                      </div>
                      <Button className="w-full">
                        <Plus className="h-4 w-4 mr-2" />
                        Ajouter la filière
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle>Filières Existantes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {formations_recentes.map((formation, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-4 border rounded-lg"
                          >
                            <div className="flex-1">
                              <h4 className="font-semibold text-slate-800">
                                {formation.nom}
                              </h4>
                              <div className="flex items-center gap-4 mt-1">
                                <Badge variant="outline">
                                  {formation.type}
                                </Badge>
                                <span className="text-sm text-slate-600">
                                  {formation.departement}
                                </span>
                                <span className="text-sm text-slate-600">
                                  {formation.etudiants} étudiants
                                </span>
                                <Badge
                                  variant={
                                    formation.statut === "Active"
                                      ? "default"
                                      : "secondary"
                                  }
                                >
                                  {formation.statut}
                                </Badge>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Gestion des programmes */}
              <TabsContent value="programmes" className="space-y-6">
                <div className="grid lg:grid-cols-3 gap-6">
                  <Card className="lg:col-span-1">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5" />
                        Nouveau Programme
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="nom-programme">Nom du programme</Label>
                        <Input
                          id="nom-programme"
                          placeholder="Ex: Licence L1 Mathématiques"
                        />
                      </div>
                      <div>
                        <Label htmlFor="filiere-programme">Filière</Label>
                        <select
                          id="filiere-programme"
                          className="w-full p-2 border rounded-md"
                        >
                          <option value="">Sélectionner une filière</option>
                          <option value="mi">
                            Mathématiques et Informatique
                          </option>
                          <option value="physique">Physique</option>
                          <option value="chimie">Chimie</option>
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="niveau-programme">Niveau</Label>
                        <select
                          id="niveau-programme"
                          className="w-full p-2 border rounded-md"
                        >
                          <option value="l1">Licence L1</option>
                          <option value="l2">Licence L2</option>
                          <option value="l3">Licence L3</option>
                          <option value="m1">Master M1</option>
                          <option value="m2">Master M2</option>
                          <option value="doctorat">Doctorat</option>
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="credits-programme">Crédits ECTS</Label>
                        <Input
                          id="credits-programme"
                          type="number"
                          placeholder="60"
                        />
                      </div>
                      <div>
                        <Label htmlFor="ues-programme">
                          Unités d'enseignement
                        </Label>
                        <Textarea
                          id="ues-programme"
                          placeholder="Liste des UE séparées par des virgules"
                          rows={3}
                        />
                      </div>
                      <Button className="w-full">
                        <Plus className="h-4 w-4 mr-2" />
                        Ajouter le programme
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle>Programmes Récents</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-semibold text-slate-800">
                            Licence L1 Mathématiques et Informatique
                          </h4>
                          <div className="flex items-center gap-4 mt-1">
                            <Badge variant="outline">L1</Badge>
                            <span className="text-sm text-slate-600">
                              60 crédits ECTS
                            </span>
                            <span className="text-sm text-slate-600">8 UE</span>
                          </div>
                          <div className="flex gap-2 mt-3">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Avis de candidature */}
              <TabsContent value="candidatures" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ClipboardList className="h-5 w-5" />
                      Nouvel Avis de Candidature
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="titre-avis">Titre de l'avis</Label>
                        <Input
                          id="titre-avis"
                          placeholder="Ex: Avis de candidature L1 2025-2026"
                        />
                      </div>
                      <div>
                        <Label htmlFor="formation-avis">
                          Formation concernée
                        </Label>
                        <select
                          id="formation-avis"
                          className="w-full p-2 border rounded-md"
                        >
                          <option value="">Sélectionner une formation</option>
                          <option value="l1-mi">
                            L1 Mathématiques et Informatique
                          </option>
                          <option value="m1-igcrr">M1 IGCRR</option>
                          <option value="m1-ipss">M1 IPSS</option>
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="date-ouverture">Date d'ouverture</Label>
                        <Input id="date-ouverture" type="date" />
                      </div>
                      <div>
                        <Label htmlFor="date-fermeture">
                          Date de fermeture
                        </Label>
                        <Input id="date-fermeture" type="date" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="description-avis">Description</Label>
                      <Textarea
                        id="description-avis"
                        placeholder="Description détaillée de l'avis"
                        rows={4}
                      />
                    </div>
                    <div>
                      <Label htmlFor="pieces-requises">Pièces requises</Label>
                      <Textarea
                        id="pieces-requises"
                        placeholder="Liste des pièces à fournir"
                        rows={3}
                      />
                    </div>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Publier l'avis
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Conditions d'admission */}
              <TabsContent value="conditions" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Conditions d'Admission
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="formation-condition">Formation</Label>
                        <select
                          id="formation-condition"
                          className="w-full p-2 border rounded-md"
                        >
                          <option value="">Sélectionner une formation</option>
                          <option value="l1-mi">
                            L1 Mathématiques et Informatique
                          </option>
                          <option value="m1-igcrr">M1 IGCRR</option>
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="serie-bac">Série de baccalauréat</Label>
                        <select
                          id="serie-bac"
                          className="w-full p-2 border rounded-md"
                        >
                          <option value="">Toutes séries</option>
                          <option value="c">Série C</option>
                          <option value="d">Série D</option>
                          <option value="a">Série A</option>
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="annee-bac-min">
                          Année de bac minimum
                        </Label>
                        <Input
                          id="annee-bac-min"
                          type="number"
                          placeholder="2023"
                        />
                      </div>
                      <div>
                        <Label htmlFor="moyenne-min">Moyenne minimum</Label>
                        <Input
                          id="moyenne-min"
                          type="number"
                          step="0.1"
                          placeholder="10.0"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="conditions-specifiques">
                        Conditions spécifiques
                      </Label>
                      <Textarea
                        id="conditions-specifiques"
                        placeholder="Conditions particulières"
                        rows={3}
                      />
                    </div>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Ajouter les conditions
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Sélection de dossier */}
              <TabsContent value="selections" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ClipboardList className="h-5 w-5" />
                      Sélection de Dossier
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="session-selection">Session</Label>
                        <Input
                          id="session-selection"
                          placeholder="Ex: Session 2025"
                        />
                      </div>
                      <div>
                        <Label htmlFor="formation-selection">Formation</Label>
                        <select
                          id="formation-selection"
                          className="w-full p-2 border rounded-md"
                        >
                          <option value="">Sélectionner une formation</option>
                          <option value="l1-mi">
                            L1 Mathématiques et Informatique
                          </option>
                          <option value="m1-igcrr">M1 IGCRR</option>
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="places-disponibles">
                          Places disponibles
                        </Label>
                        <Input
                          id="places-disponibles"
                          type="number"
                          placeholder="50"
                        />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="date-selection">
                          Date de sélection
                        </Label>
                        <Input id="date-selection" type="date" />
                      </div>
                      <div>
                        <Label htmlFor="criteres-selection">
                          Critères de sélection
                        </Label>
                        <select
                          id="criteres-selection"
                          className="w-full p-2 border rounded-md"
                        >
                          <option value="moyenne">Moyenne générale</option>
                          <option value="dossier">Étude de dossier</option>
                          <option value="entretien">Entretien</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="notes-selection">
                        Notes et observations
                      </Label>
                      <Textarea
                        id="notes-selection"
                        placeholder="Notes sur la sélection"
                        rows={3}
                      />
                    </div>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Lancer la sélection
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Résultats des admis */}
              <TabsContent value="admis" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5" />
                      Résultats des Admis
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="session-admis">Session</Label>
                        <Input
                          id="session-admis"
                          placeholder="Ex: Session 2025"
                        />
                      </div>
                      <div>
                        <Label htmlFor="formation-admis">Formation</Label>
                        <select
                          id="formation-admis"
                          className="w-full p-2 border rounded-md"
                        >
                          <option value="">Sélectionner une formation</option>
                          <option value="l1-mi">
                            L1 Mathématiques et Informatique
                          </option>
                          <option value="m1-igcrr">M1 IGCRR</option>
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="type-resultat">Type de résultat</Label>
                        <select
                          id="type-resultat"
                          className="w-full p-2 border rounded-md"
                        >
                          <option value="definitif">Définitif</option>
                          <option value="provisoire">Provisoire</option>
                          <option value="liste-attente">Liste d'attente</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="fichier-admis">
                        Fichier des résultats
                      </Label>
                      <Input
                        id="fichier-admis"
                        type="file"
                        accept=".pdf,.xlsx,.csv"
                      />
                    </div>
                    <div>
                      <Label htmlFor="liste-admis">
                        Liste des admis (un par ligne)
                      </Label>
                      <Textarea
                        id="liste-admis"
                        placeholder="Numéro de dossier - Nom Prénom - Mention&#10;FS2025001 - RAKOTO Jean - Passable&#10;FS2025002 - ANDRY Marie - Assez Bien"
                        rows={6}
                      />
                    </div>
                    <div className="flex gap-4">
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Publier les résultats
                      </Button>
                      <Button variant="outline">
                        <Upload className="h-4 w-4 mr-2" />
                        Importer fichier
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </TabsContent>

          {/* Messages de contact */}
          <TabsContent value="messages" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-800">
                Messages de Contact
              </h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Marquer tout comme lu
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Exporter
                </Button>
              </div>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="space-y-0">
                  {messages_contact.map((message, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border-b last:border-b-0"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-slate-800">
                            {message.nom}
                          </h4>
                          <Badge
                            variant={
                              message.statut === "Non lu"
                                ? "destructive"
                                : message.statut === "Répondu"
                                ? "default"
                                : "secondary"
                            }
                            className="text-xs"
                          >
                            {message.statut}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-sm text-slate-600">
                            {message.email}
                          </span>
                          <span className="text-sm font-medium">
                            {message.sujet}
                          </span>
                          <span className="text-sm text-slate-600">
                            {message.date}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Mail className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Gestion des fichiers */}
          <TabsContent value="fichiers" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-800">
                Gestion des Fichiers
              </h2>
              <Button>
                <Upload className="h-4 w-4 mr-2" />
                Télécharger fichier
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Images</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">245</div>
                    <div className="text-sm text-slate-600">fichiers</div>
                    <div className="text-xs text-slate-500 mt-1">
                      125 MB utilisés
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Documents</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">89</div>
                    <div className="text-sm text-slate-600">fichiers</div>
                    <div className="text-xs text-slate-500 mt-1">
                      67 MB utilisés
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Autres</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">34</div>
                    <div className="text-sm text-slate-600">fichiers</div>
                    <div className="text-xs text-slate-500 mt-1">
                      23 MB utilisés
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Paramètres */}
          <TabsContent value="parametres" className="space-y-6">
            <h2 className="text-xl font-bold text-slate-800">
              Paramètres du Site
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Informations Générales</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-2 block">
                      Nom du site
                    </label>
                    <Input defaultValue="Faculté des Sciences - Université d'Antananarivo" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-2 block">
                      Description
                    </label>
                    <Input defaultValue="Site officiel de la Faculté des Sciences" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-2 block">
                      Email de contact
                    </label>
                    <Input defaultValue="contact@sciences.univ-antananarivo.mg" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Paramètres Techniques</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-2 block">
                      Mode maintenance
                    </label>
                    <select className="w-full p-2 border rounded-md">
                      <option>Désactivé</option>
                      <option>Activé</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-2 block">
                      Sauvegarde automatique
                    </label>
                    <select className="w-full p-2 border rounded-md">
                      <option>Quotidienne</option>
                      <option>Hebdomadaire</option>
                      <option>Mensuelle</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-2 block">
                      Niveau de log
                    </label>
                    <select className="w-full p-2 border rounded-md">
                      <option>Erreurs uniquement</option>
                      <option>Avertissements et erreurs</option>
                      <option>Toutes les activités</option>
                    </select>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex gap-4">
              <Button>Sauvegarder les paramètres</Button>
              <Button variant="outline">Réinitialiser</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
