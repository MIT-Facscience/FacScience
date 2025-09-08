const parcours = [
  {
    id: "0",
    isProfessionnalisantes: false,
    data: [
      {
        title: "licence1",
        parcours: ["ANTHROPOBIOLOGIE ET DEVELOPPEMENT DURABLE"],
      },
      {
        title: "licence2",
        parcours: ["ANTHROPOBIOLOGIE ET DEVELOPPEMENT DURABLE"],
      },
      {
        title: "licence3",
        parcours: ["ANTHROPOBIOLOGIE ET DEVELOPPEMENT DURABLE"],
      },
      { title: "master1", parcours: ["ABE"], specialité: [""] },
      { title: "master2", parcours: ["ABE"], specialité: [""] },
    ],
  },
  {
    id: "1",
    isProfessionnalisantes: false,
    data: [
      { title: "licence1", parcours: ["BIOLOGIE ET ECOLOGIE VEGETALES"] },
      { title: "licence2", parcours: ["Fondamentaux en biologie"] },
      {
        title: "licence3",
        parcours: ["Biologies des organismes et ecosystèmes"],
      },
      {
        title: "master1",
        parcours: ["SYGEDUR", "DIASE", "PHYTECH"],
        specialité: [""],
      },
      {
        title: "master2",
        parcours: ["SYGEDUR", "DIASE", "PHYTECH"],
        specialité: [""],
      },
    ],
  },
  {
    id: "2",
    isProfessionnalisantes: false,
    data: [
      { title: "licence1", parcours: ["Biochimie fondamental et Appliquée"] },
      { title: "licence2", parcours: ["Biochimie fondamental et Appliquée"] },
      { title: "licence3", parcours: ["Biochimie fondamental et Appliquée"] },
      {
        title: "master1",
        parcours: ["BBS", "SAN", "BIOTECHNOLOGIE"],
        specialité: [""],
      },
      {
        title: "master2",
        parcours: ["BBS", "SAN", "BIOTECHNOLOGIE"],
        specialité: [""],
      },
    ],
  },
  {
    id: "3",
    isProfessionnalisantes: true,
    data: [
      {
        title: "licence1",
        parcours: ["BASSIN SEDIMENTAIRE - EVOLUTION - CONSERVATION"],
      },
      {
        title: "licence2",
        parcours: ["BASSIN SEDIMENTAIRE - EVOLUTION - CONSERVATION"],
      },
      {
        title: "licence3",
        parcours: ["BASSIN SEDIMENTAIRE - EVOLUTION - CONSERVATION"],
      },
      {
        title: "master1",
        parcours: ["PSAEECO", "BAR", "COLCO"],
        specialité: [""],
      },
      {
        title: "master2",
        parcours: ["PSAEECO", "BAR", "COLCO"],
        specialité: [""],
      },
    ],
    professionnlisante: [
      { title: "licence1", parcours: [""] },
      { title: "licence2", parcours: [""] },
      { title: "licence3", parcours: [""] },
      { title: "master1", parcours: ["GECOGELL"], specialité: "" },
      { title: "master2", parcours: ["GECOGELL"], specialité: "" },
    ],
  },
  {
    id: "4",
    isProfessionnalisantes: true,
    data: [
      { title: "licence1", parcours: ["Chimie"] },
      { title: "licence2", parcours: ["Chimie"] },
      { title: "licence3", parcours: ["Chimie"] },
      {
        title: "master1",
        parcours: [
          "Chimie bioligie",
          "chimie des substances naturelles",
          "chimie inorganique et génie des procèdés",
          "chimie moléculaires",
        ],
        specialité: [""],
      },
      {
        title: "master2",
        parcours: [
          "Chimie bioligie",
          "chimie des substances naturelles",
          "chimie inorganique et génie des procèdés",
          "chimie moléculaires",
        ],
        specialité: [""],
      },
    ],
    professionalisante: [
      { title: "licence1", parcours: [""] },
      { title: "licence2", parcours: ["LISTE", "ACP"] },
      { title: "licence3", parcours: ["LISTE", "ACP"] },
      { title: "master1", parcours: ["MISTE", "ACP"], specialité: [""] },
      { title: "master2", parcours: ["MISTE", "ACP"], specialité: [""] },
    ],
  },
  {
    id: "5",
    isProfessionnalisantes: true,
    data: [
      {
        title: "licence1",
        parcours: ["ENTOMOLOGIE - CULTURE - ELEVAGE - SANTE"],
      },
      {
        title: "licence2",
        parcours: ["ENTOMOLOGIE - CULTURE - ELEVAGE - SANTE"],
      },
      {
        title: "licence3",
        parcours: ["ENTOMOLOGIE - CULTURE - ELEVAGE - SANTE"],
      },
      { title: "master1", parcours: ["GDINS", "SPAD"], specialité: [""] },
      { title: "master2", parcours: ["GDINS", "SPAD"], specialité: [""] },
    ],
    professionalisante: [
      { title: "licence1", parcours: [""] },
      { title: "licence2", parcours: [""] },
      { title: "licence3", parcours: [""] },
      { title: "master1", parcours: ["GDINS"], specialité: [""] },
      { title: "master2", parcours: ["GDINS"], specialité: [""] },
    ],
  },
  {
    id: "6",
    isProfessionnalisantes: false,
    data: [
      { title: "licence1", parcours: ["Mathématiques communes"] },
      { title: "licence2", parcours: ["Mathématiques communes"] },
      {
        title: "licence3",
        parcours: ["Mathématiques fondamentales", "Mathématiques appliquées"],
      },
      {
        title: "master1",
        parcours: ["Mathématiques appliquées", "Maths structures"],
        specialité: [
          "Grandes déviations",
          "Algebres appliquées",
          "Mécanique",
          "Combinatoire et optimisation",
          "Calcul numérique",
        ],
      },
      {
        title: "master2",
        parcours: ["Mathématiques appliquées", "Maths structures"],
        specialité: [
          "Grandes déviations",
          "Algebres appliquées",
          "Mécanique",
          "Combinatoire et optimisation",
          "Calcul numérique",
        ],
      },
    ],
  },
  {
    id: "7",
    isProfessionnalisantes: true,
    data: [
      { title: "licence1", parcours: ["Tronc commun avec Physique chimie"] },
      { title: "licence2", parcours: ["Physique"] },
      { title: "licence3", parcours: ["Physique"] },
      {
        title: "master1",
        parcours: [
          "Physique du globe",
          "Energétique",
          "Physique nucléaire appliquée à l'environnement",
          "Physique de la matière et du rayonnement",
          "DYACO",
          "Physique des hautes énergies",
        ],
        specialité: [""],
      },
      {
        title: "master2",
        parcours: [
          "Physique du globe",
          "Energétique",
          "Physique nucléaire appliquée à l'environnement",
          "Physique de la matière et du rayonnement",
          "DYACO",
          "Physique des hautes énergies",
        ],
        specialité: [""],
      },
    ],
    professionalisante: [
      { title: "licence1", parcours: ["LIPSS", "TND", "LIER"] },
      { title: "licence2", parcours: ["LIPSS", "TND", "LIER"] },
      { title: "licence3", parcours: ["LIPSS", "TND", "LIER"] },
      {
        title: "master1",
        parcours: ["MIER", "MISEI", "STGG"],
        specialité: [""],
      },
      {
        title: "master2",
        parcours: ["MIER", "MISEI", "STGG"],
        specialité: [""],
      },
    ],
  },
  {
    id: "8",
    isProfessionnalisantes: false,
    data: [
      {
        title: "licence1",
        parcours: ["PHYSIOLOGIE ANIMALE - PHARMACOLOGIE - COSMETOLOGIE"],
      },
      {
        title: "licence2",
        parcours: ["PHYSIOLOGIE ANIMALE - PHARMACOLOGIE - COSMETOLOGIE"],
      },
      { title: "licence3", parcours: ["PHARMACOLOGIE-COSMETOLOGIE"] },
      {
        title: "master1",
        parcours: ["PHARMACOLOGIE", "COSMETOLOGIE", "PHYSIOLOGIE ANIMALE"],
        specialité: [""],
      },
      {
        title: "master2",
        parcours: ["PHARMACOLOGIE", "COSMETOLOGIE", "PHYSIOLOGIE ANIMALE"],
        specialité: [""],
      },
    ],
  },
  {
    id: "9",
    isProfessionnalisantes: false,
    data: [
      { title: "licence1", parcours: ["PROCEDES ET ECOLOGIE INDUSTRIELLE"] },
      { title: "licence2", parcours: ["PROCEDES ET ECOLOGIE INDUSTRIELLE"] },
      { title: "licence3", parcours: ["PROCEDES ET ECOLOGIE INDUSTRIELLE"] },
      {
        title: "master1",
        parcours: [
          "Chimie des matériaux",
          "Génie de l'eau et génie de l'environnement",
          "Physico-chimie des mélanges complexes",
          "Chimie de l'environnement",
          "Contrôle, assurance, qualité",
        ],
        specialité: [""],
      },
      {
        title: "master2",
        parcours: [
          "Chimie des matériaux",
          "Génie de l'eau et génie de l'environnement",
          "Physico-chimie des mélanges complexes",
          "Chimie de l'environnement",
          "Contrôle, assurance, qualité",
        ],
        specialité: [""],
      },
    ],
  },
  {
    id: "10",
    isProfessionnalisantes: true,
    data: [
      {
        title: "licence1",
        parcours: ["PORTAIL SCIENCES DE LA VIE ET DE LA TERRE"],
      },
      {
        title: "licence2",
        parcours: ["PORTAIL SCIENCES DE LA VIE ET DE LA TERRE"],
      },
      {
        title: "licence3",
        parcours: ["PORTAIL SCIENCES DE LA VIE ET DE LA TERRE"],
      },
      {
        title: "master1",
        parcours: ["RME", "GEOTECHNIQUE", "HYDROGEOLOGIE", "GREEN"],
        specialité: [""],
      },
      {
        title: "master2",
        parcours: ["RME", "GEOTECHNIQUE", "HYDROGEOLOGIE", "GREEN"],
        specialité: [""],
      },
    ],
    professionnlisante: [
      { title: "licence1", parcours: ["PSEG, FPST"] },
      { title: "licence2", parcours: ["PSEG, FPST"] },
      { title: "licence3", parcours: ["PSEG, FPST"] },
      { title: "master1", parcours: ["HYDROASS"], specialité: [""] },
      { title: "master2", parcours: ["HYDROASS"], specialité: [""] },
    ],
  },
  {
    id: "11",
    isProfessionnalisantes: false,
    data: [
      { title: "licence1", parcours: ["ZOOLOGIE ET BIODIVERSITE ANIMALE"] },
      { title: "licence2", parcours: ["ZOOLOGIE ET BIODIVERSITE ANIMALE"] },
      { title: "licence3", parcours: ["ZOOLOGIE ET BIODIVERSITE ANIMALE"] },
      { title: "master1", parcours: ["BCA"], specialité: [""] },
      { title: "master2", parcours: ["BCA"], specialité: [""] },
    ],
  },
  {
    id: "12",
    isProfessionnalisantes: false,
    data: [
      { title: "licence1", parcours: ["Informatiques et technologie"] },
      { title: "licence2", parcours: ["Informatiques et technologie"] },
      { title: "licence3", parcours: ["Informatiques et technologie"] },
      { title: "master1", parcours: ["MISA,INT"], specialité: [""] },
      { title: "master2", parcours: ["MISA,INT"], specialité: [""] },
    ],
  },
  {
    id: "13",
    isProfessionnalisantes: true,
    data: [
      { title: "licence1", parcours: ["GEOLOGIE APPLIQUEE AU DEVELOPPEMENT"] },
      {
        title: "licence2",
        parcours: ["GEOLOGIE APPLIQUEE AU DEVELOPPEMENT", "GEOSCIENCES"],
      },
      { title: "licence3", parcours: ["GEOLOGIE APPLIQUEE AU DEVELOPPEMENT"] },
      { title: "master1", parcours: ["GMINE-GEADEV"], specialité: [""] },
      { title: "master2", parcours: ["GMINE-GEADEV"], specialité: [""] },
    ],
    professionalisante: [
      { title: "licence1", parcours: [""] },
      { title: "licence2", parcours: [""] },
      { title: "licence3", parcours: [""] },
      { title: "master1", parcours: ["PROGEODE"], specialité: [""] },
      { title: "master2", parcours: ["PROGEODE"], specialité: [""] },
    ],
  },
];

export default function getParoursById(id: string) {
  return parcours.find((p) => p.id == id);
}
