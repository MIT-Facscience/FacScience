import React from 'react';

const ScienceLoader: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center p-4 sm:p-8 bg-transparent sm:bg-white/80 sm:backdrop-blur-sm sm:rounded-xl sm:shadow-sm sm:border sm:border-gray-100">
            {/* L'animation SVG Atome */}
            <svg
                width="160"
                height="160"
                viewBox="0 0 200 200"
                xmlns="http://www.w3.org/2000/svg"
                className="overflow-visible"
            >
                <defs>
                    {/* Dégradés pour un rendu premium */}
                    <radialGradient id="nucleusGrad" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#4F46E5" />  {/* Indigo 600 */}
                        <stop offset="100%" stopColor="#312E81" /> {/* Indigo 900 */}
                    </radialGradient>
                    <linearGradient id="orbit1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#818CF8" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#C7D2FE" stopOpacity="0.2" />
                    </linearGradient>
                    <linearGradient id="orbit2" x1="100%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#BAE6FD" stopOpacity="0.2" />
                    </linearGradient>
                    <linearGradient id="orbit3" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#A78BFA" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#DDD6FE" stopOpacity="0.2" />
                    </linearGradient>

                    {/* Effet lumineux pour les électrons */}
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>

                <g transform="translate(100, 100)">
                    {/* Noyau palpitant */}
                    <circle cx="0" cy="0" r="14" fill="url(#nucleusGrad)">
                        <animate attributeName="r" values="12;16;12" dur="2s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite" />
                    </circle>

                    {/* Orbitale 1 */}
                    <g>
                        <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="3s" repeatCount="indefinite" />
                        <ellipse cx="0" cy="0" rx="35" ry="80" fill="none" stroke="url(#orbit1)" strokeWidth="2.5" />
                        <circle cx="0" cy="-80" r="6" fill="#818CF8" filter="url(#glow)" />
                    </g>

                    {/* Orbitale 2 */}
                    <g>
                        <animateTransform attributeName="transform" type="rotate" from="60" to="420" dur="4s" repeatCount="indefinite" />
                        <ellipse cx="0" cy="0" rx="35" ry="80" fill="none" stroke="url(#orbit2)" strokeWidth="2.5" />
                        <circle cx="0" cy="-80" r="6" fill="#38BDF8" filter="url(#glow)" />
                    </g>

                    {/* Orbitale 3 */}
                    <g>
                        <animateTransform attributeName="transform" type="rotate" from="120" to="480" dur="5s" repeatCount="indefinite" />
                        <ellipse cx="0" cy="0" rx="35" ry="80" fill="none" stroke="url(#orbit3)" strokeWidth="2.5" />
                        <circle cx="0" cy="-80" r="6" fill="#A78BFA" filter="url(#glow)" />
                    </g>
                </g>
            </svg>

            {/* Messages de chargement */}
            <div className="mt-8 space-y-3 text-center">
                <h3 className="text-xl font-bold text-gray-800 animate-pulse">
                    Traitement de votre dossier...
                </h3>

                <div className="flex flex-col items-center space-y-2">
                    <p className="text-sm text-gray-600 max-w-sm">
                        L'envoi de vos informations et de vos documents est en cours. Veuillez patienter un instant.
                    </p>

                    {/* Alerte rouge/orange pour prévenir du rechargement */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 mt-2 text-sm font-medium text-amber-800 bg-amber-50 rounded-full border border-amber-200">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        Attention : Ne rechargez pas et ne quittez pas cette page
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScienceLoader;
