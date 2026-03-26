"use client";

import { useState, useEffect } from "react";
import { BACKEND_ADMIN_URL } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Loader2, AlertCircle, ArrowLeft, Plus, Hash, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface BankReference {
  idRb: number;
  reference: string;
  dateInsertion: string;
}

interface StudentReferences {
  nom: string;
  prenom: string;
  numInscription: string;
  references: BankReference[];
}

export default function BankReferencesPage() {
  const [numInscription, setNumInscription] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<StudentReferences | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Management state
  const [localRefs, setLocalRefs] = useState<BankReference[]>([]);
  const [newRef, setNewRef] = useState("");
  const [adding, setAdding] = useState(false);
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

  // Style constants - Matching InscriptionPage
  const inputStyle = "bg-slate-50 border-slate-200 focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all rounded-xl text-sm placeholder:text-slate-300 placeholder:font-light disabled:opacity-50 disabled:bg-slate-100 italic";

  // Sync localRefs when data changes
  useEffect(() => {
    if (data) {
      setLocalRefs(data.references);
    }
  }, [data]);

  const handleSearch = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!numInscription.trim()) {
      toast.error("Veuillez entrer votre numéro d'inscription.");
      return;
    }

    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await fetch(`${BACKEND_ADMIN_URL}/api/Inscription/references/${numInscription.trim()}`);
      
      if (response.status === 404) {
        setError("Aucune inscription trouvée pour ce numéro pour l'année 2025-2026.");
      } else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la récupération des données.");
      } else {
        const result = await response.json();
        setData(result);
      }
    } catch (err) {
      setError("Impossible de contacter le serveur. Veuillez réessayer plus tard.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddReference = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRef.trim()) return;

    setAdding(true);
    try {
      const response = await fetch(`${BACKEND_ADMIN_URL}/api/Inscription/references`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          numInscription: data?.numInscription,
          reference: newRef.trim()
        })
      });

      if (!response.ok) throw new Error("Erreur lors de l'ajout.");

      const added: BankReference = await response.json();
      toast.success("Ajouté !");
      setLocalRefs(prev => [added, ...prev]);
      setNewRef("");
    } catch (err) {
      toast.error("Échec de l'ajout.");
    } finally {
      setAdding(false);
    }
  };

  const handleUpdateReference = async (id: number, newValue: string) => {
    if (!newValue.trim()) {
        toast.error("La référence ne peut pas être vide.");
        return;
    }

    setUpdatingId(id);
    try {
      const response = await fetch(`${BACKEND_ADMIN_URL}/api/Inscription/references/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idRb: id, reference: newValue.trim() })
      });

      if (!response.ok) throw new Error("Erreur lors de la mise à jour.");

      toast.success("Mise à jour réussie !");
      // Update local state is done via the controlled inputs or re-fetch
    } catch (err) {
      toast.error("Échec de la mise à jour.");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDeleteReference = async (id: number) => {
    try {
      const response = await fetch(`${BACKEND_ADMIN_URL}/api/Inscription/references/${id}`, {
        method: "DELETE"
      });

      if (!response.ok) throw new Error("Erreur lors de la suppression.");

      toast.success("Supprimé.");
      setLocalRefs(prev => prev.filter(r => r.idRb !== id));
      setConfirmDeleteId(null);
    } catch (err) {
      toast.error("Échec de la suppression.");
    }
  };

  const handleReset = () => {
    setData(null);
    setError(null);
    setNumInscription("");
    setLocalRefs([]);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <main className="pt-12 md:pt-20 pb-20 px-4">
        <div className="max-w-xl mx-auto">
          
          <AnimatePresence mode="wait">
            {!data ? (
              <motion.div
                key="search"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-10"
              >
                <div className="text-center md:text-left">
                    <h1 className="text-3xl md:text-4xl font-light text-slate-900 mb-2">
                        Vérification références
                    </h1>
                    <p className="text-indigo-600 font-medium tracking-tight">Inscription Universitaire 2025-2026</p>
                </div>

                <form onSubmit={handleSearch} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block ml-1">
                            Numéro d'inscription 2025-2026
                        </label>
                        <div className="relative group">
                            <Input
                                placeholder="UAXXXXXFS2026XX"
                                value={numInscription}
                                onChange={(e) => setNumInscription(e.target.value)}
                                className="h-14 bg-slate-50 border-slate-200 focus:bg-white focus:ring-4 focus:ring-indigo-50/50 rounded-xl text-lg px-6 placeholder:text-slate-300 transition-all font-mono shadow-sm"
                            />
                            <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors">
                                <Search className="w-6 h-6" />
                            </div>
                        </div>
                    </div>
                    <Button 
                        type="submit" 
                        disabled={loading}
                        className="h-14 w-full bg-slate-900 hover:bg-indigo-600 text-white font-bold text-lg rounded-xl transition-all shadow-xl shadow-slate-200/50 flex items-center justify-center gap-2"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : "Vérifier"}
                    </Button>
                </form>

                {error && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-5 bg-red-50 text-red-700 text-sm flex items-center gap-3 border border-red-100 rounded-xl"
                    >
                        <AlertCircle className="w-5 h-5 shrink-0 text-red-400" />
                        <span className="font-medium">{error}</span>
                    </motion.div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="management"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-8"
              >
                {/* Back Button */}
                <button 
                    onClick={handleReset}
                    className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 transition-all text-xs font-black uppercase tracking-[0.2em]"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Nouvelle recherche</span>
                </button>

                {/* Identity */}
                <div className="pt-4 border-b border-slate-100 pb-8 text-center md:text-left">
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase mb-1">
                        {data.nom} <span className="font-light normal-case text-indigo-600">{data.prenom}</span>
                    </h2>
                    <span className="font-mono text-slate-400 text-sm bg-slate-50 px-3 py-1 rounded-full">{data.numInscription}</span>
                </div>

                {/* Pre-filled & Editable Fields */}
                <div className="space-y-10">
                    <div className="space-y-6">
                        <div className="flex items-center gap-2 text-[10px] font-black tracking-widest text-slate-400 uppercase px-1">
                            <Hash className="w-3 h-3 text-indigo-300" />
                            <span>Références bancaires</span>
                        </div>
                        
                        <div className="space-y-4">
                            {localRefs.map((ref) => (
                                <div key={ref.idRb} className="relative overflow-hidden">
                                    <AnimatePresence mode="wait">
                                        {confirmDeleteId === ref.idRb ? (
                                            <motion.div 
                                                key="confirm"
                                                initial={{ x: 50, opacity: 0 }}
                                                animate={{ x: 0, opacity: 1 }}
                                                exit={{ x: -20, opacity: 0 }}
                                                className="h-12 flex items-center justify-between px-4 bg-red-50 border border-red-100 rounded-xl"
                                            >
                                                <div className="flex items-center gap-2 text-red-600">
                                                    <AlertCircle className="w-4 h-4" />
                                                    <span className="text-xs font-bold uppercase tracking-wider">Supprimer ?</span>
                                                </div>
                                                <div className="flex gap-2">
                                                    <Button 
                                                        variant="ghost" 
                                                        size="sm"
                                                        onClick={() => setConfirmDeleteId(null)}
                                                        className="h-8 px-3 text-red-400 hover:text-red-500 hover:bg-red-100/50 text-[10px] font-black uppercase tracking-widest"
                                                    >
                                                        Annuler
                                                    </Button>
                                                    <Button 
                                                        size="sm"
                                                        onClick={() => handleDeleteReference(ref.idRb)}
                                                        className="h-8 px-4 bg-red-600 hover:bg-red-700 text-white text-[10px] font-black uppercase tracking-widest rounded-lg"
                                                    >
                                                        Confirmer
                                                    </Button>
                                                </div>
                                            </motion.div>
                                        ) : (
                                            <motion.div 
                                                key="normal"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="relative flex items-center gap-2 group"
                                            >
                                                <Input 
                                                    defaultValue={ref.reference}
                                                    onBlur={(e) => {
                                                        if (e.target.value !== ref.reference) {
                                                            handleUpdateReference(ref.idRb, e.target.value);
                                                        }
                                                    }}
                                                    className={`h-12 flex-1 px-4 ${inputStyle}`}
                                                />
                                                <div className="flex gap-1 shrink-0">
                                                    <button 
                                                        onClick={() => setConfirmDeleteId(ref.idRb)}
                                                        className="w-10 h-12 flex items-center justify-center text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                                        title="Supprimer"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                                {updatingId === ref.idRb && (
                                                    <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex items-center justify-center rounded-xl">
                                                        <Loader2 className="w-5 h-5 animate-spin text-indigo-600" />
                                                    </div>
                                                )}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* New Reference Input */}
                    <div className="pt-8 border-t border-slate-100">
                        <form onSubmit={handleAddReference} className="space-y-3">
                            <label htmlFor="new-ref" className="flex items-center gap-2 text-[10px] font-black tracking-widest text-indigo-600 uppercase cursor-pointer hover:text-indigo-500 transition-colors">
                                <Plus className="w-3 h-3" />
                                <span>Ajouter une nouvelle référence</span>
                            </label>
                            <div className="relative">
                                <Input 
                                    id="new-ref"
                                    value={newRef}
                                    onChange={(e) => setNewRef(e.target.value)}
                                    disabled={adding}
                                    className={`h-14 pr-32 px-6 ${inputStyle} border-2 border-dashed border-indigo-100 bg-indigo-50/5 focus:border-solid focus:border-indigo-500 focus:bg-white text-lg`}
                                />
                                <button 
                                    type="submit"
                                    disabled={adding || !newRef.trim()}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-indigo-600 hover:bg-indigo-700 text-white disabled:bg-slate-200 transition-all font-black text-xs uppercase tracking-widest px-6 py-2.5 rounded-lg shadow-lg shadow-indigo-100"
                                >
                                    {adding ? <Loader2 className="w-4 h-4 animate-spin" /> : "Valider"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="pt-6 flex justify-center italic text-slate-300 text-[10px] uppercase tracking-widest">
                    Les modifications sont enregistrées automatiquement.
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
