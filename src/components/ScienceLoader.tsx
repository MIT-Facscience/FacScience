import React from 'react';
import { AlertTriangle } from 'lucide-react';

const ScienceLoader: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center p-10 bg-transparent sm:bg-white/40 sm:backdrop-blur-xl sm:rounded-[2.5rem] sm:shadow-[0_8px_32px_rgba(0,0,0,0.04)] sm:border sm:border-white/60 relative overflow-hidden">
            {/* Soft background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" />

            {/* L'animation SVG Atome */}
            <svg
                width="160"
                height="160"
                viewBox="0 0 200 200"
                className="overflow-visible relative z-10 mt-4"
            >
                <defs>
                    <radialGradient id="nucleusGrad" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#818CF8" />
                        <stop offset="50%" stopColor="#4F46E5" />
                        <stop offset="100%" stopColor="#312E81" />
                    </radialGradient>

                    <linearGradient id="orbit1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#818CF8" stopOpacity="0.8" />
                        <stop offset="50%" stopColor="#C7D2FE" stopOpacity="0.1" />
                        <stop offset="100%" stopColor="#818CF8" stopOpacity="0.8" />
                    </linearGradient>
                    <linearGradient id="orbit2" x1="100%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.8" />
                        <stop offset="50%" stopColor="#BAE6FD" stopOpacity="0.1" />
                        <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.8" />
                    </linearGradient>
                    <linearGradient id="orbit3" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#A78BFA" stopOpacity="0.8" />
                        <stop offset="50%" stopColor="#DDD6FE" stopOpacity="0.1" />
                        <stop offset="100%" stopColor="#A78BFA" stopOpacity="0.8" />
                    </linearGradient>
                    <linearGradient id="orbit4" x1="100%" y1="100%" x2="0%" y2="0%">
                        <stop offset="0%" stopColor="#F472B6" stopOpacity="0.8" />
                        <stop offset="50%" stopColor="#FCE7F3" stopOpacity="0.1" />
                        <stop offset="100%" stopColor="#F472B6" stopOpacity="0.8" />
                    </linearGradient>
                    <linearGradient id="orbit5" x1="50%" y1="0%" x2="50%" y2="100%">
                        <stop offset="0%" stopColor="#34D399" stopOpacity="0.8" />
                        <stop offset="50%" stopColor="#D1FAE5" stopOpacity="0.1" />
                        <stop offset="100%" stopColor="#34D399" stopOpacity="0.8" />
                    </linearGradient>

                    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>

                    <filter id="nucleus-glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="8" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>

                <g transform="translate(100, 100)">
                    {/* Glowing Aura around Nucleus */}
                    <circle cx="0" cy="0" r="22" fill="#4F46E5" opacity="0.15" filter="url(#nucleus-glow)">
                        <animate attributeName="r" values="20;30;20" dur="2s" repeatCount="indefinite" />
                    </circle>

                    {/* Nucleus Core */}
                    <circle cx="0" cy="0" r="14" fill="url(#nucleusGrad)">
                        <animate attributeName="r" values="12;16;12" dur="1.5s" repeatCount="indefinite" />
                    </circle>

                    {/* Orbitale 1 (0 deg) */}
                    <g>
                        <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="3s" repeatCount="indefinite" />
                        <ellipse cx="0" cy="0" rx="35" ry="90" fill="none" stroke="url(#orbit1)" strokeWidth="1.2" />
                        <circle cx="0" cy="-90" r="4" fill="#818CF8" filter="url(#glow)" />
                        <circle cx="0" cy="90" r="2" fill="#818CF8" opacity="0.6" filter="url(#glow)" />
                    </g>

                    {/* Orbitale 2 (72 deg) */}
                    <g>
                        <animateTransform attributeName="transform" type="rotate" from="72" to="432" dur="3.5s" repeatCount="indefinite" />
                        <ellipse cx="0" cy="0" rx="35" ry="90" fill="none" stroke="url(#orbit2)" strokeWidth="1.2" />
                        <circle cx="0" cy="-90" r="4" fill="#38BDF8" filter="url(#glow)" />
                        <circle cx="0" cy="90" r="2" fill="#38BDF8" opacity="0.6" filter="url(#glow)" />
                    </g>

                    {/* Orbitale 3 (144 deg) */}
                    <g>
                        <animateTransform attributeName="transform" type="rotate" from="144" to="504" dur="2.8s" repeatCount="indefinite" />
                        <ellipse cx="0" cy="0" rx="35" ry="90" fill="none" stroke="url(#orbit3)" strokeWidth="1.2" />
                        <circle cx="0" cy="-90" r="4" fill="#A78BFA" filter="url(#glow)" />
                        <circle cx="0" cy="90" r="2" fill="#A78BFA" opacity="0.6" filter="url(#glow)" />
                    </g>

                    {/* Orbitale 4 (216 deg) - Pink */}
                    <g>
                        <animateTransform attributeName="transform" type="rotate" from="216" to="576" dur="4s" repeatCount="indefinite" />
                        <ellipse cx="0" cy="0" rx="35" ry="90" fill="none" stroke="url(#orbit4)" strokeWidth="1.2" />
                        <circle cx="0" cy="-90" r="4" fill="#F472B6" filter="url(#glow)" />
                        <circle cx="0" cy="90" r="2" fill="#F472B6" opacity="0.6" filter="url(#glow)" />
                    </g>

                    {/* Orbitale 5 (288 deg) - Green */}
                    <g>
                        <animateTransform attributeName="transform" type="rotate" from="288" to="648" dur="3.2s" repeatCount="indefinite" />
                        <ellipse cx="0" cy="0" rx="35" ry="90" fill="none" stroke="url(#orbit5)" strokeWidth="1.2" />
                        <circle cx="0" cy="-90" r="4" fill="#34D399" filter="url(#glow)" />
                        <circle cx="0" cy="90" r="2" fill="#34D399" opacity="0.6" filter="url(#glow)" />
                    </g>
                </g>
            </svg>

            {/* Loading text & Prominent warning */}
            <div className="mt-8 flex flex-col items-center gap-4 w-full">
                <p className="text-sm font-bold text-slate-700 tracking-wider uppercase animate-pulse">
                    Envoi du dossier...
                </p>

                <div className="w-full max-w-xs flex items-start gap-3 p-3.5 bg-rose-50 border border-rose-200 rounded-xl shadow-[0_4px_12px_rgba(244,63,94,0.08)]">
                    <AlertTriangle className="w-5 h-5 text-rose-600 mt-0.5 flex-shrink-0" strokeWidth={2.5} />
                    <div className="text-left">
                        <p className="text-xs font-black text-rose-700 uppercase tracking-tight mb-0.5">
                            N'actualisez pas la page
                        </p>
                        <p className="text-[12px] text-rose-600/80 font-medium leading-snug">
                            L'envoi peut prendre quelques minutes ...
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScienceLoader;
