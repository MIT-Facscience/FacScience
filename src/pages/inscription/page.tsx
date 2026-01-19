import React, { useState } from 'react';
import {
    UserPlus,
    RefreshCcw,
    ChevronLeft,
    ArrowRight,
    Loader2,
    CheckCircle2,
    AlertCircle,
    Camera,
    Smartphone,
    Upload,
    Image as ImageIcon,
    Maximize2,
    CreditCard
} from 'lucide-react';
import Webcam from 'react-webcam';
import Cropper from 'react-easy-crop';
import { Slider } from "@/components/ui/slider";
import getCroppedImg from '@/lib/imageUtils';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { BACKEND_URL } from '@/lib/api';
import { useIsMobile } from "@/components/ui/use-mobile";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";

const studentSchema = z.object({
    nom: z.string({
        required_error: "Le nom est requis",
        invalid_type_error: "Le nom est requis"
    }).min(2, "Le nom est requis"),
    prenom: z.string().optional(),
    sexe: z.string({
        required_error: "Le sexe est requis",
        invalid_type_error: "Le sexe est requis"
    }),
    dateNaissance: z.string({
        required_error: "La date de naissance est requise",
        invalid_type_error: "La date de naissance est requise"
    }).min(1, "La date de naissance est requise"),
    lieuNaissance: z.string({
        required_error: "Le lieu de naissance est requis",
        invalid_type_error: "Le lieu de naissance est requis"
    }).min(2, "Le lieu de naissance est requis"),

    cin: z.string().min(12, "Numéro CIN invalide").max(12, "Numéro CIN invalide").optional().or(z.literal('')),
    dateDelivrance: z.string().optional(),

    adresse: z.string({
        required_error: "L'adresse est requise",
        invalid_type_error: "L'adresse est requise"
    }).min(5, "L'adresse est requise"),
    telephone: z.string({
        required_error: "Le téléphone est requis",
        invalid_type_error: "Le téléphone est requis"
    }).min(10, "Numéro de téléphone invalide"),
    email: z.string().email("Email invalide").optional().or(z.literal('')),
    referenceBancaire: z.string({
        required_error: "La référence bancaire est requise",
        invalid_type_error: "La référence bancaire est requise"
    }).min(5, "La référence bancaire est trop courte (min 5 caractères)")
        .max(20, "La référence bancaire est trop longue (max 20 caractères)"),
});

type StudentFormValues = z.infer<typeof studentSchema>;

type InscriptionStep = 'selection' | 'l1-form' | 'others-form' | 'portal-selection' | 'photo-capture' | 'bank-reference' | 'student-info';

interface EligiblePortal {
    idPortail: number;
    nomPortail: string;
    abbreviation: string;
    idPreinscription: number;
    statut: string;
}

const formSteps = [
    { id: 'identity', title: 'Identité', fields: ['nom', 'prenom', 'sexe'] },
    { id: 'birth_location', title: 'Naissance & Localisations', fields: ['dateNaissance', 'lieuNaissance', 'adresse'] },
    { id: 'cin', title: 'C.I.N', fields: ['cin', 'dateDelivrance'] },
    { id: 'contact', title: 'Contact', fields: ['telephone', 'email'] }
];

const InscriptionPage: React.FC = () => {
    const [step, setStep] = useState<InscriptionStep>('selection');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [eligiblePortals, setEligiblePortals] = useState<EligiblePortal[]>([]);
    const [selectedPortal, setSelectedPortal] = useState<EligiblePortal | null>(null);
    const [photo, setPhoto] = useState<string | null>(null); // Final cropped photo
    const [rawPhoto, setRawPhoto] = useState<string | null>(null); // Original photo for cropping

    // Crop state
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
    const [mode, setMode] = useState<'choice' | 'camera' | 'crop'>('choice');

    const [cameraError, setCameraError] = useState<boolean | string>(false);
    const webcamRef = React.useRef<Webcam>(null);
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const cameraInputRef = React.useRef<HTMLInputElement>(null); // New ref for camera

    const isMobile = useIsMobile();

    // Form states
    const [l1Data, setL1Data] = useState({ baccNum: '', baccYear: '' });
    const [othersData, setOthersData] = useState({ inscriptionNum: '' });

    // Multi-step form state
    const [formStep, setFormStep] = useState(0);

    const form = useForm<StudentFormValues>({
        resolver: zodResolver(studentSchema),
        defaultValues: {
            nom: "",
            prenom: "",
            sexe: "M",
            dateNaissance: "",
            lieuNaissance: "",
            cin: "",
            dateDelivrance: "",
            adresse: "",
            telephone: "",
            email: "",
            referenceBancaire: "",
        }
    });

    const dateNaissanceValue = form.watch("dateNaissance");

    const isMajor = React.useMemo(() => {
        if (!dateNaissanceValue) return false;
        try {
            const birth = new Date(dateNaissanceValue);
            const today = new Date();
            let age = today.getFullYear() - birth.getFullYear();
            const m = today.getMonth() - birth.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
                age--;
            }
            return age >= 18;
        } catch (e) {
            return false;
        }
    }, [dateNaissanceValue]);

    const activeSteps = React.useMemo(() => {
        return formSteps.filter(step => step.id !== 'cin' || isMajor);
    }, [isMajor]);

    const nextFormStep = async () => {
        const fields = activeSteps[formStep].fields as any[];
        const output = await form.trigger(fields);
        if (output) {
            setFormStep(s => Math.min(s + 1, activeSteps.length - 1));
        }
    };

    const prevFormStep = () => {
        setFormStep(s => Math.max(s - 1, 0));
    };

    const handleBack = () => {
        if (step === 'student-info') {
            if (formStep > 0) {
                prevFormStep();
                return;
            }
            setStep('bank-reference');
        } else if (step === 'bank-reference') {
            setStep('photo-capture');
            setMode('choice');
        } else if (step === 'photo-capture') {
            if (mode === 'crop') {
                setMode('choice');
                setRawPhoto(null);
            } else if (mode === 'camera') {
                setMode('choice');
            } else {
                setStep('portal-selection');
            }
        } else if (step === 'portal-selection') {
            setStep('l1-form');
        } else {
            setStep('selection');
        }
        setError(null);
    };

    const handlePortalSelect = (portal: EligiblePortal) => {
        setSelectedPortal(portal);
        setStep('photo-capture');
        setMode('choice');
    };

    const capture = React.useCallback(() => {
        const imageSrc = webcamRef.current?.getScreenshot();
        if (imageSrc) {
            setRawPhoto(imageSrc);
            setMode('crop');
        }
    }, [webcamRef]);

    const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
        setCroppedAreaPixels(croppedAreaPixels);
    };

    const handleCropValidation = async () => {
        if (rawPhoto && croppedAreaPixels) {
            try {
                const croppedImage = await getCroppedImg(rawPhoto, croppedAreaPixels);
                if (croppedImage) {
                    setPhoto(croppedImage);
                    setRawPhoto(null);
                    setMode('choice');
                    setStep('bank-reference');
                }
            } catch (e) {
                console.error(e);
            }
        }
    };

    const onStudentInfoSubmit = async (data: StudentFormValues) => {
        // Double check we are on the last step
        if (formStep !== activeSteps.length - 1) {
            return;
        }

        setIsLoading(true);
        try {
            const payload = {
                // L1 / Others
                numBacc: l1Data.baccNum || undefined,
                anneeBacc: l1Data.baccYear ? parseInt(l1Data.baccYear) : undefined,
                numInscription: othersData.inscriptionNum || undefined,

                // Selection
                idPortail: selectedPortal?.idPortail || 0,

                // Photo
                photoBase64: photo,

                // Identité
                nom: data.nom,
                prenom: data.prenom,
                sexe: data.sexe,
                dateNaissance: data.dateNaissance,
                lieuNaissance: data.lieuNaissance,

                // CIN
                cin: data.cin || undefined,
                dateDelivrance: data.dateDelivrance || undefined,

                // Contact
                adresse: data.adresse,
                telephone: data.telephone,
                email: data.email,

                // Bank Ref
                referenceBancaire: data.referenceBancaire,

                anneeUniversitaire: "2025-2026"
            };

            const response = await fetch(`${BACKEND_URL}/api/inscription/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorText = await response.text(); // Use text() as some errors might not be JSON
                throw new Error(errorText || "Erreur lors de l'inscription");
            }

            const result = await response.json();
            alert("Inscription réussie !");
            window.location.reload();

        } catch (error: any) {
            console.error("Erreur de soumission :", error);
            alert("Erreur: " + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleRetake = () => {
        setPhoto(null);
        setRawPhoto(null);
        setMode('choice');
        setCameraError(false);
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.addEventListener('load', () => {
                setRawPhoto(reader.result as string);
                setMode('crop');
            });
            reader.readAsDataURL(file);
        }
        // Reset input so same file can be selected again
        e.target.value = '';
    };

    const triggerNativeCamera = () => {
        cameraInputRef.current?.click();
    };

    const compressImage = async (base64Str: string, maxSizeKB: number = 300): Promise<string> => {
        return new Promise((resolve) => {
            const img = new Image();
            img.src = base64Str;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;

                // Maintain aspect ratio
                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext('2d');
                ctx?.drawImage(img, 0, 0, width, height);

                let quality = 0.9;
                let compressedBase64 = canvas.toDataURL('image/jpeg', quality);

                // Iteratively reduce quality if still over size
                while (compressedBase64.length / 1024 > maxSizeKB && quality > 0.1) {
                    quality -= 0.1;
                    compressedBase64 = canvas.toDataURL('image/jpeg', quality);
                }

                resolve(compressedBase64);
            };
        });
    };

    // Background compression when photo is set
    React.useEffect(() => {
        if (photo && photo.length / 1024 > 300) {
            compressImage(photo).then(compressed => {
                setPhoto(compressed);
            });
        }
    }, [photo]);

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
            // The API now returns { portals: [], studentInfo: { ... } }
            setEligiblePortals(data.portals || []);

            if (data.studentInfo) {
                const { nomPrenom, sexe, dateNaissance, lieuNaissance, email, tel } = data.studentInfo;

                // Simple split: first word as Nom, the rest as Prenom
                const nameParts = (nomPrenom || "").trim().split(/\s+/);
                const nom = nameParts[0] || "";
                const prenom = nameParts.slice(1).join(" ") || "";

                form.setValue("nom", nom);
                form.setValue("prenom", prenom);
                form.setValue("sexe", sexe || "M");
                form.setValue("dateNaissance", dateNaissance || "");
                form.setValue("lieuNaissance", lieuNaissance || "");
                const finalEmail = (email && email.toLowerCase() === "scitechscolarite@gmail.com") ? "" : (email || "");
                form.setValue("email", finalEmail);
                form.setValue("telephone", tel || "");
            }

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
                                    Identification
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
                                        onClick={() => handlePortalSelect(portal)}
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
                                                        {portal.statut.toLowerCase().includes('admissible') ? 'Admissible' : portal.statut}
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

                    {step === 'photo-capture' && (
                        <motion.div
                            key="photo-capture"
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
                                    <ChevronLeft className="w-3 h-3 mr-1" /> RETOUR
                                </button>
                                <h1 className="text-xl sm:text-2xl font-bold text-slate-800">
                                    Photo d'identité
                                </h1>
                                <p className="text-slate-400 text-xs mt-1">
                                    Prenez une photo pour la carte d'étudiant du candidat au portail <span className="font-bold text-indigo-600">{selectedPortal?.abbreviation}</span>
                                </p>
                            </div>

                            <div className="flex flex-col items-center justify-center min-h-[400px]">
                                <input
                                    type="file"
                                    accept="image/*"
                                    ref={fileInputRef}
                                    className="hidden"
                                    onChange={handleFileUpload}
                                />
                                <input
                                    type="file"
                                    accept="image/*"
                                    capture="user"
                                    ref={cameraInputRef}
                                    className="hidden"
                                    onChange={handleFileUpload}
                                />

                                {!photo && !rawPhoto && (
                                    <>
                                        {mode === 'choice' && (
                                            <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                                                <button
                                                    onClick={() => isMobile ? triggerNativeCamera() : setMode('camera')}
                                                    className="flex flex-col items-center justify-center p-8 rounded-2xl border-2 border-slate-100 bg-slate-50 hover:border-indigo-500 hover:bg-indigo-50 transition-all gap-4 group"
                                                >
                                                    <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                                                        <Camera className="w-8 h-8 text-indigo-600" />
                                                    </div>
                                                    <span className="font-bold text-slate-700">Prendre une photo</span>
                                                </button>

                                                <button
                                                    onClick={() => fileInputRef.current?.click()}
                                                    className="flex flex-col items-center justify-center p-8 rounded-2xl border-2 border-slate-100 bg-slate-50 hover:border-emerald-500 hover:bg-emerald-50 transition-all gap-4 group"
                                                >
                                                    <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                                                        <ImageIcon className="w-8 h-8 text-emerald-600" />
                                                    </div>
                                                    <span className="font-bold text-slate-700">Importer / Galerie</span>
                                                </button>
                                            </div>
                                        )}

                                        {mode === 'camera' && (
                                            <div className="flex flex-col items-center gap-6 w-full">
                                                <div className="relative w-full max-w-[320px] aspect-[4/5] bg-slate-900 rounded-2xl overflow-hidden shadow-2xl ring-4 ring-slate-100">
                                                    {!cameraError ? (
                                                        <Webcam
                                                            audio={false}
                                                            ref={webcamRef}
                                                            screenshotFormat="image/jpeg"
                                                            videoConstraints={{
                                                                facingMode: "user"
                                                            }}
                                                            onUserMediaError={(err) => {
                                                                console.error("Erreur caméra :", err);
                                                                // Extract error name or message
                                                                const errorMessage = typeof err === 'string' ? err : (err as any).name || (err as any).message || "Erreur inconnue";
                                                                setCameraError(errorMessage); // We'll need to change setCameraError type or state
                                                            }}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-slate-400 bg-slate-800">
                                                            <Camera className="w-12 h-12 mb-4 opacity-50" />
                                                            <p className="text-sm text-center font-bold text-slate-300">Caméra inaccessible</p>
                                                            <p className="text-xs text-center text-slate-500 mt-1 mb-4 max-w-[200px] break-words">
                                                                {typeof cameraError === 'string' ? cameraError : "Vérifiez vos permissions"}
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                                <Button
                                                    onClick={capture}
                                                    disabled={cameraError}
                                                    className="w-full max-w-xs bg-indigo-600 hover:bg-indigo-700 text-white h-12 rounded-xl font-bold transition-all shadow-lg shadow-indigo-200"
                                                >
                                                    <Camera className="w-5 h-5 mr-2" />
                                                    Capturer
                                                </Button>
                                            </div>
                                        )}
                                    </>
                                )}

                                {rawPhoto && mode === 'crop' && (
                                    <div className="w-full flex flex-col items-center gap-6">
                                        <div className="relative w-full max-w-[300px] h-[300px] bg-slate-900 rounded-xl overflow-hidden shadow-2xl ring-4 ring-slate-100">
                                            <Cropper
                                                image={rawPhoto}
                                                crop={crop}
                                                zoom={zoom}
                                                aspect={1}
                                                onCropChange={setCrop}
                                                onCropComplete={onCropComplete}
                                                onZoomChange={setZoom}
                                            />
                                        </div>
                                        <div className="w-full max-w-[300px] px-4">
                                            <div className="flex items-center gap-2 mb-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                                                <Maximize2 className="w-3 h-3" /> Zoom
                                            </div>
                                            <Slider
                                                value={[zoom]}
                                                min={1}
                                                max={3}
                                                step={0.1}
                                                onValueChange={(value) => setZoom(value[0])}
                                                className="w-full"
                                            />
                                        </div>
                                        <Button
                                            onClick={handleCropValidation}
                                            className="w-full max-w-xs bg-emerald-500 hover:bg-emerald-600 text-white h-12 rounded-xl font-bold shadow-lg shadow-emerald-200"
                                        >
                                            <CheckCircle2 className="w-5 h-5 mr-2" />
                                            Valider la photo
                                        </Button>
                                    </div>
                                )}

                                {photo && (
                                    <div className="flex flex-col items-center gap-6">
                                        <div className="relative w-40 h-40 rounded-full overflow-hidden shadow-2xl ring-4 ring-emerald-100">
                                            <img src={photo} alt="Final" className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex gap-2 w-full max-w-xs">
                                            <Button
                                                onClick={handleRetake}
                                                variant="outline"
                                                className="flex-1 border-slate-200 hover:bg-slate-50 text-slate-700 h-11 rounded-xl font-bold"
                                            >
                                                <RefreshCcw className="w-4 h-4 mr-2" />
                                                Changer
                                            </Button>
                                            <Button
                                                onClick={() => setStep('bank-reference')}
                                                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white h-11 rounded-xl font-bold shadow-md shadow-indigo-100"
                                            >
                                                <CheckCircle2 className="w-5 h-5 mr-2" />
                                                Continuer
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}

                    {/* Bank Reference Step - Concis */}
                    {step === 'bank-reference' && (
                        <motion.div
                            key="bank-reference"
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            variants={containerVariants}
                            className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden"
                        >
                            <div className="p-6 sm:p-8 text-center sm:text-left">
                                <button
                                    onClick={handleBack}
                                    className="text-[10px] text-indigo-500 hover:text-indigo-600 flex items-center font-black tracking-widest mb-4 sm:mb-6 transition-colors mx-auto sm:mx-0"
                                >
                                    <ChevronLeft className="w-3 h-3 mr-1" /> PHOTO
                                </button>
                                <h1 className="text-xl sm:text-2xl font-bold text-slate-800 mb-2">
                                    Référence de Paiement
                                </h1>
                                <p className="text-slate-400 text-xs mb-8">
                                    Saisissez le numéro sur votre reçu de versement.
                                </p>

                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <Label className="text-xs font-bold text-slate-700">Numéro de Référence *</Label>
                                        <div className="relative">
                                            <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                            <Input
                                                placeholder="ABCDEF/CUK"
                                                className="pl-10 h-12 bg-slate-50 border-slate-200 focus:bg-white transition-all rounded-xl text-slate-600 placeholder:text-slate-400/50"
                                                value={form.watch("referenceBancaire")}
                                                onChange={(e) => form.setValue("referenceBancaire", e.target.value)}
                                            />
                                        </div>
                                        {form.formState.errors.referenceBancaire && (
                                            <p className="text-red-500 text-[10px] font-medium mt-1">
                                                {form.formState.errors.referenceBancaire.message}
                                            </p>
                                        )}
                                    </div>

                                    <Button
                                        onClick={async () => {
                                            const isValid = await form.trigger("referenceBancaire");
                                            if (isValid) setStep('student-info');
                                        }}
                                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold h-12 rounded-xl shadow-lg shadow-indigo-100 transition-all active:scale-[0.98]"
                                    >
                                        Continuer <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {step === 'student-info' && (
                        <motion.div
                            key="student-info"
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
                                    <ChevronLeft className="w-3 h-3 mr-1" /> RETOUR
                                </button>
                                <h1 className="text-xl sm:text-2xl font-bold text-slate-800">
                                    {activeSteps[formStep].title}
                                </h1>
                                <p className="text-slate-400 text-xs mt-1">
                                    Étape {formStep + 1} sur {activeSteps.length}
                                </p>

                                {/* Progress Bar */}
                                <div className="w-full bg-slate-100 h-1 mt-4 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-indigo-500 transition-all duration-300 ease-out"
                                        style={{ width: `${((formStep + 1) / activeSteps.length) * 100}%` }}
                                    />
                                </div>
                            </div>

                            <ScrollArea className="h-[50vh] pr-4 -mr-4">
                                <Form {...form}>
                                    <form
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            // Real submission is handled by onClick to avoid premature triggers
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                if (formStep < activeSteps.length - 1) {
                                                    nextFormStep();
                                                } else {
                                                    form.handleSubmit(onStudentInfoSubmit)();
                                                }
                                            }
                                        }}
                                        className="space-y-6"
                                    >

                                        {/* Identité */}
                                        {activeSteps[formStep].id === 'identity' && (
                                            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                                                <h3 className="text-sm font-bold text-indigo-600 uppercase tracking-wider flex items-center gap-2">
                                                    <UserPlus className="w-4 h-4" /> Identité
                                                </h3>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    <FormField
                                                        control={form.control}
                                                        name="nom"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel className="text-xs">Nom *</FormLabel>
                                                                <FormControl>
                                                                    <Input placeholder="Nom" {...field} className="bg-slate-50 border-slate-200 placeholder:text-slate-400/50" />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <FormField
                                                        control={form.control}
                                                        name="prenom"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel className="text-xs">Prénoms</FormLabel>
                                                                <FormControl>
                                                                    <Input placeholder="Prénoms" {...field} className="bg-slate-50 border-slate-200 placeholder:text-slate-400/50" />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <FormField
                                                        control={form.control}
                                                        name="sexe"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel className="text-xs">Sexe *</FormLabel>
                                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                    <FormControl>
                                                                        <SelectTrigger className="bg-slate-50 border-slate-200">
                                                                            <SelectValue placeholder="Séléctionner" />
                                                                        </SelectTrigger>
                                                                    </FormControl>
                                                                    <SelectContent>
                                                                        <SelectItem value="M">Masculin</SelectItem>
                                                                        <SelectItem value="F">Féminin</SelectItem>
                                                                    </SelectContent>
                                                                </Select>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        {/* Naissance & Localisation */}
                                        {activeSteps[formStep].id === 'birth_location' && (
                                            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                                                <h3 className="text-sm font-bold text-indigo-600 uppercase tracking-wider flex items-center gap-2">
                                                    <UserPlus className="w-4 h-4" /> Naissance & Localisation
                                                </h3>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-slate-50 pb-4">
                                                    <FormField
                                                        control={form.control}
                                                        name="dateNaissance"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel className="text-xs">Date de naissance *</FormLabel>
                                                                <FormControl>
                                                                    <Input type="date" {...field} className="bg-slate-50 border-slate-200" />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <FormField
                                                        control={form.control}
                                                        name="lieuNaissance"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel className="text-xs">Lieu de naissance *</FormLabel>
                                                                <FormControl>
                                                                    <Input placeholder="Ville / Commune" {...field} className="bg-slate-50 border-slate-200 placeholder:text-slate-400/50" />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    <FormField
                                                        control={form.control}
                                                        name="adresse"
                                                        render={({ field }) => (
                                                            <FormItem className="sm:col-span-2">
                                                                <FormLabel className="text-xs">Adresse actuelle *</FormLabel>
                                                                <FormControl>
                                                                    <Input
                                                                        placeholder="Lot / Logement"
                                                                        {...field}
                                                                        className="bg-slate-50 border-slate-200 placeholder:text-slate-400/50"
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        {/* CIN */}
                                        {activeSteps[formStep].id === 'cin' && (
                                            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                                                <h3 className="text-sm font-bold text-indigo-600 uppercase tracking-wider flex items-center gap-2">
                                                    <AlertCircle className="w-4 h-4" /> C.I.N
                                                </h3>
                                                <div className="p-4 bg-blue-50 text-blue-700 text-xs rounded-lg mb-4">
                                                    Le numéro CIN est obligatoire pour les étudiants majeurs.
                                                </div>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    <FormField
                                                        control={form.control}
                                                        name="cin"
                                                        render={({ field }) => (
                                                            <FormItem className="sm:col-span-2">
                                                                <FormLabel className="text-xs">Numéro CIN</FormLabel>
                                                                <FormControl>
                                                                    <Input placeholder="12 Chiffres" maxLength={12} {...field} className="bg-slate-50 border-slate-200 placeholder:text-slate-400/50" />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <FormField
                                                        control={form.control}
                                                        name="dateDelivrance"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel className="text-xs">Délivré le</FormLabel>
                                                                <FormControl>
                                                                    <Input type="date" {...field} className="bg-slate-50 border-slate-200" />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                        )}


                                        {/* Contact */}
                                        {activeSteps[formStep].id === 'contact' && (
                                            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                                                <h3 className="text-sm font-bold text-indigo-600 uppercase tracking-wider flex items-center gap-2">
                                                    <Smartphone className="w-4 h-4" /> Contact
                                                </h3>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    <FormField
                                                        control={form.control}
                                                        name="telephone"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel className="text-xs">Téléphone Personnel *</FormLabel>
                                                                <FormControl>
                                                                    <Input type="tel" placeholder="03x xx xxx xx" {...field} className="bg-slate-50 border-slate-200 placeholder:text-slate-400/50" />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <FormField
                                                        control={form.control}
                                                        name="email"
                                                        render={({ field }) => (
                                                            <FormItem className="sm:col-span-2">
                                                                <FormLabel className="text-xs">Email Personnel</FormLabel>
                                                                <FormControl>
                                                                    <Input type="email" placeholder="exemple@gmail.com" {...field} className="bg-slate-50 border-slate-200 placeholder:text-slate-400/50" />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        <div className="flex gap-4 pt-4">
                                            {formStep === activeSteps.length - 1 ? (
                                                <Button
                                                    type="button"
                                                    onClick={() => form.handleSubmit(onStudentInfoSubmit)()}
                                                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold h-12 rounded-lg shadow-lg shadow-indigo-200"
                                                >
                                                    <CheckCircle2 className="w-5 h-5 mr-2" />
                                                    Terminer l'inscription
                                                </Button>
                                            ) : (
                                                <Button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        nextFormStep();
                                                    }}
                                                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold h-12 rounded-lg"
                                                >
                                                    Étape Suivante <ArrowRight className="w-4 h-4 ml-2" />
                                                </Button>
                                            )}
                                        </div>
                                    </form>
                                </Form>
                            </ScrollArea>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default InscriptionPage;
