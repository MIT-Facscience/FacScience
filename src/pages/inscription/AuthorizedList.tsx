import React, { useState, useEffect } from 'react';
import {
    Search,
    Users,
    ChevronLeft,
    ChevronRight,
    AlertCircle,
    GraduationCap,
    UserCheck,
    RefreshCw
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BACKEND_ADMIN_URL } from '@/lib/api';
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { motion } from 'framer-motion';

interface AuthorizedStudent {
    id: number;
    idMpn: number;
    previousNumInscription: string;
    estRedoublant: boolean;
    dateCreation: string;
    mention: string;
    niveau: string;
    parcours: string;
    annee: string;
    studentName: string;
    statusCode: string;
}

interface ApiResponse {
    total: number;
    items: AuthorizedStudent[];
    page: number;
    pageSize: number;
}

const AuthorizedList: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<AuthorizedStudent[]>([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const pageSize = 10;

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchTerm);
            setPage(1);
        }, 500);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    const fetchAuthorizedStudents = async () => {
        setLoading(true);
        setError(null);
        try {
            const url = new URL(`${BACKEND_ADMIN_URL}/api/Import/authorized-students`);
            url.searchParams.append('page', page.toString());
            url.searchParams.append('pageSize', pageSize.toString());
            if (debouncedSearch) {
                url.searchParams.append('search', debouncedSearch);
            }

            const response = await fetch(url.toString());
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des données');
            }

            const result: ApiResponse = await response.json();
            setData(result.items);
            setTotal(result.total);
        } catch (err: any) {
            setError(err.message || 'Une erreur est survenue');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAuthorizedStudents();
    }, [page, debouncedSearch]);

    const totalPages = Math.ceil(total / pageSize);

    return (
        <div className="min-h-screen bg-slate-50/50 py-12 px-4 sm:px-6 lg:px-8 pt-16">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <Link
                        to="/admission/inscription"
                        className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center tracking-widest uppercase mb-4 transition-colors"
                    >
                        <ChevronLeft className="w-4 h-4 mr-1" /> Retour à l'inscription
                    </Link>
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
                                <UserCheck className="w-7 h-7 md:w-8 md:h-8 text-indigo-600" />
                                <span className="truncate">Liste des Autorisés</span>
                            </h1>
                            <p className="mt-1 text-sm md:text-base text-slate-500 font-medium">
                                Étudiants autorisés à s'inscrire pour l'année 2025-2026
                            </p>
                        </div>

                        <div className="relative w-full lg:w-96">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <Input
                                placeholder="Rechercher par nom ou N° Inscription..."
                                className="pl-10 bg-white border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 h-12 rounded-xl shadow-sm transition-all"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    {loading ? (
                        <>
                            {/* Desktop Table Skeleton */}
                            <div className="hidden md:block overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-slate-50 border-b border-slate-200">
                                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Mention / Parcours</th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Niveau</th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Étudiant</th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">N° Inscription</th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Statut</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {[...Array(pageSize)].map((_, idx) => (
                                            <tr key={idx}>
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-col gap-2">
                                                        <Skeleton className="h-4 w-32" />
                                                        <Skeleton className="h-3 w-48" />
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <Skeleton className="h-5 w-12 rounded-md" />
                                                </td>
                                                <td className="px-6 py-4">
                                                    <Skeleton className="h-4 w-40" />
                                                </td>
                                                <td className="px-6 py-4">
                                                    <Skeleton className="h-5 w-24 rounded" />
                                                </td>
                                                <td className="px-6 py-4 flex justify-center">
                                                    <Skeleton className="h-6 w-20 rounded-full" />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Mobile Card Skeleton */}
                            <div className="md:hidden divide-y divide-slate-100">
                                {[...Array(5)].map((_, idx) => (
                                    <div key={idx} className="p-4 space-y-4">
                                        <div className="flex justify-between items-start">
                                            <div className="flex flex-col gap-2">
                                                <Skeleton className="h-4 w-32" />
                                                <Skeleton className="h-3 w-40" />
                                            </div>
                                            <Skeleton className="h-5 w-16 rounded-full" />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4 pt-2">
                                            <div className="space-y-2">
                                                <Skeleton className="h-3 w-12" />
                                                <Skeleton className="h-4 w-24" />
                                            </div>
                                            <div className="flex flex-col items-end gap-2">
                                                <Skeleton className="h-3 w-12" />
                                                <Skeleton className="h-5 w-20" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : error ? (
                        <div className="py-24 flex flex-col items-center justify-center text-red-500 gap-3">
                            <AlertCircle className="w-10 h-10" />
                            <p className="font-medium">{error}</p>
                            <Button variant="outline" onClick={fetchAuthorizedStudents} className="mt-2">
                                <RefreshCw className="w-4 h-4 mr-2" /> Réessayer
                            </Button>
                        </div>
                    ) : data.length === 0 ? (
                        <div className="py-24 flex flex-col items-center justify-center text-slate-400 gap-3">
                            <Users className="w-12 h-12 text-slate-200" />
                            <p className="font-medium">Aucun étudiant autorisé trouvé</p>
                        </div>
                    ) : (
                        <>
                            {/* Desktop Table View */}
                            <div className="hidden md:block overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-slate-50 border-b border-slate-200">
                                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Mention / Parcours</th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Niveau</th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Étudiant</th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">N° Inscription</th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Statut</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {data.map((student, idx) => (
                                            <motion.tr
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: idx * 0.05 }}
                                                key={student.id}
                                                className="hover:bg-slate-50/50 transition-colors group"
                                            >
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                                                            <GraduationCap className="w-3.5 h-3.5 text-indigo-500" />
                                                            {student.mention}
                                                        </span>
                                                        <span className="text-[11px] font-medium text-slate-500 ml-5">
                                                            {student.parcours}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-bold bg-indigo-50 text-indigo-700">
                                                        {student.niveau}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="text-sm font-semibold text-slate-700">
                                                        {student.studentName || "Non renseigné"}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <code className="text-xs font-mono bg-slate-100 px-2 py-1 rounded text-slate-600">
                                                        {student.previousNumInscription}
                                                    </code>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <span className={cn(
                                                        "inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border",
                                                        student.statusCode === 'P' && "bg-emerald-100 text-emerald-700 border-emerald-200",
                                                        student.statusCode === 'R' && "bg-amber-100 text-amber-700 border-amber-200",
                                                        student.statusCode === 'T' && "bg-orange-100 text-orange-700 border-orange-200",
                                                        student.statusCode === 'Q' && "bg-rose-100 text-rose-700 border-rose-200",
                                                    )}>
                                                        {student.statusCode === 'P' && "Passant"}
                                                        {student.statusCode === 'R' && "Redoublant"}
                                                        {student.statusCode === 'T' && "Triplant"}
                                                        {student.statusCode === 'Q' && "Quadruplant"}
                                                    </span>
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Mobile Card View */}
                            <div className="md:hidden divide-y divide-slate-100">
                                {data.map((student, idx) => (
                                    <motion.div
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        key={student.id}
                                        className="p-4 space-y-4"
                                    >
                                        <div className="flex justify-between items-start">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                                                    <GraduationCap className="w-3.5 h-3.5 text-indigo-500" />
                                                    {student.mention}
                                                </span>
                                                <span className="text-[11px] font-medium text-slate-500 leading-tight mt-1">
                                                    {student.parcours}
                                                </span>
                                            </div>
                                            <span className={cn(
                                                "inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-tighter border",
                                                student.statusCode === 'P' && "bg-emerald-100 text-emerald-700 border-emerald-200",
                                                student.statusCode === 'R' && "bg-amber-100 text-amber-700 border-amber-200",
                                                student.statusCode === 'T' && "bg-orange-100 text-orange-700 border-orange-200",
                                                student.statusCode === 'Q' && "bg-rose-100 text-rose-700 border-rose-200",
                                            )}>
                                                {student.statusCode === 'P' && "Passant"}
                                                {student.statusCode === 'R' && "Redoublant"}
                                                {student.statusCode === 'T' && "Triplant"}
                                                {student.statusCode === 'Q' && "Quadruplant"}
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 pt-2">
                                            <div>
                                                <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Étudiant</p>
                                                <p className="text-sm font-semibold text-slate-700 leading-tight">
                                                    {student.studentName || "Non renseigné"}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Détails</p>
                                                <div className="flex flex-col items-end gap-1.5">
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-indigo-50 text-indigo-700">
                                                        {student.niveau}
                                                    </span>
                                                    <code className="text-[10px] font-mono bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">
                                                        {student.previousNumInscription}
                                                    </code>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </>
                    )}
                </div>

                {/* Pagination */}
                {total > 0 && (
                    <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-xs md:text-sm text-slate-500 font-medium order-2 sm:order-1">
                            Affichage de <span className="text-slate-900 font-bold">{Math.min(total, (page - 1) * pageSize + 1)}</span> à <span className="text-slate-900 font-bold">{Math.min(total, page * pageSize)}</span> sur <span className="text-slate-900 font-bold">{total}</span> résultats
                        </p>
                        <div className="flex items-center gap-2 order-1 sm:order-2">
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={page === 1 || loading}
                                onClick={() => setPage(p => p - 1)}
                                className="rounded-lg h-9 w-9 p-0 hover:bg-white hover:text-indigo-600 hover:border-indigo-200 shadow-sm transition-all"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </Button>
                            <div className="flex items-center px-4 h-9 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-700 shadow-sm">
                                {page} / {totalPages || 1}
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={page === totalPages || loading}
                                onClick={() => setPage(p => p + 1)}
                                className="rounded-lg h-9 w-9 p-0 hover:bg-white hover:text-indigo-600 hover:border-indigo-200 shadow-sm transition-all"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AuthorizedList;
