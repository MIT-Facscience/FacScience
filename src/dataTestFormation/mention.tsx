// import { allMentions, getParcoursByMention, getRespoByMention } from "@/services/api/formations.api";
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
    name: "ANTHROPOBIOLOGIE ET DEVELOPPEMENT DURABLE",
    icon: <Calculator className="h-8 w-8" />,
    color: "bg-blue-500",
    description: "Formation rigoureuse en mathématiques pures et appliquées",
    responsable: "Mme RALISON LAINGOHARIMIADANA Marie Nambinina",
    image: "/public/Logo/Logo_ADD.jpg",
  },
  {
    id: "1",
    name: "BIOLOGIE ET ECOLOGIE VEGETALES",
    icon: <Atom className="h-8 w-8" />,
    color: "bg-purple-500",
    description: "Exploration des lois fondamentales de l'univers",
    responsable: "Mr RAKOTOARINIVO Mijoro",
    image: "/public/Logo/Logo_BEC.jpg",
  },
  {
    id: "2",
    name: "BIOCHIMIE FONDAMENTALE ET APPLIQUEE",
    icon: <FlaskConical className="h-8 w-8" />,
    color: "bg-green-500",
    description: "Science de la matière et de ses transformations",
    responsable: "Mr RANDRIAMAMPIANINA Lovarintsoa Judicaël",
    image: "/public/Logo/Logo_BFA.jpg",
  },
  {
    id: "3",
    name: "BASSIN SEDIMENTAIRE - EVOLUTION - CONSERVATION",
    icon: <Dna className="h-8 w-8" />,
    color: "bg-emerald-500",
    description: "Étude du vivant sous toutes ses formes",
    responsable: "Mr RAKOTONIMANANA Rivoniaina Michel  Jese",
    image: "/public/Logo/Logo_DBEV.jpg",
  },
  {
    id: "4",
    name: "CHIMIE",
    icon: <Laptop className="h-8 w-8" />,
    color: "bg-indigo-500",
    description: "Sciences et technologies de l'information",
    responsable: "Mr RAZAKARIVONY Andriamarolahy Andrianambinina",
    image: "/public/chalet.png",
  },
  {
    id: "5",
    name: "ENTOMOLOGIE - CULTURE - ELEVAGE - SANTE",
    icon: <Laptop className="h-8 w-8" />,
    color: "bg-indigo-500",
    description: "Sciences et technologies de l'information",
    responsable: "Mr RAKOTONIRINA Jean Claude",
    image: "/public/Logo/Logo_ECES.jpg",
  },
  {
    id: "6",
    name: "MATHEMATIQUES ET INFORMATIQUES",
    icon: <Laptop className="h-8 w-8" />,
    color: "bg-indigo-500",
    description: "Sciences et technologies de l'information",
    responsable: "Mr LALAHARISON Hanjarivo",
    image: "/public/Logo/Logo_MI.jpg",
  },
  {
    id: "7",
    name: "PHYSIQUES ET APPLICATIONS",
    icon: <Laptop className="h-8 w-8" />,
    color: "bg-indigo-500",
    description: "Sciences et technologies de l'information",
    responsable: "Mr RANDRIANASOLOHARISOA Dimbimalala",
    image: "/public/chalet.png",
  },
  {
    id: "8",
    name: "PHYSIOLOGIE ANIMALE - PHARMACOLOGIE - COSMETOLOGIE",
    icon: <Laptop className="h-8 w-8" />,
    color: "bg-indigo-500",
    description: "Sciences et technologies de l'information",
    responsable: "Mme ANDRIAMAMPIANINA Tianarilalaina Tantely",
    image: "/public/chalet.png",
  },
  {
    id: "9",
    name: "PROCEDES ET ECOLOGIE INDUSTRIELLE",
    icon: <Laptop className="h-8 w-8" />,
    color: "bg-indigo-500",
    description: "Sciences et technologies de l'information",
    responsable: "Mr ANDRIAMIADAMANANA Mavintana Dangerfield Christian",
    image: "/public/Logo/Logo_PEI.jpg",
  },
  {
    id: "10",
    name: "SCIENCES DE LA TERRE ET D’EVOLUTION",
    icon: <Laptop className="h-8 w-8" />,
    color: "bg-indigo-500",
    description: "Sciences et technologies de l'information",
    responsable: "Mme RAKOTOSAMIZANANY Saholy",
    image: "/public/Logo/Logo_STE.jpg",
  },
  {
    id: "11",
    name: "ZOOLOGIE ET BIODIVERSITE ANIMALE",
    icon: <Laptop className="h-8 w-8" />,
    color: "bg-indigo-500",
    description: "Sciences et technologies de l'information",
    responsable: "Mr Madame RATSOAVINA Fanomezana Mihaja",
    image: "/public/Logo/Logo_ZBA.jpg",
  },
  {
    id: "12",
    name: "INFORMATIQUE TECHNOLOGIE",
    icon: <Laptop className="h-8 w-8" />,
    color: "bg-indigo-500",
    description: "Sciences et technologies de l'information",
    responsable: "Mr ANDRIAMAROZAKANIAINA Tahiry Zaka Filamatra",
    image: "/public/Logo/Logo_IT.png",
  },
  {
    id: "13",
    name: "GEOLOGIE APPLIQUEE AU DEVELOPPEMENT",
    icon: <Laptop className="h-8 w-8" />,
    color: "bg-indigo-500",
    description: "Sciences et technologies de l'information",
    responsable: "Mme RAMIANDRISOA Njararivelo Louisa",
    image: "/public/chalet.png",
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
  {
    id: "5",
    stats: [
      { label: "Etudiant", value: "350" },
      { label: "Enseignant", value: "25" },
      { label: "Année", value: "3-5" },
      { label: "Insertion", value: "88" },
    ],
  },
  {
    id: "6",
    stats: [
      { label: "Etudiant", value: "350" },
      { label: "Enseignant", value: "25" },
      { label: "Année", value: "3-5" },
      { label: "Insertion", value: "88" },
    ],
  },
  {
    id: "7",
    stats: [
      { label: "Etudiant", value: "350" },
      { label: "Enseignant", value: "25" },
      { label: "Année", value: "3-5" },
      { label: "Insertion", value: "88" },
    ],
  },
  {
    id: "8",
    stats: [
      { label: "Etudiant", value: "350" },
      { label: "Enseignant", value: "25" },
      { label: "Année", value: "3-5" },
      { label: "Insertion", value: "88" },
    ],
  },
  {
    id: "9",
    stats: [
      { label: "Etudiant", value: "350" },
      { label: "Enseignant", value: "25" },
      { label: "Année", value: "3-5" },
      { label: "Insertion", value: "88" },
    ],
  },
  {
    id: "10",
    stats: [
      { label: "Etudiant", value: "350" },
      { label: "Enseignant", value: "25" },
      { label: "Année", value: "3-5" },
      { label: "Insertion", value: "88" },
    ],
  },
  {
    id: "11",
    stats: [
      { label: "Etudiant", value: "350" },
      { label: "Enseignant", value: "25" },
      { label: "Année", value: "3-5" },
      { label: "Insertion", value: "88" },
    ],
  },
  {
    id: "12",
    stats: [
      { label: "Etudiant", value: "350" },
      { label: "Enseignant", value: "25" },
      { label: "Année", value: "3-5" },
      { label: "Insertion", value: "88" },
    ],
  },
  {
    id: "13",
    stats: [
      { label: "Etudiant", value: "350" },
      { label: "Enseignant", value: "25" },
      { label: "Année", value: "3-5" },
      { label: "Insertion", value: "88" },
    ],
  },
];

// const parcoursList = [
//   {
//     title: "Licence 1",
//     description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
//     color: "bg-primary",
//     niveau: "L1",
//     semestre: ["1", "2"],
//   },
//   {
//     title: "Licence 2",
//     description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
//     color: "bg-amber-600",
//     niveau: "L2",
//     semestre: ["3", "4"],
//   },
//   {
//     title: "Licence 3",
//     description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
//     color: "bg-primary",
//     niveau: "L3",
//     semestre: ["5", "6"],
//   },
//   {
//     title: "Master 1",
//     description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
//     color: "bg-amber-500",
//     niveau: "M1",
//     semestre: ["7", "8"],
//   },
//   {
//     title: "Master 2",
//     description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
//     color: "bg-primary",
//     niveau: "M2",
//     semestre: ["9", "10"],
//   },
// ];

export default function getAllMention() {
  return mentions;
}

export function getStatsById(id: string) {
  return Stats.find((stat) => stat.id === id)?.stats;
}

export function getAllDepartments() {
  // const mentions = await allMentions();
  return mentions;
}

export function getRespo(id: string) {
  // const respo = await getRespoByMention(id_mention);

  // return respo;
  return {
    respo: mentions.find((m) => m.id == id)?.responsable,
    name: mentions.find((m) => m.id == id)?.name,
  };
}

export function getImageMention(id: string) {
  return mentions.find((m) => m.id == id)?.image;
}
// export async function getAllParcours(id_mention : number) {
//   const parcoursList = await getParcoursByMention(id_mention);
//   return parcoursList;
// }
