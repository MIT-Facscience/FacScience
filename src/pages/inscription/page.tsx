import React, { useState } from 'react';
import {
    UserPlus,
    RefreshCcw,
    ChevronLeft,
    ArrowRight,
    Loader2,
    CheckCircle2,
    AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { BACKEND_URL } from '@/lib/api';

type InscriptionStep = 'selection' | 'l1-form' | 'others-form' | 'portal-selection';

interface EligiblePortal {
    idPortail: number;
    nomPortail: string;
    abbreviation: string;
    idPreinscription: number;
    statut: string;
}

const InscriptionPage: React.FC = () => {
    const [step, setStep] = useState<InscriptionStep>('selection');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [eligiblePortals, setEligiblePortals] = useState<EligiblePortal[]>([]);

    // Form states
    const [l1Data, setL1Data] = useState({ baccNum: '', baccYear: '' });
    const [othersData, setOthersData] = useState({ inscriptionNum: '' });

    const handleBack = () => {
        if (step === 'portal-selection') {
            setStep('l1-form');
        } else {
            setStep('selection');
        }
        setError(null);
    };

    const handleL1Submit = async () => {
        if (!l1Data.baccNum || !l1Data.baccYear) {
            setError("Veuillez remplir tous les champs.");
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`${BACKEND_URL}/api/Inscription/verify-l1?numBacc=${l1Data.baccNum}&anneeBacc=${l1Data.baccYear}`);

            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error("Aucune sélection trouvée pour ces informations. Vérifiez votre numéro et année de Bacc.");
                }
                throw new Error("Une erreur est survenue lors de la vérification.");
            }

            const data = await response.json();
            setEligiblePortals(data);
            setStep('portal-selection');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.2, ease: "easeOut" }
        },
        exit: { opacity: 0, y: -10, transition: { duration: 0.1 } }
    };

    return (
        <div className={cn(
            "min-h-screen bg-white flex flex-col items-center pb-12 px-4 md:px-0 font-sans transition-all duration-300",
            step === 'selection' ? "pt-24" : "pt-4 sm:pt-24"
        )}>
            <div className="w-full max-w-[480px] relative z-10">
                <AnimatePresence mode="wait">
                    {step === 'selection' && (
                        <motion.div
                            key="selection"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-slate-100 p-8 md:p-10 text-center"
                        >
                            <h1 className="text-3xl font-bold text-slate-800 mb-2">
                                Inscription Universitaire
                            </h1>
                            <p className="text-slate-400 text-sm mb-10">
                                Année académique 2025-2026
                            </p>

                            <div className="space-y-4">
                                <button
                                    onClick={() => setStep('l1-form')}
                                    className="w-full flex items-center justify-between p-5 rounded-lg border border-slate-100 bg-slate-50 hover:bg-indigo-50 hover:border-indigo-200 transition-all group text-left"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="p-2.5 bg-indigo-500 rounded-md text-white font-bold group-hover:scale-110 transition-transform shadow-md shadow-indigo-100">
                                            <UserPlus className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="font-bold text-slate-700">Admission L1</div>
                                            <div className="text-xs text-slate-400 font-medium">Nouveaux séléctionnés</div>
                                        </div>
                                    </div>
                                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                                </button>

                                <button
                                    onClick={() => setStep('others-form')}
                                    className="w-full flex items-center justify-between p-5 rounded-lg border border-slate-100 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-200 transition-all group text-left"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="p-2.5 bg-emerald-500 rounded-md text-white font-bold group-hover:scale-110 transition-transform shadow-md shadow-emerald-100">
                                            <RefreshCcw className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="font-bold text-slate-700">Réinscription</div>
                                            <div className="text-[11px] text-slate-400 font-medium leading-tight">L2, L3, Masters & Redoublants</div>
                                        </div>
                                    </div>
                                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {(step === 'l1-form' || step === 'others-form') && (
                        <motion.div
                            key="form"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="w-full sm:bg-white sm:rounded-xl sm:shadow-[0_10px_40px_rgba(0,0,0,0.08)] sm:border sm:border-slate-100 p-4 sm:p-10"
                        >
                            <div className="mb-6 sm:mb-8">
                                <button
                                    onClick={handleBack}
                                    className="text-[10px] text-indigo-500 hover:text-indigo-600 flex items-center font-black tracking-widest mb-4 sm:mb-6 transition-colors"
                                >
                                    <ChevronLeft className="w-3 h-3 mr-1" /> RETOUR
                                </button>
                                <h1 className="text-xl sm:text-2xl font-bold text-slate-800">
                                    {step === 'l1-form' ? "Identification L1" : "Identification Réinscription"}
                                </h1>
                                {error && (
                                    <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-lg flex items-start gap-3 text-red-600 text-xs animate-in fade-in slide-in-from-top-1">
                                        <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                        <p>{error}</p>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-6">
                                {step === 'l1-form' ? (
                                    <>
                                        <div className="space-y-2">
                                            <Label htmlFor="baccNum" className="text-[11px] uppercase font-bold text-slate-400 tracking-wider ml-1">Numéro Bacc</Label>
                                            <Input
                                                id="baccNum"
                                                className="bg-slate-50 border-slate-100 focus-visible:ring-1 focus-visible:ring-indigo-500 h-12 rounded-lg font-medium px-4 placeholder:font-normal placeholder:text-slate-400/60"
                                                placeholder="ex: 3700115"
                                                value={l1Data.baccNum}
                                                onChange={(e) => setL1Data({ ...l1Data, baccNum: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="baccYear" className="text-[11px] uppercase font-bold text-slate-400 tracking-wider ml-1">Année du Bacc</Label>
                                            <Input
                                                id="baccYear"
                                                className="bg-slate-50 border-slate-100 focus-visible:ring-1 focus-visible:ring-indigo-500 h-12 rounded-lg font-medium px-4 placeholder:font-normal placeholder:text-slate-400/60"
                                                placeholder="Ex: 2024"
                                                value={l1Data.baccYear}
                                                onChange={(e) => setL1Data({ ...l1Data, baccYear: e.target.value })}
                                            />
                                        </div>
                                    </>
                                ) : (
                                    <div className="space-y-2">
                                        <Label htmlFor="inscriptionNum" className="text-[11px] uppercase font-bold text-slate-400 tracking-wider ml-1">Numéro d'inscription 2024-2025</Label>
                                        <Input
                                            id="inscriptionNum"
                                            className="bg-slate-50 border-slate-100 focus-visible:ring-1 focus-visible:ring-indigo-500 h-12 rounded-lg font-medium px-4 placeholder:font-normal placeholder:text-slate-400/60"
                                            placeholder="ex: UA00000FS2025L1/01-05"
                                            value={othersData.inscriptionNum}
                                            onChange={(e) => setOthersData({ ...othersData, inscriptionNum: e.target.value })}
                                        />
                                    </div>
                                )}

                                <Button
                                    onClick={step === 'l1-form' ? handleL1Submit : undefined}
                                    disabled={isLoading}
                                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold h-12 transition-all rounded-lg shadow-md shadow-indigo-100 mt-2 sm:mt-4"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            Vérification...
                                        </>
                                    ) : (
                                        "Continuer"
                                    )}
                                </Button>

                                <p className="text-[10px] text-slate-300 text-center uppercase font-bold mt-4 sm:mt-6">
                                    Vérification sécurisée
                                </p>
                            </div>
                        </motion.div>
                    )}

                    {step === 'portal-selection' && (
                        <motion.div
                            key="portal-selection"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="w-full sm:bg-white sm:rounded-xl sm:shadow-[0_10px_40px_rgba(0,0,0,0.08)] sm:border sm:border-slate-100 p-4 sm:p-10"
                        >
                            <div className="mb-6 sm:mb-8 text-center sm:text-left">
                                <button
                                    onClick={handleBack}
                                    className="text-[10px] text-indigo-500 hover:text-indigo-600 flex items-center font-black tracking-widest mb-4 sm:mb-6 transition-colors mx-auto sm:mx-0"
                                >
                                    <ChevronLeft className="w-3 h-3 mr-1" /> MODIFIER
                                </button>
                                <h1 className="text-xl sm:text-2xl font-bold text-slate-800">
                                    Portails Disponibles
                                </h1>
                                <p className="text-slate-400 text-xs mt-1">
                                    Choisissez le portail pour votre inscription
                                </p>
                            </div>

                            <div className="space-y-3">
                                {eligiblePortals.map((portal) => (
                                    <button
                                        key={portal.idPortail}
                                        className="w-full group text-left p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-50/50 transition-all duration-300 flex items-center justify-between"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm">
                                                {portal.abbreviation}
                                            </div>
                                            <div>
                                                <div className="font-bold text-slate-700 text-sm">{portal.nomPortail}</div>
                                                <div className="flex items-center gap-1.5 mt-0.5">
                                                    <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                                                    <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-tighter">
                                                        {portal.statut}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                                    </button>
                                ))}
                            </div>

                            <div className="mt-8 pt-6 border-t border-slate-50">
                                <p className="text-[11px] text-slate-400 text-center leading-relaxed italic">
                                    Sélectionnez un portail pour continuer vers le formulaire d'inscription détaillé.
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default InscriptionPage;
