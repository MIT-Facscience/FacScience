import { lazy, Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Footer } from "./components/footer";
import Navigation from "./components/navigation";
import { ResultsProvider } from "@/pages/resultats/ResultsProvider";

/**
 * Parcours de pré-inscription : page de saisie. Sur mobile, le footer du site
 * occupait plus de la moitié du défilement et détournait du formulaire ;
 * le contact reste accessible sous le formulaire.
 */
const FOCUSED_ROUTES = ["/admission/preinscription"];

// Les pages sont chargées à la demande : le bundle initial ne contient plus
// tout le site (jsPDF, recharts, webcam, etc.), ce qui accélère fortement le
// premier affichage, notamment sur /admission/preinscription.
const ActualitesPage = lazy(() => import("./pages/actualites/page"));
const AdminPage = lazy(() => import("./pages/admin/page"));
const ContactPage = lazy(() => import("./pages/contact/page"));
const FormationPage = lazy(() => import("./pages/formation/page"));
const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const HistoirePage = lazy(() => import("./pages/presentation/histoire/page"));
const RecherchePage = lazy(() => import("./pages/recherche/page"));
const EcoleDoctoralePage = lazy(
  () => import("./pages/recherche/ecole-doctorale/page")
);
const LaboratoiresPage = lazy(
  () => import("./pages/recherche/laboratoires/page")
);
const PublicationsPage = lazy(
  () => import("./pages/recherche/publications/page")
);
const ActualiteDetail = lazy(() => import("./pages/actualites/details/page"));
const FormationItems = lazy(
  () => import("./pages/formation/components/FormationItems")
);
const OrganigrammePage = lazy(
  () => import("./pages/presentation/organigramme/page")
);
const VisionPage = lazy(() => import("./pages/presentation/vision/page"));
const ParcourDetail = lazy(
  () => import("./pages/formation/components/ParcourDetail")
);
const AnnuairePage = lazy(() => import("./pages/presentation/annuaires/page"));
const AdmissionPage = lazy(() => import("./pages/admission/modalite/page"));
const BankReferencesPage = lazy(
  () => import("./pages/admission/references/page")
);
const PreinscriptionWrapper = lazy(
  () => import("./pages/Preinscription/PreinscriptionWrapper")
);
const NotFound = lazy(() => import("./components/not-found"));
const ResultatsPage = lazy(() => import("./pages/resultats/selection/page"));
const ListesAdmisPage = lazy(
  () => import("./pages/resultats/LicenceEtMaster/page")
);
const InscriptionPage = lazy(() => import("./pages/inscription/page"));
const AuthorizedList = lazy(() => import("./pages/inscription/AuthorizedList"));

function RouteFallback() {
  return (
    <div className="ps-page flex min-h-[100dvh] items-center justify-center">
      <span
        className="size-9 animate-spin rounded-full border-2 border-ps-violet-200 border-t-ps-violet-600"
        role="status"
        aria-label="Chargement"
      />
    </div>
  );
}

export default function App() {
  const { pathname } = useLocation();
  const isFocusedRoute = FOCUSED_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  return (
    <ResultsProvider>
      <div className="min-h-screen">
        {/* Header */}
        <Navigation />

        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/formation" element={<FormationPage />} />
            <Route path="/recherche" element={<RecherchePage />} />
            <Route
              path="/recherche/ecole-doctorale"
              element={<EcoleDoctoralePage />}
            />
            <Route
              path="/recherche/laboratoires"
              element={<LaboratoiresPage />}
            />
            <Route
              path="/recherche/publications"
              element={<PublicationsPage />}
            />
            <Route path="/presentation" element={<HistoirePage />} />
            <Route path="/actualites" element={<ActualitesPage />} />
            <Route path="/actualites/:id" element={<ActualiteDetail />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/formation/detail" element={<FormationItems />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/resultats/selection" element={<ResultatsPage />} />
            <Route path="/resultats" element={<NotFound />} />
            <Route path="/presentation/histoire" element={<HistoirePage />} />
            <Route
              path="/presentation/organigramme"
              element={<OrganigrammePage />}
            />
            <Route path="/presentation/vision" element={<VisionPage />} />
            <Route
              path="/resultats/LicenceEtMaster"
              element={<ListesAdmisPage />}
            />
            <Route path="/resultats/listes-admis" element={<NotFound />} />
            <Route
              path="/formation/detailparcours"
              element={<ParcourDetail />}
            />
            <Route path="/presentation/annuaires" element={<AnnuairePage />} />
            <Route path="/admission/modalite" element={<AdmissionPage />} />
            <Route
              path="/admission/references"
              element={<BankReferencesPage />}
            />
            <Route
              path="/admission/preinscription"
              element={<PreinscriptionWrapper />}
            />
            <Route
              path="/admission/inscription/6e9f2a8b3d1c4e5g7h8i"
              element={<InscriptionPage />}
            />
            <Route
              path="/admission/inscription/autorises"
              element={<AuthorizedList />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>

        {/* Sur mobile, le footer occupait plus de la moitié du défilement de la
            pré-inscription : il est masqué là, mais conservé sur grand écran. */}
        <div className={isFocusedRoute ? "hidden md:block" : undefined}>
          <Footer />
        </div>
      </div>
    </ResultsProvider>
  );
}
