import {
  Atom,
  Calculator,
  Dna,
  FlaskConical,
  Laptop,
  // Users,
} from "lucide-react";

const mentions = [
  {
    id: "0",
    name: "Mathématiques Informatiques",
    icon: <Calculator className="h-8 w-8" />,
    color: "bg-blue-500",
    description: "Formation rigoureuse en mathématiques pures et appliquées",
  },
  {
    id: "1",
    name: "Physique",
    icon: <Atom className="h-8 w-8" />,
    color: "bg-purple-500",
    description: "Exploration des lois fondamentales de l'univers",
  },
  {
    id: "2",
    name: "Chimie",
    icon: <FlaskConical className="h-8 w-8" />,
    color: "bg-green-500",
    description: "Science de la matière et de ses transformations",
  },
  {
    id: "3",
    name: "Biologie",
    icon: <Dna className="h-8 w-8" />,
    color: "bg-emerald-500",
    description: "Étude du vivant sous toutes ses formes",
  },
  {
    id: "4",
    name: "Informatique et Technologie",
    icon: <Laptop className="h-8 w-8" />,
    color: "bg-indigo-500",
    description: "Sciences et technologies de l'information",
  },
];

const licenceDetails = [
  {
    id: "0",
    name: "Mathematiques Informatiques",
    parcours: {
      "Licence 1": {
        semestre1: [
          { code: "MAT101", nom: "Algèbre 1", credits: 6, Credit: 3 },
          { code: "MAT102", nom: "Analyse 1", credits: 6, Credit: 3 },
          {
            code: "INF101",
            nom: "Introduction à l'Informatique",
            credits: 4,
            Credit: 2,
          },
          { code: "PHY101", nom: "Physique Générale", credits: 4, Credit: 2 },
          { code: "FRA101", nom: "Français", credits: 2, Credit: 1 },
          { code: "ANG101", nom: "Anglais", credits: 2, Credit: 1 },
          { code: "MLG101", nom: "Malagasy", credits: 2, Credit: 1 },
          { code: "EPS101", nom: "Éducation Physique", credits: 2, Credit: 1 },
        ],
        semestre2: [
          { code: "MAT201", nom: "Algèbre 2", credits: 6, Credit: 3 },
          { code: "MAT202", nom: "Analyse 2", credits: 6, Credit: 3 },
          { code: "INF201", nom: "Programmation 1", credits: 4, Credit: 2 },
          { code: "MAT203", nom: "Géométrie", credits: 4, Credit: 2 },
          {
            code: "STA201",
            nom: "Statistiques Descriptives",
            credits: 4,
            Credit: 2,
          },
          { code: "FRA201", nom: "Expression Écrite", credits: 2, Credit: 1 },
          { code: "ANG201", nom: "Anglais Technique", credits: 2, Credit: 1 },
          { code: "INF202", nom: "Bureautique", credits: 2, Credit: 1 },
        ],
      },
      "Licence 2": {
        semestre3: [
          { code: "MAT301", nom: "Algèbre Linéaire", credits: 6, Credit: 3 },
          { code: "MAT302", nom: "Analyse 3", credits: 6, Credit: 3 },
          { code: "INF301", nom: "Programmation 2", credits: 6, Credit: 3 },
          { code: "MAT303", nom: "Probabilités", credits: 4, Credit: 2 },
          {
            code: "INF302",
            nom: "Structures de Données",
            credits: 4,
            Credit: 2,
          },
          {
            code: "MAT304",
            nom: "Mathématiques Discrètes",
            credits: 4,
            Credit: 2,
          },
        ],
        semestre4: [
          { code: "MAT401", nom: "Analyse Numérique", credits: 6, Credit: 3 },
          {
            code: "INF401",
            nom: "Algorithmique Avancée",
            credits: 6,
            Credit: 3,
          },
          { code: "INF402", nom: "Bases de Données", credits: 6, Credit: 3 },
          {
            code: "MAT402",
            nom: "Statistiques Inférentielles",
            credits: 4,
            Credit: 2,
          },
          {
            code: "INF403",
            nom: "Systèmes d'Exploitation",
            credits: 4,
            Credit: 2,
          },
          {
            code: "MAT403",
            nom: "Recherche Opérationnelle",
            credits: 4,
            Credit: 2,
          },
        ],
      },
      "Licence 3": {
        semestre5: [
          {
            code: "MAT501",
            nom: "Analyse Fonctionnelle",
            credits: 6,
            Credit: 3,
          },
          { code: "INF501", nom: "Génie Logiciel", credits: 6, Credit: 3 },
          {
            code: "INF502",
            nom: "Réseaux Informatiques",
            credits: 6,
            Credit: 3,
          },
          {
            code: "MAT502",
            nom: "Modélisation Mathématique",
            credits: 4,
            Credit: 2,
          },
          {
            code: "INF503",
            nom: "Intelligence Artificielle",
            credits: 4,
            Credit: 2,
          },
          { code: "PRO501", nom: "Projet Tutoré", credits: 4, Credit: 2 },
        ],
        semestre6: [
          { code: "INF601", nom: "Développement Web", credits: 6, Credit: 3 },
          { code: "MAT601", nom: "Cryptographie", credits: 6, Credit: 3 },
          {
            code: "INF602",
            nom: "Sécurité Informatique",
            credits: 4,
            Credit: 2,
          },
          { code: "MAT602", nom: "Optimisation", credits: 4, Credit: 2 },
          { code: "STA601", nom: "Data Mining", credits: 4, Credit: 2 },
          { code: "STG601", nom: "Stage Professionnel", credits: 6, Credit: 3 },
        ],
      },
    },
  },
  {
    id: "1",
    name: "Physique",
    parcours: {
      "Licence 1": {
        semestre1: [
          { code: "MAT101", nom: "Algèbre 1", credits: 6, Credit: 3 },
          { code: "MAT102", nom: "Analyse 1", credits: 6, Credit: 3 },
          {
            code: "INF101",
            nom: "Introduction à l'Informatique",
            credits: 4,
            Credit: 2,
          },
          { code: "PHY101", nom: "Physique Générale", credits: 4, Credit: 2 },
          { code: "FRA101", nom: "Français", credits: 2, Credit: 1 },
          { code: "ANG101", nom: "Anglais", credits: 2, Credit: 1 },
          { code: "MLG101", nom: "Malagasy", credits: 2, Credit: 1 },
          { code: "EPS101", nom: "Éducation Physique", credits: 2, Credit: 1 },
        ],
        semestre2: [
          { code: "MAT201", nom: "Algèbre 2", credits: 6, Credit: 3 },
          { code: "MAT202", nom: "Analyse 2", credits: 6, Credit: 3 },
          { code: "INF201", nom: "Programmation 1", credits: 4, Credit: 2 },
          { code: "MAT203", nom: "Géométrie", credits: 4, Credit: 2 },
          {
            code: "STA201",
            nom: "Statistiques Descriptives",
            credits: 4,
            Credit: 2,
          },
          { code: "FRA201", nom: "Expression Écrite", credits: 2, Credit: 1 },
          { code: "ANG201", nom: "Anglais Technique", credits: 2, Credit: 1 },
          { code: "INF202", nom: "Bureautique", credits: 2, Credit: 1 },
        ],
      },
      "Licence 2": {
        semestre3: [
          { code: "MAT301", nom: "Algèbre Linéaire", credits: 6, Credit: 3 },
          { code: "MAT302", nom: "Analyse 3", credits: 6, Credit: 3 },
          { code: "INF301", nom: "Programmation 2", credits: 6, Credit: 3 },
          { code: "MAT303", nom: "Probabilités", credits: 4, Credit: 2 },
          {
            code: "INF302",
            nom: "Structures de Données",
            credits: 4,
            Credit: 2,
          },
          {
            code: "MAT304",
            nom: "Mathématiques Discrètes",
            credits: 4,
            Credit: 2,
          },
        ],
        semestre4: [
          { code: "MAT401", nom: "Analyse Numérique", credits: 6, Credit: 3 },
          {
            code: "INF401",
            nom: "Algorithmique Avancée",
            credits: 6,
            Credit: 3,
          },
          { code: "INF402", nom: "Bases de Données", credits: 6, Credit: 3 },
          {
            code: "MAT402",
            nom: "Statistiques Inférentielles",
            credits: 4,
            Credit: 2,
          },
          {
            code: "INF403",
            nom: "Systèmes d'Exploitation",
            credits: 4,
            Credit: 2,
          },
          {
            code: "MAT403",
            nom: "Recherche Opérationnelle",
            credits: 4,
            Credit: 2,
          },
        ],
      },
      "Licence 3": {
        semestre5: [
          {
            code: "MAT501",
            nom: "Analyse Fonctionnelle",
            credits: 6,
            Credit: 3,
          },
          { code: "INF501", nom: "Génie Logiciel", credits: 6, Credit: 3 },
          {
            code: "INF502",
            nom: "Réseaux Informatiques",
            credits: 6,
            Credit: 3,
          },
          {
            code: "MAT502",
            nom: "Modélisation Mathématique",
            credits: 4,
            Credit: 2,
          },
          {
            code: "INF503",
            nom: "Intelligence Artificielle",
            credits: 4,
            Credit: 2,
          },
          { code: "PRO501", nom: "Projet Tutoré", credits: 4, Credit: 2 },
        ],
        semestre6: [
          { code: "INF601", nom: "Développement Web", credits: 6, Credit: 3 },
          { code: "MAT601", nom: "Cryptographie", credits: 6, Credit: 3 },
          {
            code: "INF602",
            nom: "Sécurité Informatique",
            credits: 4,
            Credit: 2,
          },
          { code: "MAT602", nom: "Optimisation", credits: 4, Credit: 2 },
          { code: "STA601", nom: "Data Mining", credits: 4, Credit: 2 },
          { code: "STG601", nom: "Stage Professionnel", credits: 6, Credit: 3 },
        ],
      },
    },
  },
  {
    id: "2",
    name: "Chimie",
    parcours: {
      "Licence 1": {
        semestre1: [
          { code: "MAT101", nom: "Algèbre 1", credits: 6, Credit: 3 },
          { code: "MAT102", nom: "Analyse 1", credits: 6, Credit: 3 },
          {
            code: "INF101",
            nom: "Introduction à l'Informatique",
            credits: 4,
            Credit: 2,
          },
          { code: "PHY101", nom: "Physique Générale", credits: 4, Credit: 2 },
          { code: "FRA101", nom: "Français", credits: 2, Credit: 1 },
          { code: "ANG101", nom: "Anglais", credits: 2, Credit: 1 },
          { code: "MLG101", nom: "Malagasy", credits: 2, Credit: 1 },
          { code: "EPS101", nom: "Éducation Physique", credits: 2, Credit: 1 },
        ],
        semestre2: [
          { code: "MAT201", nom: "Algèbre 2", credits: 6, Credit: 3 },
          { code: "MAT202", nom: "Analyse 2", credits: 6, Credit: 3 },
          { code: "INF201", nom: "Programmation 1", credits: 4, Credit: 2 },
          { code: "MAT203", nom: "Géométrie", credits: 4, Credit: 2 },
          {
            code: "STA201",
            nom: "Statistiques Descriptives",
            credits: 4,
            Credit: 2,
          },
          { code: "FRA201", nom: "Expression Écrite", credits: 2, Credit: 1 },
          { code: "ANG201", nom: "Anglais Technique", credits: 2, Credit: 1 },
          { code: "INF202", nom: "Bureautique", credits: 2, Credit: 1 },
        ],
      },
      "Licence 2": {
        semestre3: [
          { code: "MAT301", nom: "Algèbre Linéaire", credits: 6, Credit: 3 },
          { code: "MAT302", nom: "Analyse 3", credits: 6, Credit: 3 },
          { code: "INF301", nom: "Programmation 2", credits: 6, Credit: 3 },
          { code: "MAT303", nom: "Probabilités", credits: 4, Credit: 2 },
          {
            code: "INF302",
            nom: "Structures de Données",
            credits: 4,
            Credit: 2,
          },
          {
            code: "MAT304",
            nom: "Mathématiques Discrètes",
            credits: 4,
            Credit: 2,
          },
        ],
        semestre4: [
          { code: "MAT401", nom: "Analyse Numérique", credits: 6, Credit: 3 },
          {
            code: "INF401",
            nom: "Algorithmique Avancée",
            credits: 6,
            Credit: 3,
          },
          { code: "INF402", nom: "Bases de Données", credits: 6, Credit: 3 },
          {
            code: "MAT402",
            nom: "Statistiques Inférentielles",
            credits: 4,
            Credit: 2,
          },
          {
            code: "INF403",
            nom: "Systèmes d'Exploitation",
            credits: 4,
            Credit: 2,
          },
          {
            code: "MAT403",
            nom: "Recherche Opérationnelle",
            credits: 4,
            Credit: 2,
          },
        ],
      },
      "Licence 3": {
        semestre5: [
          {
            code: "MAT501",
            nom: "Analyse Fonctionnelle",
            credits: 6,
            Credit: 3,
          },
          { code: "INF501", nom: "Génie Logiciel", credits: 6, Credit: 3 },
          {
            code: "INF502",
            nom: "Réseaux Informatiques",
            credits: 6,
            Credit: 3,
          },
          {
            code: "MAT502",
            nom: "Modélisation Mathématique",
            credits: 4,
            Credit: 2,
          },
          {
            code: "INF503",
            nom: "Intelligence Artificielle",
            credits: 4,
            Credit: 2,
          },
          { code: "PRO501", nom: "Projet Tutoré", credits: 4, Credit: 2 },
        ],
        semestre6: [
          { code: "INF601", nom: "Développement Web", credits: 6, Credit: 3 },
          { code: "MAT601", nom: "Cryptographie", credits: 6, Credit: 3 },
          {
            code: "INF602",
            nom: "Sécurité Informatique",
            credits: 4,
            Credit: 2,
          },
          { code: "MAT602", nom: "Optimisation", credits: 4, Credit: 2 },
          { code: "STA601", nom: "Data Mining", credits: 4, Credit: 2 },
          { code: "STG601", nom: "Stage Professionnel", credits: 6, Credit: 3 },
        ],
      },
    },
  },
  {
    id: "3",
    name: "Biologies",
    parcours: {
      "Licence 1": {
        semestre1: [
          { code: "MAT101", nom: "Algèbre 1", credits: 6, Credit: 3 },
          { code: "MAT102", nom: "Analyse 1", credits: 6, Credit: 3 },
          {
            code: "INF101",
            nom: "Introduction à l'Informatique",
            credits: 4,
            Credit: 2,
          },
          { code: "PHY101", nom: "Physique Générale", credits: 4, Credit: 2 },
          { code: "FRA101", nom: "Français", credits: 2, Credit: 1 },
          { code: "ANG101", nom: "Anglais", credits: 2, Credit: 1 },
          { code: "MLG101", nom: "Malagasy", credits: 2, Credit: 1 },
          { code: "EPS101", nom: "Éducation Physique", credits: 2, Credit: 1 },
        ],
        semestre2: [
          { code: "MAT201", nom: "Algèbre 2", credits: 6, Credit: 3 },
          { code: "MAT202", nom: "Analyse 2", credits: 6, Credit: 3 },
          { code: "INF201", nom: "Programmation 1", credits: 4, Credit: 2 },
          { code: "MAT203", nom: "Géométrie", credits: 4, Credit: 2 },
          {
            code: "STA201",
            nom: "Statistiques Descriptives",
            credits: 4,
            Credit: 2,
          },
          { code: "FRA201", nom: "Expression Écrite", credits: 2, Credit: 1 },
          { code: "ANG201", nom: "Anglais Technique", credits: 2, Credit: 1 },
          { code: "INF202", nom: "Bureautique", credits: 2, Credit: 1 },
        ],
      },
      "Licence 2": {
        semestre3: [
          { code: "MAT301", nom: "Algèbre Linéaire", credits: 6, Credit: 3 },
          { code: "MAT302", nom: "Analyse 3", credits: 6, Credit: 3 },
          { code: "INF301", nom: "Programmation 2", credits: 6, Credit: 3 },
          { code: "MAT303", nom: "Probabilités", credits: 4, Credit: 2 },
          {
            code: "INF302",
            nom: "Structures de Données",
            credits: 4,
            Credit: 2,
          },
          {
            code: "MAT304",
            nom: "Mathématiques Discrètes",
            credits: 4,
            Credit: 2,
          },
        ],
        semestre4: [
          { code: "MAT401", nom: "Analyse Numérique", credits: 6, Credit: 3 },
          {
            code: "INF401",
            nom: "Algorithmique Avancée",
            credits: 6,
            Credit: 3,
          },
          { code: "INF402", nom: "Bases de Données", credits: 6, Credit: 3 },
          {
            code: "MAT402",
            nom: "Statistiques Inférentielles",
            credits: 4,
            Credit: 2,
          },
          {
            code: "INF403",
            nom: "Systèmes d'Exploitation",
            credits: 4,
            Credit: 2,
          },
          {
            code: "MAT403",
            nom: "Recherche Opérationnelle",
            credits: 4,
            Credit: 2,
          },
        ],
      },
      "Licence 3": {
        semestre5: [
          {
            code: "MAT501",
            nom: "Analyse Fonctionnelle",
            credits: 6,
            Credit: 3,
          },
          { code: "INF501", nom: "Génie Logiciel", credits: 6, Credit: 3 },
          {
            code: "INF502",
            nom: "Réseaux Informatiques",
            credits: 6,
            Credit: 3,
          },
          {
            code: "MAT502",
            nom: "Modélisation Mathématique",
            credits: 4,
            Credit: 2,
          },
          {
            code: "INF503",
            nom: "Intelligence Artificielle",
            credits: 4,
            Credit: 2,
          },
          { code: "PRO501", nom: "Projet Tutoré", credits: 4, Credit: 2 },
        ],
        semestre6: [
          { code: "INF601", nom: "Développement Web", credits: 6, Credit: 3 },
          { code: "MAT601", nom: "Cryptographie", credits: 6, Credit: 3 },
          {
            code: "INF602",
            nom: "Sécurité Informatique",
            credits: 4,
            Credit: 2,
          },
          { code: "MAT602", nom: "Optimisation", credits: 4, Credit: 2 },
          { code: "STA601", nom: "Data Mining", credits: 4, Credit: 2 },
          { code: "STG601", nom: "Stage Professionnel", credits: 6, Credit: 3 },
        ],
      },
    },
  },
  {
    id: "4",
    name: "Informatique et Techologies",
    parcours: {
      "Licence 1": {
        semestre1: [
          { code: "MAT101", nom: "Algèbre 1", credits: 6, Credit: 3 },
          { code: "MAT102", nom: "Analyse 1", credits: 6, Credit: 3 },
          {
            code: "INF101",
            nom: "Introduction à l'Informatique",
            credits: 4,
            Credit: 2,
          },
          { code: "PHY101", nom: "Physique Générale", credits: 4, Credit: 2 },
          { code: "FRA101", nom: "Français", credits: 2, Credit: 1 },
          { code: "ANG101", nom: "Anglais", credits: 2, Credit: 1 },
          { code: "MLG101", nom: "Malagasy", credits: 2, Credit: 1 },
          { code: "EPS101", nom: "Éducation Physique", credits: 2, Credit: 1 },
        ],
        semestre2: [
          { code: "MAT201", nom: "Algèbre 2", credits: 6, Credit: 3 },
          { code: "MAT202", nom: "Analyse 2", credits: 6, Credit: 3 },
          { code: "INF201", nom: "Programmation 1", credits: 4, Credit: 2 },
          { code: "MAT203", nom: "Géométrie", credits: 4, Credit: 2 },
          {
            code: "STA201",
            nom: "Statistiques Descriptives",
            credits: 4,
            Credit: 2,
          },
          { code: "FRA201", nom: "Expression Écrite", credits: 2, Credit: 1 },
          { code: "ANG201", nom: "Anglais Technique", credits: 2, Credit: 1 },
          { code: "INF202", nom: "Bureautique", credits: 2, Credit: 1 },
        ],
      },
      "Licence 2": {
        semestre3: [
          { code: "MAT301", nom: "Algèbre Linéaire", credits: 6, Credit: 3 },
          { code: "MAT302", nom: "Analyse 3", credits: 6, Credit: 3 },
          { code: "INF301", nom: "Programmation 2", credits: 6, Credit: 3 },
          { code: "MAT303", nom: "Probabilités", credits: 4, Credit: 2 },
          {
            code: "INF302",
            nom: "Structures de Données",
            credits: 4,
            Credit: 2,
          },
          {
            code: "MAT304",
            nom: "Mathématiques Discrètes",
            credits: 4,
            Credit: 2,
          },
        ],
        semestre4: [
          { code: "MAT401", nom: "Analyse Numérique", credits: 6, Credit: 3 },
          {
            code: "INF401",
            nom: "Algorithmique Avancée",
            credits: 6,
            Credit: 3,
          },
          { code: "INF402", nom: "Bases de Données", credits: 6, Credit: 3 },
          {
            code: "MAT402",
            nom: "Statistiques Inférentielles",
            credits: 4,
            Credit: 2,
          },
          {
            code: "INF403",
            nom: "Systèmes d'Exploitation",
            credits: 4,
            Credit: 2,
          },
          {
            code: "MAT403",
            nom: "Recherche Opérationnelle",
            credits: 4,
            Credit: 2,
          },
        ],
      },
      "Licence 3": {
        semestre5: [
          {
            code: "MAT501",
            nom: "Analyse Fonctionnelle",
            credits: 6,
            Credit: 3,
          },
          { code: "INF501", nom: "Génie Logiciel", credits: 6, Credit: 3 },
          {
            code: "INF502",
            nom: "Réseaux Informatiques",
            credits: 6,
            Credit: 3,
          },
          {
            code: "MAT502",
            nom: "Modélisation Mathématique",
            credits: 4,
            Credit: 2,
          },
          {
            code: "INF503",
            nom: "Intelligence Artificielle",
            credits: 4,
            Credit: 2,
          },
          { code: "PRO501", nom: "Projet Tutoré", credits: 4, Credit: 2 },
        ],
        semestre6: [
          { code: "INF601", nom: "Développement Web", credits: 6, Credit: 3 },
          { code: "MAT601", nom: "Cryptographie", credits: 6, Credit: 3 },
          {
            code: "INF602",
            nom: "Sécurité Informatique",
            credits: 4,
            Credit: 2,
          },
          { code: "MAT602", nom: "Optimisation", credits: 4, Credit: 2 },
          { code: "STA601", nom: "Data Mining", credits: 4, Credit: 2 },
          { code: "STG601", nom: "Stage Professionnel", credits: 6, Credit: 3 },
        ],
      },
    },
  },
];

const Stats = [
  {
    id: "0",
    stats: [
      { label: "Etudiant", value: "1350" },
      { label: "Enseignant", value: "25" },
      { label: "Année", value: "3-5" },
      { label: "Insertion", value: "88" },
    ],
  },
  {
    id: "1",
    stats: [
      { label: "Etudiant", value: "3350" },
      { label: "Enseignant", value: "25" },
      { label: "Année", value: "3-5" },
      { label: "Insertion", value: "88" },
    ],
  },
  {
    id: "2",
    stats: [
      { label: "Etudiant", value: "4350" },
      { label: "Enseignant", value: "25" },
      { label: "Année", value: "3-5" },
      { label: "Insertion", value: "88" },
    ],
  },
  {
    id: "3",
    stats: [
      { label: "Etudiant", value: "5350" },
      { label: "Enseignant", value: "25" },
      { label: "Année", value: "3-5" },
      { label: "Insertion", value: "88" },
    ],
  },
  {
    id: "4",
    stats: [
      { label: "Etudiant", value: "350" },
      { label: "Enseignant", value: "25" },
      { label: "Année", value: "3-5" },
      { label: "Insertion", value: "88" },
    ],
  },
];

const departments = [
  {
    name: "Mathématiques et Informatique",
    students: "800+",
    color: "bg-primary",
    image: "/images/mathematiques.jpg",
  },
  {
    name: "MIT",
    students: "600+",
    color: "bg-secondary",
    image: "/images/informatique.jpg",
  },
  {
    name: "Physique",
    students: "400+",
    color: "bg-primary/80",
    image: "/images/physique.jpg",
  },
  {
    name: "Chimie",
    students: "350+",
    color: "bg-secondary/80",
    image: "/images/chimie.jpg",
  },
  {
    name: "Biologie",
    students: "500+",
    color: "bg-primary/90",
    image: "/images/biologie.jpg",
  },
  {
    name: "Géologie",
    students: "300+",
    color: "bg-secondary/90",
    image: "/images/geologie.jpg",
  },
  {
    name: "Astronomie",
    students: "150+",
    color: "bg-primary/70",
    image: "/images/astronomie.jpg",
  },
  {
    name: "Biotechnologie",
    students: "250+",
    color: "bg-secondary/70",
    image: "/images/biotechnologie.jpg",
  },
  {
    name: "Sciences de l'Environnement",
    students: "320+",
    color: "bg-primary/60",
    image: "/images/environnement.jpg",
  },
  {
    name: "Statistiques",
    students: "280+",
    color: "bg-secondary/60",
    image: "/images/statistiques.jpg",
  },
  {
    name: "Océanographie",
    students: "180+",
    color: "bg-primary/50",
    image: "/images/oceanographie.jpg",
  },
  {
    name: "Météorologie",
    students: "200+",
    color: "bg-secondary/50",
    image: "/images/meteorologie.jpg",
  },
  {
    name: "Géophysique",
    students: "160+",
    color: "bg-primary/40",
    image: "/images/geophysique.jpg",
  },
  {
    name: "Sciences des Matériaux",
    students: "220+",
    color: "bg-secondary/40",
    image: "/images/materiaux.jpg",
  },
];

export default function getAllMention() {
  return mentions;
}

export function getParcoursById(id: string) {
  return licenceDetails.find((mention) => mention.id === id);
}

export function getStatsById(id: string) {
  return Stats.find((stat) => stat.id === id)?.stats;
}

export function getAllDepartments() {
  return departments;
}
