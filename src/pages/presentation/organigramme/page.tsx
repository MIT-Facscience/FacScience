{
  /*
  type NodeProps = {
    title: string;
    subtitle?: string;
    children?: React.ReactNode;
    collapsible?: boolean;
  };
  function Node({ title, subtitle, children, collapsible }: NodeProps) {
    const [open, setOpen] = useState(true);
    return (
      <div className="flex flex-col items-center relative">
      <div
      className="border rounded-lg shadow-sm px-4 py-2 min-w-[140px] text-center bg-white hover:shadow-md cursor-pointer"
      onClick={() => collapsible && setOpen((v) => !v)}
      >
      <div className="font-semibold text-sm">{title}</div>
      {subtitle && <div className="text-xs text-gray-500">{subtitle}</div>}
      </div>
      {collapsible ? (
        <div className="mt-2 w-full">{open ? children : null}</div>
      ) : (
        <div className="mt-2 w-full">{children}</div>
      )}
      </div>
    );
  }
  */
}

export default function Organigramme() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <main className="pt-4 sm:pt-8 lg:pt-12 pb-4 sm:pb-8 lg:pb-12">
        <div className="container mx-auto px-2 sm:px-4 lg:px-6">
          <div className="mx-auto">
            <div className="p-6 bg-gray-50 min-h-screen">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl font-bold mb-8 text-center">
                  Organigramme - COFAC / Doyen
                </h2>

                {/* Structure principale */}
                <div className="flex flex-col items-center space-y-8">
                  {/* Niveau 1: COFAC */}
                  <div className="flex flex-col items-center">
                    <div className="border-2 rounded-lg px-8 py-3 bg-blue-100 shadow-md font-bold text-lg">
                      COFAC
                    </div>
                    {/* Ligne verticale vers le niveau suivant */}
                    <div className="w-1 h-8 bg-red-400"></div>
                  </div>

                  {/* Niveau 2: Conseil, Doyen, Collège */}
                  <div className="relative">
                    {/* Ligne horizontale connectant les trois éléments */}
                    <div className="absolute left-0 right-0 -top-8 h-1 bg-gray-400 transform -translate-y-1/2"></div>
                    {/* Lignes verticales descendantes */}
                    <div className="absolute -top-8 left-[12.5%] w-1 h-10 bg-gray-400"></div>
                    <div className="absolute -top-8 left-1/2 w-1 h-8 bg-gray-400 transform -translate-x-1/2"></div>
                    <div className="absolute -top-8 right-[12.5%] w-1 h-10 bg-gray-400"></div>

                    <div className="flex items-center justify-center gap-16">
                      <div className="border rounded-lg px-6 py-2 bg-white shadow-sm min-w-[120px] text-center">
                        <div className="font-semibold text-sm">Conseil</div>
                      </div>
                      <div className="border-2 rounded-lg px-8 py-3 bg-yellow-100 shadow-md font-bold">
                        DOYEN
                      </div>
                      <div className="border rounded-lg px-6 py-2 bg-white shadow-sm min-w-[120px] text-center">
                        <div className="font-semibold text-sm">Collège</div>
                      </div>
                    </div>
                  </div>

                  {/* Ligne verticale du Doyen vers les niveaux inférieurs */}
                  <div className="w-1 h-8 bg-gray-400"></div>

                  {/* Structure principale sous le Doyen */}
                  <div className="w-full max-w-5xl">
                    <div className="flex justify-between items-start">
                      {/* Colonne gauche: Mention -> Parcours -> Labo */}
                      <div className="flex flex-col items-center space-y-4">
                        <div className="border rounded-lg px-4 py-2 bg-green-50 shadow-sm min-w-[120px] text-center">
                          <div className="font-semibold text-sm">Mention</div>
                        </div>
                        <div className="w-1 h-6 bg-gray-400"></div>
                        <div className="border rounded-lg px-4 py-2 bg-green-50 shadow-sm min-w-[120px] text-center">
                          <div className="font-semibold text-sm">Parcours</div>
                        </div>
                        <div className="w-1 h-6 bg-gray-400"></div>
                        <div className="border rounded-lg px-4 py-2 bg-green-50 shadow-sm min-w-[120px] text-center">
                          <div className="font-semibold text-sm">Labo</div>
                        </div>
                      </div>

                      {/* Section centrale: Vice-Doyens et services */}
                      <div className="flex-1 flex flex-col items-center space-y-8">
                        {/* Ligne des Vice-Doyens et autres postes */}
                        <div className="relative w-full">
                          <div className="flex justify-center items-center gap-8">
                            <div className="border rounded-lg px-4 py-2 bg-white shadow-sm min-w-[120px] text-center">
                              <div className="font-semibold text-sm">
                                Secrétaire
                              </div>
                            </div>
                            <div className="border rounded-lg px-4 py-2 bg-white shadow-sm min-w-[120px] text-center">
                              <div className="font-semibold text-sm">DICOS</div>
                            </div>
                            <div className="flex flex-col items-center">
                              <div className="border rounded-lg px-4 py-2 bg-purple-50 shadow-sm min-w-[120px] text-center cursor-pointer hover:shadow-md">
                                <div className="font-semibold text-sm">
                                  Vice-Doyen
                                </div>
                                <div className="text-xs text-gray-500">
                                  Formation
                                </div>
                              </div>
                              <div className="w-1 h-4 bg-gray-400"></div>
                              <div className="border rounded-lg px-4 py-2 bg-blue-50 shadow-sm">
                                <div className="text-sm">
                                  Association étudiants
                                </div>
                              </div>
                            </div>
                            <div className="border rounded-lg px-4 py-2 bg-purple-50 shadow-sm min-w-[120px] text-center">
                              <div className="font-semibold text-sm">
                                Vice-Doyen
                              </div>
                              <div className="text-xs text-gray-500">
                                Recherche
                              </div>
                            </div>
                            <div className="border rounded-lg px-4 py-2 bg-purple-50 shadow-sm min-w-[120px] text-center">
                              <div className="font-semibold text-sm">
                                Vice-Doyen
                              </div>
                              <div className="text-xs text-gray-500">
                                Autre Mission
                              </div>
                            </div>
                          </div>
                          {/* Ligne horizontale connectant tous les éléments */}
                          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-400 transform -translate-y-1/2"></div>
                          {/* Lignes verticales descendantes */}
                          <div className="absolute top-1/2 left-[10%] w-1 h-4 bg-gray-400"></div>
                          <div className="absolute top-1/2 left-[25%] w-1 h-4 bg-gray-400"></div>
                          <div className="absolute top-1/2 left-[45%] w-1 h-4 bg-gray-400"></div>
                          <div className="absolute top-1/2 left-[70%] w-1 h-4 bg-gray-400"></div>
                          <div className="absolute top-1/2 right-[10%] w-1 h-4 bg-gray-400"></div>
                        </div>

                        {/* Ligne verticale vers les services */}
                        <div className="w-1 h-8 bg-gray-400"></div>

                        {/* Services en bas */}
                        <div className="relative w-full">
                          <div className="grid grid-cols-5 gap-4">
                            <div className="border rounded-lg px-3 py-2 bg-orange-50 shadow-sm text-center">
                              <div className="text-sm font-medium">
                                Service solidarité
                              </div>
                            </div>
                            <div className="border rounded-lg px-3 py-2 bg-orange-50 shadow-sm text-center">
                              <div className="text-sm font-medium">
                                Service des affaires
                              </div>
                            </div>
                            <div className="border rounded-lg px-3 py-2 bg-orange-50 shadow-sm text-center">
                              <div className="text-sm font-medium">
                                Service comptabilité
                              </div>
                            </div>
                            <div className="border rounded-lg px-3 py-2 bg-orange-50 shadow-sm text-center">
                              <div className="text-sm font-medium">
                                Service personnel
                              </div>
                            </div>
                            <div className="border rounded-lg px-3 py-2 bg-orange-50 shadow-sm text-center">
                              <div className="text-sm font-medium">
                                Service informatique
                              </div>
                            </div>
                          </div>
                          {/* Ligne horizontale connectant les services */}
                          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-400 transform -translate-y-1/2"></div>
                          {/* Lignes verticales montantes */}
                          <div className="absolute top-1/2 left-[10%] w-1 h-4 bg-gray-400 transform -translate-y-full"></div>
                          <div className="absolute top-1/2 left-[30%] w-1 h-4 bg-gray-400 transform -translate-y-full"></div>
                          <div className="absolute top-1/2 left-[50%] w-1 h-4 bg-gray-400 transform -translate-y-full"></div>
                          <div className="absolute top-1/2 left-[70%] w-1 h-4 bg-gray-400 transform -translate-y-full"></div>
                          <div className="absolute top-1/2 right-[10%] w-1 h-4 bg-gray-400 transform -translate-y-full"></div>
                        </div>
                      </div>
                    </div>

                    {/* Connexions horizontales principales */}
                    <div className="relative mt-8">
                      {/* Ligne principale horizontale */}
                      <div className="absolute top-0 left-[10%] right-[10%] h-1 bg-gray-400"></div>
                      {/* Connexions vers Mention/Parcours/Labo */}
                      <div className="absolute top-0 left-[10%] w-1 h-32 bg-gray-400 transform -translate-y-32"></div>
                      {/* Connexion vers la section centrale */}
                      <div className="absolute top-0 left-1/2 w-1 h-32 bg-gray-400 transform -translate-x-1/2 -translate-y-32"></div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <p className="text-sm text-gray-600">
                    Cliquez sur les nœuds "Vice-Doyen" pour replier/déplier les
                    contenus quand activé.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
