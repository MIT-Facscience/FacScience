import { Route, Routes } from "react-router-dom";
import { Footer } from "./components/footer";
import Navigation from "./components/navigation";
import ActualitesPage from "./pages/actualites/page";
import ContactPage from "./pages/contact/page";
import FormationPage from "./pages/formation/page";
import HomePage from "./pages/HomePage/HomePage";
import PresentationPage from "./pages/presentation/histoire/page";
import RecherchePage from "./pages/recherche/page";
import AdminPage from "./pages/admin/page";
// import FraisPage from "./pages/formation/frais/page";
// import InscriptionPage from "./pages/formation/inscription/page";
import EcoleDoctoralePage from "./pages/recherche/ecole-doctorale/page";
import LaboratoiresPage from "./pages/recherche/laboratoires/page";
import PublicationsPage from "./pages/recherche/publications/page";
// import MathInfoPage from "./pages/formation/mathematiques-informatique/page";
import HistoirePage from "./pages/presentation/histoire/page";
import OrganigrammePage from "./pages/presentation/organigramme/page";
import VisionPage from "./pages/presentation/vision/page";
import ListesAdmisPage from "./pages/resultats/listes-admis/page";
import FormationItems from "./pages/formation/components/FormationItems";
import ResultatsPage from "./pages/resultats/page";
import ParcourDetail from "./pages/formation/components/ParcourDetail";
import AnnuairePage from "./pages/presentation/annuaires/page";
// import Annuaire from "./pages/presentation/annuaires/annuaire";

// import MathInfoPage from "./formation/mathematiques-informatique/page";
export default function App() {
  return (
    <div className="min-h-screen">
      <Navigation />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/formation" element={<FormationPage />} />
        <Route path="/recherche" element={<RecherchePage />} />
        <Route
          path="/recherche/ecole-doctorale"
          element={<EcoleDoctoralePage />}
        />
        <Route path="/recherche/laboratoires" element={<LaboratoiresPage />} />
        <Route path="/recherche/publications" element={<PublicationsPage />} />
        <Route path="/presentation" element={<PresentationPage />} />
        <Route path="/actualites" element={<ActualitesPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/formation/detail" element={<FormationItems />} />
        {/* <Route path="/formation/inscription" element={<InscriptionPage />} /> */}
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/resultats" element={<ResultatsPage />} />
        {/* <Route path="/formation/frais" element={<FraisPage />} /> */}
        <Route path="/presentation/histoire" element={<HistoirePage />} />
        <Route
          path="/presentation/organigramme"
          element={<OrganigrammePage />}
        />
        {/* <Route path="/math" element={<MathInfoPage />} /> */}
        <Route path="/presentation/vision" element={<VisionPage />} />
        <Route path="/resultats/listes-admis" element={<ListesAdmisPage />} />
        <Route path="/formation/detailparcours" element={<ParcourDetail />} />
        <Route path="/presentation/annuaires/" element={<AnnuairePage/>}/>
        {/* <Route path="/presentation/annuaires/" element={<Annuaire/>}/> */}

        {/* <Route path="" element={<AllMention />} /> */}
      </Routes>

      <Footer />
    </div>
  );
}
