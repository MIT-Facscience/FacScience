import { Route, Routes } from "react-router-dom";
import ActualitesPage from "./actualites/page";
import { Footer } from "./components/footer";
import Navigation from "./components/navigation";
import ContactPage from "./contact/page";
import FormationPage from "./formation/page";
import HomePage from "./HomePage/HomePage";
import PresentationPage from "./presentation/histoire/page";
import RecherchePage from "./recherche/page";
// Import des sous-pages de recherche
import EcoleDoctoralePage from "./recherche/ecole-doctorale/page";
import LaboratoiresPage from "./recherche/laboratoires/page";
import PublicationsPage from "./recherche/publications/page";
import InscriptionPage from "./formation/inscription/page";
import AdminPage from "./admin/page";
import AllMention from "./formation/allMention";
import FraisPage from "./formation/frais/page";
import InscriptionPage from "./formation/inscription/page";
import MathInfoPage from "./formation/mathematiques-informatique/page";
import MITPage from "./formation/mit/page";
import HistoirePage from "./presentation/histoire/page";
import OrganigrammePage from "./presentation/organigramme/page";
import VisionPage from "./presentation/vision/page";
import EcoleDoctoralePage from "./recherche/ecole-doctorale/page";
import LaboratoiresPage from "./recherche/laboratoires/page";
import PublicationsPage from "./recherche/publications/page";
import ListesAdmisPage from "./resultats/listes-admis/page";
import AllMention from "./formation/allMention";
import FormationItems from "./formation/formationItems";
import MathInfoPage from "./formation/mathematiques-informatique/page";
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
        <Route path="/formation/inscription" element={<InscriptionPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/resultats" element={<ResultatsPage />} />
        <Route path="/formation/frais" element={<FraisPage />} />
        <Route path="/presentation/histoire" element={<HistoirePage />} />
        <Route
          path="/presentation/organigramme"
          element={<OrganigrammePage />}
        />
        <Route path="/math" element={<MathInfoPage />} />
        <Route path="/presentation/vision" element={<VisionPage />} />
        <Route path="/resultats/listes-admis" element={<ListesAdmisPage />} />
        <Route path="" element={<AllMention />} />
      </Routes>

      <Footer />
    </div>
  );
}
