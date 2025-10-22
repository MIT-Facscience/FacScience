import { Route, Routes} from "react-router-dom";
import { Footer } from "./components/footer";
import Navigation from "./components/navigation";
import ActualitesPage from "./pages/actualites/page";
import AdminPage from "./pages/admin/page";
import ContactPage from "./pages/contact/page";
import FormationPage from "./pages/formation/page";
import HomePage from "./pages/HomePage/HomePage";
import PresentationPage from "./pages/presentation/histoire/page";
import RecherchePage from "./pages/recherche/page";
import EcoleDoctoralePage from "./pages/recherche/ecole-doctorale/page";
import LaboratoiresPage from "./pages/recherche/laboratoires/page";
import PublicationsPage from "./pages/recherche/publications/page";
import ActualiteDetail from "./pages/actualites/details/page";
import FormationItems from "./pages/formation/components/FormationItems";
import HistoirePage from "./pages/presentation/histoire/page";
import OrganigrammePage from "./pages/presentation/organigramme/page";
import VisionPage from "./pages/presentation/vision/page";
// import ListesAdmisPage from "./pages/resultats/listes-admis/page";
import ResultatsPage from "./pages/resultats/page";
import ParcourDetail from "./pages/formation/components/ParcourDetail";
import AnnuairePage from "./pages/presentation/annuaires/page";
import AdmissionPage from "./pages/admission/modalite/page";
import Formulaire from "./pages/Preinscription/Formulaire";
import NotFound from "./components/not-found";
// import Annuaire from "./pages/presentation/annuaires/annuaire";
import INTAdmissionPage from "./pages/admission/int-modalite/page";
// import Formulaire from "./pages/Preinscription/Formulaire";
import INTFormulaire from "./pages/admission/int-formulaire/page";
// import ConstructionPage from "./pages/Construction/ConstructionPage";

export default function App() {
 // const location = useLocation();

  // Liste des pages où on cache le header/footer
  //const hideLayoutRoutes = ["/"]; 

  // Vérifie si la route actuelle est dans la liste
 // const hideLayout = hideLayoutRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen">
      {/* Header caché sur certaines routes */}
      <Navigation />

      <Routes>
        {/* <Route path="/" element={<ConstructionPage />} /> */}
        <Route path="/" element={<HomePage />} />
        <Route path="/formation" element={<FormationPage />} />
        <Route path="/recherche" element={<RecherchePage />} />
        <Route path="/recherche/ecole-doctorale" element={<EcoleDoctoralePage />} />
        <Route path="/recherche/laboratoires" element={<LaboratoiresPage />} />
        <Route path="/recherche/publications" element={<PublicationsPage />} />
        <Route path="/presentation" element={<PresentationPage />} />
        <Route path="/actualites" element={<ActualitesPage />} />
        <Route path="/actualites/:id" element={<ActualiteDetail />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/formation/detail" element={<FormationItems />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/resultats" element={<ResultatsPage />} />
        <Route path="/presentation/histoire" element={<HistoirePage />} />
        <Route path="/presentation/organigramme" element={<OrganigrammePage />} />
        <Route path="/presentation/vision" element={<VisionPage />} />
        {/* <Route path="/resultats/listes-admis" element={<ListesAdmisPage />} /> */}
        <Route path="/resultats/listes-admis" element={<NotFound />} />
        <Route path="/formation/detailparcours" element={<ParcourDetail />} />
        <Route path="/presentation/annuaires/" element={<AnnuairePage />} />

        <Route path="/admission/modalite" element={<AdmissionPage />}/>
        <Route path="/admission/preinscription" element={<Formulaire/>}/>
        {/* <Route path="/admission/preinscription" element={<NotFound/>}/> */}

        {/* <Route path="/presentation/annuaires/" element={<Annuaire/>}/> */}

        {/* <Route path="" element={<AllMention />} /> */}
        <Route path="/admission/modalite" element={<AdmissionPage />} />
        <Route path="/admission/int-modalite" element={<INTAdmissionPage />} />
        <Route path="/admission/preinscription" element={<Formulaire />} />
        <Route path="/admission/int-formulaire" element={<INTFormulaire />} />
      </Routes>

      {/* Footer caché sur certaines routes */}
      <Footer />
    </div>
  );
}
