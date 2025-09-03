import { Routes, Route } from "react-router-dom";
import { Navigation } from "./components/navigation";
import { Footer } from "./components/footer";
import HomePage from "./HomePage/HomePage";
import FormationPage from "./formation/page";
import RecherchePage from "./recherche/page";
import PresentationPage from "./presentation/histoire/page";
import ActualitesPage from "./actualites/page";
import ContactPage from "./contact/page";
// Import des sous-pages de recherche
import EcoleDoctoralePage from "./recherche/ecole-doctorale/page";
import LaboratoiresPage from "./recherche/laboratoires/page";
import PublicationsPage from "./recherche/publications/page";
import MITPage from "./formation/mit/page";
import MathInfoPage from "./formation/mathematiques-informatique/page";
import InscriptionPage from "./formation/inscription/page";
import AdminPage from "./admin/page";
import ResultatsPage from "./resultats/page";
import FraisPage from "./formation/frais/page";
import HistoirePage from "./presentation/histoire/page";
import OrganigrammePage from "./presentation/organigramme/page";
import VisionPage from "./presentation/vision/page";
import ListesAdmisPage from "./resultats/listes-admis/page";
import AllMention from "./formation/allMention";
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
        <Route path="/formation/mit" element={<MITPage />} />
        <Route
          path="/formation/mathematiques-informatique"
          element={<MathInfoPage />}
        />
        <Route path="/formation/inscription" element={<InscriptionPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/resultats" element={<ResultatsPage />} />
        <Route path="/formation/frais" element={<FraisPage />} />
        <Route path="/presentation/histoire" element={<HistoirePage />} />
        <Route
          path="/presentation/organigramme"
          element={<OrganigrammePage />}
        />
        <Route path="/presentation/vision" element={<VisionPage />} />
        <Route path="/resultats/listes-admis" element={<ListesAdmisPage />} />
        <Route path="" element={<AllMention />} />
      </Routes>

      <Footer />
    </div>
  );
}
