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
    Image as ImageIcon,
    Maximize2,
    CreditCard
} from 'lucide-react';
import Webcam from 'react-webcam';
import Cropper from 'react-easy-crop';
import { Slider } from "@/components/ui/slider";
import getCroppedImg from '@/lib/imageUtils';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { BACKEND_ADMIN_URL } from '@/lib/api';
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
    nom: z.string().min(2, "Le nom est requis"),
    prenom: z.string().optional(),
    sexe: z.string().min(1, "Le sexe est requis"),
    dateNaissance: z.string().min(1, "La date de naissance est requise"),
    lieuNaissance: z.string().min(2, "Le lieu de naissance est requis"),

    cin: z.string().min(10, "Numéro CIN invalide").max(20, "Numéro CIN invalide").optional().or(z.literal('')),
    dateDelivrance: z.string().optional(),

    adresse: z.string().min(5, "L'adresse est requise"),
    telephone: z.string().min(10, "Numéro de téléphone invalide"),
    email: z.string().email("Email invalide").optional().or(z.literal('')),
    referenceAdmin: z.string().optional(),
    referencePedago: z.string().optional(),
    referenceMixte: z.string().optional(),
    referenceBancaire: z.string().optional(), // Keep for legacy if needed, or remove
}).superRefine((data, ctx) => {
    const hasAdmin = !!data.referenceAdmin && data.referenceAdmin.length >= 3;
    const hasMixte = !!data.referenceMixte && data.referenceMixte.length >= 3;

    if (!hasAdmin && !hasMixte) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "La référence Administrative (ou Mixte) est obligatoire.",
            path: ["referenceAdmin"],
        });
    }
});

type StudentFormValues = z.infer<typeof studentSchema>;

type InscriptionStep = 'selection' | 'l1-form' | 'l1-pro-form' | 'others-form' | 'others-portal-selection' | 'portal-selection' | 'bank-reference' | 'photo-capture' | 'identity-documents' | 'student-info' | 'success';

interface EligiblePortal {
    idPortail: number;
    nomPortail: string;
    abbreviation: string;
    mention?: string;
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
    const [flow, setFlow] = useState<'l1-acad' | 'l1-pro' | 'others' | null>(null);
    const [eligiblePortals, setEligiblePortals] = useState<EligiblePortal[]>([]);
    const [authorizedPortals, setAuthorizedPortals] = useState<any[]>([]);
    const [selectedPortal, setSelectedPortal] = useState<EligiblePortal | null>(null);
    const [photo, setPhoto] = useState<string | null>(null); // Final cropped photo
    const [rawPhoto, setRawPhoto] = useState<string | null>(null); // Original photo for cropping
    const [enrollmentResult, setEnrollmentResult] = useState<{ numInscription: string, nomPortail?: string, statut?: string } | null>(null);

    // Identity document state
    const [cinRectoImage, setCinRectoImage] = useState<string | null>(null);
    const [cinVersoImage, setCinVersoImage] = useState<string | null>(null);
    const [acteNaissanceImage, setActeNaissanceImage] = useState<string | null>(null);
    const [hasNoCin, setHasNoCin] = useState(false);

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
    const [reenrollmentData, setReenrollmentData] = useState<{ idEtudiant: number, idMpn: number, codeRedoublement?: string } | null>(null);

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
            referenceAdmin: "",
            referencePedago: "",
            referenceMixte: "",
            referenceBancaire: "",
        }
    });

    const referenceAdminValue = form.watch("referenceAdmin");
    const referencePedagoValue = form.watch("referencePedago");
    const referenceMixteValue = form.watch("referenceMixte");

    const isMixteDisabled = (!!referenceAdminValue && referenceAdminValue.length > 0) || (!!referencePedagoValue && referencePedagoValue.length > 0);
    const isSeparateDisabled = !!referenceMixteValue && referenceMixteValue.length > 0;

    const dateNaissanceValue = form.watch("dateNaissance");

    const isMajor = React.useMemo(() => {
        if (!dateNaissanceValue) return true;
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
        return formSteps.filter(step => {
            if (step.id === 'cin') return isMajor && !hasNoCin;
            return true;
        });
    }, [isMajor, hasNoCin]);

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
            setStep('identity-documents');
        } else if (step === 'identity-documents') {
            setStep('photo-capture');
            setMode('choice');
        } else if (step === 'photo-capture') {
            if (mode === 'crop') {
                setMode('choice');
                setRawPhoto(null);
            } else if (mode === 'camera') {
                setMode('choice');
            } else {
                setStep('bank-reference');
            }
        } else if (step === 'bank-reference') {
            if (flow === 'others') {
                setStep(authorizedPortals.length > 1 ? 'others-portal-selection' : 'others-form');
            } else {
                setStep('portal-selection');
            }
        } else if (step === 'portal-selection') {
            setStep(flow === 'l1-pro' ? 'l1-pro-form' : 'l1-form');
        } else if (step === 'others-portal-selection') {
            setStep('others-form');
        } else {
            setStep('selection');
            setFlow(null);
        }
        setError(null);
    };

    const handlePortalSelect = (portal: EligiblePortal | any) => {
        setSelectedPortal(portal);
        if (portal.idMpn) {
            setReenrollmentData({
                idEtudiant: reenrollmentData?.idEtudiant || 0,
                idMpn: portal.idMpn,
                codeRedoublement: portal.nextCode
            });
        }
        setStep('bank-reference');
    };

    const capture = React.useCallback(() => {
        const imageSrc = webcamRef.current?.getScreenshot();
        if (imageSrc) {
            setRawPhoto(imageSrc);
            setMode('crop');
        }
    }, [webcamRef]);

    const onCropComplete = (_croppedArea: any, croppedAreaPixels: any) => {
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
                    setStep('identity-documents');
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
        setError(null);
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
                cin: (!hasNoCin && data.cin) ? data.cin : undefined,
                dateDelivrance: (!hasNoCin && data.dateDelivrance) ? data.dateDelivrance : undefined,

                // Identity Documents
                cinRectoBase64: (!hasNoCin && isMajor) ? cinRectoImage : undefined,
                cinVersoBase64: (!hasNoCin && isMajor) ? cinVersoImage : undefined,
                acteNaissanceBase64: (hasNoCin || !isMajor) ? acteNaissanceImage : undefined,

                // Contact
                adresse: data.adresse,
                telephone: data.telephone,
                email: data.email,

                // Bank Ref
                referenceAdmin: data.referenceAdmin,
                referencePedago: data.referencePedago,
                referenceMixte: data.referenceMixte,
                referenceBancaire: data.referenceBancaire,

                anneeUniversitaire: "2025-2026",
                idEtudiant: reenrollmentData?.idEtudiant,
                idMpn: reenrollmentData?.idMpn,
                codeRedoublement: reenrollmentData?.codeRedoublement
            };

            const response = await fetch(`${BACKEND_ADMIN_URL}/api/inscription/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorText = await response.text();

                // Handle duplicate enrollment
                if (response.status === 409) {
                    try {
                        const conflictData = JSON.parse(errorText);
                        setEnrollmentResult({
                            numInscription: conflictData.numInscription,
                            nomPortail: conflictData.nomPortail
                        });
                        toast.success("Vous êtes déjà inscrit !");
                        setStep('success');
                        return;
                    } catch (e) {
                        // fallback to generic error if JSON parse fails
                    }
                }

                throw new Error(errorText || "Erreur lors de l'inscription");
            }

            const result = await response.json();
            setEnrollmentResult({
                numInscription: result.numInscription,
                nomPortail: result.nomPortail,
                statut: result.statut
            });
            toast.success("Inscription réussie !");
            setStep('success');

        } catch (error: any) {
            console.error("Erreur de soumission :", error);
            const msg = error.message || "Une erreur est survenue lors de la soumission.";
            setError(msg);
            toast.error(msg);
            // Move back to first form step if error on fields might be there, 
            // but for now let's stay on current step to show the error message.
            // setFormStep(0); 
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

    const triggerFileUpload = (onFileRead: (result: string) => void) => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.style.display = 'none';

        const handleChange = (e: Event) => {
            const target = e.target as HTMLInputElement;
            const file = target.files?.[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                    onFileRead(reader.result as string);
                };
                reader.readAsDataURL(file);
            }
            // Cleanup: remove from DOM and remove listener
            input.removeEventListener('change', handleChange);
            if (document.body.contains(input)) {
                document.body.removeChild(input);
            }
        };

        input.addEventListener('change', handleChange);
        document.body.appendChild(input);
        input.click();
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
        setFlow('l1-acad');
        if (!l1Data.baccNum || !l1Data.baccYear) {
            setError("Veuillez remplir tous les champs.");
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`${BACKEND_ADMIN_URL}/api/Inscription/verify-l1?numBacc=${encodeURIComponent(l1Data.baccNum)}&anneeBacc=${encodeURIComponent(l1Data.baccYear)}`);

            if (!response.ok) {
                if (response.status === 409) {
                    const conflictData = await response.json();
                    setEnrollmentResult({
                        numInscription: conflictData.numInscription,
                        nomPortail: conflictData.nomPortail
                    });
                    setStep('success');
                    return;
                }
                if (response.status === 404) {
                    throw new Error("Aucune sélection trouvée pour ces informations. Vérifiez votre numéro et année de Bacc.");
                }
                const errorText = await response.text();
                throw new Error(errorText || "Une erreur est survenue lors de la vérification.");
            }

            const data = await response.json();

            if (!data || !data.portals || data.portals.length === 0) {
                throw new Error("Aucun portail disponible n'a été trouvé pour votre sélection. Veuillez contacter le service de scolarité.");
            }

            setEligiblePortals(data.portals);

            if (data.studentInfo) {
                const { nomPrenom, sexe, dateNaissance, lieuNaissance, email, tel } = data.studentInfo;

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
                const formattedTel = (tel && !tel.startsWith('0')) ? `0${tel}` : (tel || "");
                form.setValue("telephone", formattedTel);
                if (data.studentInfo.dateDelivrance) {
                    form.setValue("dateDelivrance", data.studentInfo.dateDelivrance);
                }
            }

            setStep('portal-selection');
        } catch (err: any) {
            console.error("L1 Verification Error:", err);
            setError(err.message || "Une erreur inattendue est survenue.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleL1ProSubmit = async () => {
        setFlow('l1-pro');
        if (!l1Data.baccNum || !l1Data.baccYear) {
            setError("Veuillez remplir tous les champs.");
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`${BACKEND_ADMIN_URL}/api/Inscription/verify-l1-pro?numBacc=${encodeURIComponent(l1Data.baccNum)}&anneeBacc=${encodeURIComponent(l1Data.baccYear)}`);

            if (!response.ok) {
                if (response.status === 409) {
                    const conflictData = await response.json();
                    setEnrollmentResult({
                        numInscription: conflictData.numInscription,
                        nomPortail: conflictData.nomPortail
                    });
                    setStep('success');
                    return;
                }
                if (response.status === 404) {
                    throw new Error("Aucune autorisation professionnelle trouvée pour ces informations. Vérifiez votre numéro et année de Bacc.");
                }
                const errorText = await response.text();
                throw new Error(errorText || "Une erreur est survenue lors de la vérification.");
            }

            const data = await response.json();

            if (!data || !data.portals || data.portals.length === 0) {
                throw new Error("Aucun parcours disponible n'a été trouvé pour votre autorisation.");
            }

            // Map portals to Match the selection step
            const mappedPortals = data.portals.map((p: any) => ({
                idPortail: 0, // Not strictly needed for pro if we use idMpn
                idMpn: p.idMpn,
                nomPortail: p.nomPortail,
                abbreviation: p.abbreviation,
                mention: p.mention,
                idPreinscription: 0,
                statut: p.statut
            }));

            setEligiblePortals(mappedPortals);

            if (data.studentInfo) {
                const { nomPrenom, sexe, dateNaissance, lieuNaissance, idEtudiant } = data.studentInfo;

                const nameParts = (nomPrenom || "").trim().split(/\s+/);
                const nom = nameParts[0] || "";
                const prenom = nameParts.slice(1).join(" ") || "";

                form.setValue("nom", nom);
                form.setValue("prenom", prenom);
                form.setValue("sexe", sexe || "M");
                form.setValue("dateNaissance", dateNaissance || "");
                form.setValue("lieuNaissance", lieuNaissance || "");

                setReenrollmentData({
                    idEtudiant: idEtudiant,
                    idMpn: 0, // Will be set on portal selection
                });
            }

            setStep('portal-selection');
        } catch (err: any) {
            console.error("L1 Pro Verification Error:", err);
            setError(err.message || "Une erreur inattendue est survenue.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleOthersSubmit = async () => {
        setFlow('others');
        if (!othersData.inscriptionNum) {
            setError("Veuillez entrer votre numéro d'inscription 2024-2025.");
            return;
        }
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(`${BACKEND_ADMIN_URL}/api/Inscription/verify-reinscription?numInscription=${encodeURIComponent(othersData.inscriptionNum)}`);
            if (!response.ok) {
                if (response.status === 409) {
                    const conflictData = await response.json();
                    setEnrollmentResult({
                        numInscription: conflictData.numInscription,
                        nomPortail: conflictData.nomPortail
                    });
                    setStep('success');
                    return;
                }
                const errorText = await response.text();
                throw new Error(errorText || "Numéro d'inscription non reconnu ou non autorisé pour 2025-2026.");
            }

            const data = await response.json();

            const { studentInfo, authorizedPortals: portals } = data;
            form.setValue("nom", studentInfo.nom || "");
            form.setValue("prenom", studentInfo.prenom || "");
            form.setValue("sexe", studentInfo.sexe || "M");
            form.setValue("dateNaissance", studentInfo.dateNaissance || "");
            form.setValue("lieuNaissance", studentInfo.lieuNaissance || "");
            form.setValue("cin", studentInfo.cin || "");
            form.setValue("dateDelivrance", studentInfo.dateDelivrance || "");
            form.setValue("email", studentInfo.email || "");
            const formattedTel = (studentInfo.tel && !studentInfo.tel.startsWith('0')) ? `0${studentInfo.tel}` : (studentInfo.tel || "");
            form.setValue("telephone", formattedTel);
            form.setValue("adresse", studentInfo.adresse || "");

            if (studentInfo.photoBase64) {
                setPhoto(studentInfo.photoBase64);
            }

            setAuthorizedPortals(portals);

            // Re-enrollment data structure (temp storage until portal chosen)
            setReenrollmentData({
                idEtudiant: studentInfo.idEtudiant,
                idMpn: portals[0].idMpn, // Default
                codeRedoublement: portals[0].nextCode
            });

            if (portals.length > 1) {
                setStep('others-portal-selection');
            } else {
                const authorizedPortal = portals[0];
                setSelectedPortal({
                    idPortail: 0,
                    nomPortail: authorizedPortal.nomPortail,
                    abbreviation: authorizedPortal.abbreviation,
                    idPreinscription: 0,
                    statut: authorizedPortal.statusLibelle || (authorizedPortal.estRedoublant ? "Autorisé à redoubler" : "Autorisé à s'inscrire")
                });
                setStep('bank-reference');
            }
        } catch (err: any) {
            console.error("Re-enrollment Verification Error:", err);
            setError(err.message || "Une erreur inattendue est survenue.");
        } finally {
            setIsLoading(false);
        }
    };

    const containerVariants: Variants = {
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
                                    onClick={() => { setStep('l1-form'); setFlow('l1-acad'); }}
                                    className="w-full flex items-center justify-between p-5 rounded-lg border border-slate-100 bg-slate-50 hover:bg-indigo-50 hover:border-indigo-200 transition-all group text-left"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="p-2.5 bg-indigo-500 rounded-md text-white font-bold group-hover:scale-110 transition-transform shadow-md shadow-indigo-100">
                                            <UserPlus className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="font-bold text-slate-700">L1 Académique</div>
                                            <div className="text-xs text-slate-400 font-medium">Bacheliers séléctionnés</div>
                                        </div>
                                    </div>
                                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                                </button>

                                <button
                                    onClick={() => { setStep('l1-pro-form'); setFlow('l1-pro'); }}
                                    className="w-full flex items-center justify-between p-5 rounded-lg border border-slate-100 bg-slate-50 hover:bg-amber-50 hover:border-amber-200 transition-all group text-left"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="p-2.5 bg-amber-500 rounded-md text-white font-bold group-hover:scale-110 transition-transform shadow-md shadow-amber-100">
                                            <UserPlus className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="font-bold text-slate-700">L1 Professionalisante</div>
                                            <div className="text-xs text-slate-400 font-medium">Parcours professionnels</div>
                                        </div>
                                    </div>
                                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                                </button>

                                <button
                                    onClick={() => { setStep('others-form'); setFlow('others'); }}
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

                    {(step === 'l1-form' || step === 'l1-pro-form' || step === 'others-form') && (
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
                                    <ChevronLeft className="w-3 h-3 mr-1" /> CHOIX ADMISSION
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
                                {(step === 'l1-form' || step === 'l1-pro-form') ? (
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
                                    onClick={() => {
                                        if (step === 'l1-form') handleL1Submit();
                                        else if (step === 'l1-pro-form') handleL1ProSubmit();
                                        else handleOthersSubmit();
                                    }}
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
                                    <ChevronLeft className="w-3 h-3 mr-1" /> IDENTIFICATION
                                </button>
                                <h1 className="text-xl sm:text-2xl font-bold text-slate-800">
                                    {flow === 'l1-pro' ? "Parcours Disponibles" : "Portails Disponibles"}
                                </h1>
                                <p className="text-slate-400 text-xs mt-1">
                                    {flow === 'l1-pro' ? "Choisissez votre parcours pour votre inscription" : "Choisissez le portail pour votre inscription"}
                                </p>
                            </div>

                            <div className="space-y-3">
                                {eligiblePortals.map((portal) => (
                                    <button
                                        key={portal.idPortail}
                                        onClick={() => handlePortalSelect(portal)}
                                        className="w-full group text-left p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-50/50 transition-all duration-300 flex items-center justify-between"
                                    >
                                        <div className="flex items-center gap-4 flex-1 min-w-0">
                                            <div className="flex-1 min-w-0">
                                                {flow === 'l1-pro' && portal.mention && (
                                                    <div className="text-[10px] font-black text-indigo-400/70 uppercase tracking-widest leading-none mb-1 group-hover:text-indigo-500 transition-colors">
                                                        {portal.mention}
                                                    </div>
                                                )}
                                                <div className="font-bold text-slate-700 text-sm leading-tight group-hover:text-indigo-900 transition-colors truncate">
                                                    {portal.nomPortail}
                                                </div>
                                                <div className="flex items-center gap-1.5 mt-1.5">
                                                    <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                                                    <span className="text-[10px] font-black text-emerald-600 uppercase tracking-wider">
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

                    {step === 'others-portal-selection' && (
                        <motion.div
                            key="others-portal-selection"
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
                                    <ChevronLeft className="w-3 h-3 mr-1" /> IDENTIFICATION
                                </button>
                                <h1 className="text-xl sm:text-2xl font-bold text-slate-800">
                                    Vos Autorisations
                                </h1>
                                <p className="text-slate-400 text-xs mt-1">
                                    Vous êtes autorisé à vous inscrire dans plusieurs parcours. Veuillez choisir l'un d'entre eux :
                                </p>
                            </div>

                            <div className="space-y-4">
                                {authorizedPortals.map((portal, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handlePortalSelect(portal)}
                                        className="w-full group text-left p-5 rounded-2xl border border-slate-100 bg-slate-50/30 hover:bg-white hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 flex items-center justify-between relative overflow-hidden"
                                    >
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-indigo-500/10 transition-colors" />

                                        <div className="flex flex-col gap-2 relative z-10 w-full pr-8">
                                            <div className="flex items-center gap-2">
                                                <span className="px-2 py-0.5 rounded-md text-[9px] font-black bg-indigo-50 text-indigo-600 uppercase tracking-widest">
                                                    {portal.abbreviation || "PORTAIL"}
                                                </span>
                                                <span className="px-2 py-0.5 rounded-md text-[9px] font-black bg-slate-100 text-slate-500 uppercase tracking-widest">
                                                    {portal.niveau}
                                                </span>
                                            </div>

                                            <div className="font-bold text-slate-800 text-sm sm:text-base leading-tight">
                                                {portal.nomPortail}
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border ${portal.estRedoublant
                                                    ? 'bg-amber-50 border-amber-100 text-amber-700 shadow-sm shadow-amber-100/50'
                                                    : 'bg-emerald-50 border-emerald-100 text-emerald-700 shadow-sm shadow-emerald-100/50'
                                                    }`}>
                                                    <div className={`w-1.5 h-1.5 rounded-full ${portal.estRedoublant ? 'bg-amber-500' : 'bg-emerald-500'} animate-pulse`} />
                                                    <span className="text-[10px] font-bold uppercase tracking-tight">
                                                        {portal.statusLibelle}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex-shrink-0 relative z-10">
                                            <div className="w-10 h-10 rounded-full bg-white border border-slate-100 flex items-center justify-center group-hover:border-indigo-200 group-hover:scale-110 transition-all shadow-sm shadow-slate-200/50">
                                                <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-500 transition-colors" />
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>

                            <div className="mt-8 pt-6 border-t border-slate-50">
                                <p className="text-[11px] text-slate-400 text-center leading-relaxed italic">
                                    Choisissez le parcours que vous souhaitez suivre pour l'année académique 2025-2026.
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
                                    <ChevronLeft className="w-3 h-3 mr-1" /> PAIEMENT
                                </button>
                                <h1 className="text-xl sm:text-2xl font-bold text-slate-800">
                                    Photo d'identité
                                </h1>
                                <p className="text-slate-400 text-xs mt-1">
                                    Prenez une photo pour la carte d'étudiant du candidat au portail <span className="font-bold text-indigo-600">{selectedPortal?.nomPortail}</span>
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
                                                    disabled={!!cameraError}
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
                                                onClick={() => setStep('identity-documents')}
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
                            className="w-full sm:bg-white sm:rounded-2xl sm:shadow-xl sm:shadow-slate-200/60 sm:border sm:border-slate-100 border-0 shadow-none overflow-hidden"
                        >
                            <div className="p-6 sm:p-8 text-center sm:text-left">
                                <button
                                    onClick={handleBack}
                                    className="text-[10px] text-indigo-500 hover:text-indigo-600 flex items-center font-black tracking-widest mb-4 sm:mb-6 transition-colors mx-auto sm:mx-0"
                                >
                                    <ChevronLeft className="w-3 h-3 mr-1" /> CHOIX PARCOURS
                                </button>
                                <h1 className="text-xl sm:text-2xl font-bold text-slate-800 mb-2">
                                    Référence de Paiement
                                </h1>
                                <p className="text-slate-400 text-xs mb-8">
                                    Saisissez le numéro sur votre reçu de versement.
                                </p>

                                <div className="space-y-6">
                                    <div className="space-y-4">
                                        {/* Reference Administrative */}
                                        <div className="space-y-2">
                                            <Label className="text-xs font-bold text-slate-700">Référence Droit Administratif *</Label>
                                            <div className="relative">
                                                <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                                <Input
                                                    placeholder="Réf. Administrative"
                                                    className="pl-10 h-10 bg-slate-50 border-slate-200 focus:bg-white transition-all rounded-lg text-sm placeholder:text-slate-300 placeholder:font-light disabled:opacity-50 disabled:bg-slate-100 italic"
                                                    value={form.watch("referenceAdmin")}
                                                    onChange={(e) => form.setValue("referenceAdmin", e.target.value)}
                                                    disabled={isSeparateDisabled}
                                                />
                                            </div>
                                            {form.formState.errors.referenceAdmin && (
                                                <p className="text-red-500 text-[10px] font-medium mt-1">
                                                    {form.formState.errors.referenceAdmin.message}
                                                </p>
                                            )}
                                        </div>

                                        {/* Reference Pedagogique */}
                                        <div className="space-y-2">
                                            <Label className="text-xs font-bold text-slate-700">Référence Droit Pédagogique</Label>
                                            <div className="relative">
                                                <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                                <Input
                                                    placeholder="Réf. Pédagogique (Optionnel)"
                                                    className="pl-10 h-10 bg-slate-50 border-slate-200 focus:bg-white transition-all rounded-lg text-sm placeholder:text-slate-300 placeholder:font-light disabled:opacity-50 disabled:bg-slate-100 italic"
                                                    value={form.watch("referencePedago")}
                                                    onChange={(e) => form.setValue("referencePedago", e.target.value)}
                                                    disabled={isSeparateDisabled}
                                                />
                                            </div>
                                        </div>

                                        {/* Separator */}
                                        <div className="relative py-2">
                                            <div className="absolute inset-0 flex items-center">
                                                <span className="w-full border-t border-slate-100" />
                                            </div>
                                            <div className="relative flex justify-center text-xs uppercase">
                                                <span className="bg-white px-2 text-slate-300 font-bold tracking-widest">OU</span>
                                            </div>
                                        </div>

                                        {/* Reference Mixte */}
                                        <div className="space-y-2">
                                            <Label className="text-xs font-bold text-slate-700">Référence Droit Administratif et Pédagogique</Label>
                                            <div className="relative">
                                                <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                                <Input
                                                    placeholder="Réf. Mixte (Couvre les deux)"
                                                    className="pl-10 h-10 bg-slate-50 border-slate-200 focus:bg-white transition-all rounded-lg text-sm placeholder:text-slate-300 placeholder:font-light disabled:opacity-50 disabled:bg-slate-100 italic"
                                                    value={form.watch("referenceMixte")}
                                                    onChange={(e) => form.setValue("referenceMixte", e.target.value)}
                                                    disabled={isMixteDisabled}
                                                />
                                            </div>
                                            <p className="text-[10px] text-slate-400 italic">
                                                Si vous avez un reçu unique couvrant les droits administratifs et pédagogiques.
                                            </p>
                                        </div>
                                    </div>

                                    <Button
                                        onClick={async () => {
                                            const isValid = await form.trigger(["referenceAdmin", "referencePedago", "referenceMixte"]);
                                            // Manual check for global validation issues (superRefine)
                                            if (isValid) {
                                                const values = form.getValues();
                                                const hasAdmin = !!values.referenceAdmin && values.referenceAdmin.length >= 3;
                                                const hasMixte = !!values.referenceMixte && values.referenceMixte.length >= 3;

                                                if (hasAdmin || hasMixte) {
                                                    setStep('photo-capture');
                                                    setMode('choice');
                                                } else {
                                                    form.setError("referenceAdmin", { message: "La référence Administrative (ou Mixte) est obligatoire." });
                                                }
                                            }
                                        }}

                                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold h-12 rounded-xl shadow-lg shadow-indigo-100 transition-all active:scale-[0.98]"
                                    >
                                        Continuer <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Identity Documents Step */}
                    {step === 'identity-documents' && (
                        <motion.div
                            key="identity-documents"
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
                                    <ChevronLeft className="w-3 h-3 mr-1" /> PHOTO D'IDENTITÉ
                                </button>
                                <h1 className="text-xl sm:text-2xl font-bold text-slate-800">
                                    {isMajor ? "Pièce d'Identité" : "Acte de Naissance"}
                                </h1>
                                <p className="text-slate-400 text-xs mt-1">
                                    {isMajor
                                        ? "Uploadez le recto et verso de votre Carte d'Identité Nationale"
                                        : "Uploadez une photo de votre acte de naissance"}
                                </p>
                            </div>

                            {/* For adults: CIN upload or birth certificate if no CIN */}
                            {isMajor ? (
                                <div className="space-y-6">
                                    {/* No CIN checkbox */}
                                    <label className="flex items-center gap-3 p-4 bg-amber-50 border border-amber-100 rounded-xl cursor-pointer hover:bg-amber-100 transition-colors">
                                        <input
                                            type="checkbox"
                                            checked={hasNoCin}
                                            onChange={(e) => setHasNoCin(e.target.checked)}
                                            className="w-5 h-5 rounded border-amber-300 text-amber-600 focus:ring-amber-500"
                                        />
                                        <span className="text-sm font-medium text-amber-800">
                                            Je n'ai pas encore de CIN
                                        </span>
                                    </label>

                                    {!hasNoCin ? (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {/* CIN Recto */}
                                            <div className="space-y-2">
                                                <Label className="text-xs font-bold text-slate-700">CIN - Recto *</Label>
                                                <div
                                                    className={`relative border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all ${cinRectoImage ? 'border-emerald-300 bg-emerald-50' : 'border-slate-200 hover:border-indigo-400 hover:bg-indigo-50'
                                                        }`}
                                                    onClick={() => triggerFileUpload(setCinRectoImage)}
                                                >
                                                    {cinRectoImage ? (
                                                        <img src={cinRectoImage} alt="CIN Recto" className="max-h-32 rounded-lg object-contain" />
                                                    ) : (
                                                        <>
                                                            <ImageIcon className="w-8 h-8 text-slate-400 mb-2" />
                                                            <span className="text-xs text-slate-500 font-medium">Cliquez pour uploader</span>
                                                        </>
                                                    )}
                                                </div>
                                            </div>

                                            {/* CIN Verso */}
                                            <div className="space-y-2">
                                                <Label className="text-xs font-bold text-slate-700">CIN - Verso *</Label>
                                                <div
                                                    className={`relative border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all ${cinVersoImage ? 'border-emerald-300 bg-emerald-50' : 'border-slate-200 hover:border-indigo-400 hover:bg-indigo-50'
                                                        }`}
                                                    onClick={() => triggerFileUpload(setCinVersoImage)}
                                                >
                                                    {cinVersoImage ? (
                                                        <img src={cinVersoImage} alt="CIN Verso" className="max-h-32 rounded-lg object-contain" />
                                                    ) : (
                                                        <>
                                                            <ImageIcon className="w-8 h-8 text-slate-400 mb-2" />
                                                            <span className="text-xs text-slate-500 font-medium">Cliquez pour uploader</span>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        /* Birth certificate for adults without CIN */
                                        <div className="space-y-2">
                                            <Label className="text-xs font-bold text-slate-700">Acte de Naissance *</Label>
                                            <div
                                                className={`relative border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all ${acteNaissanceImage ? 'border-emerald-300 bg-emerald-50' : 'border-slate-200 hover:border-indigo-400 hover:bg-indigo-50'
                                                    }`}
                                                onClick={() => triggerFileUpload(setActeNaissanceImage)}
                                            >
                                                {acteNaissanceImage ? (
                                                    <img src={acteNaissanceImage} alt="Acte de Naissance" className="max-h-40 rounded-lg object-contain" />
                                                ) : (
                                                    <>
                                                        <ImageIcon className="w-10 h-10 text-slate-400 mb-2" />
                                                        <span className="text-sm text-slate-500 font-medium">Cliquez pour uploader</span>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                /* For minors: only birth certificate */
                                <div className="space-y-2">
                                    <Label className="text-xs font-bold text-slate-700">Acte de Naissance *</Label>
                                    <div
                                        className={`relative border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all ${acteNaissanceImage ? 'border-emerald-300 bg-emerald-50' : 'border-slate-200 hover:border-indigo-400 hover:bg-indigo-50'
                                            }`}
                                        onClick={() => triggerFileUpload(setActeNaissanceImage)}
                                    >
                                        {acteNaissanceImage ? (
                                            <img src={acteNaissanceImage} alt="Acte de Naissance" className="max-h-40 rounded-lg object-contain" />
                                        ) : (
                                            <>
                                                <ImageIcon className="w-10 h-10 text-slate-400 mb-2" />
                                                <span className="text-sm text-slate-500 font-medium">Cliquez pour uploader</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            )}

                            <Button
                                onClick={() => {
                                    // Validate that required documents are uploaded
                                    if (isMajor && !hasNoCin) {
                                        if (!cinRectoImage || !cinVersoImage) {
                                            setError("Veuillez uploader le recto et verso de votre CIN");
                                            return;
                                        }
                                    } else {
                                        if (!acteNaissanceImage) {
                                            setError("Veuillez uploader votre acte de naissance");
                                            return;
                                        }
                                    }
                                    setError(null);
                                    setStep('student-info');
                                }}
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold h-12 rounded-xl shadow-lg shadow-indigo-100 transition-all active:scale-[0.98] mt-6"
                            >
                                Continuer <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>

                            {error && (
                                <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-lg flex items-start gap-3 text-red-600 text-xs">
                                    <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                    <p>{error}</p>
                                </div>
                            )}
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
                                    <ChevronLeft className="w-3 h-3 mr-1" /> {formStep > 0 ? "ÉTAPE PRÉCÉDENTE" : "DOCUMENTS D'IDENTITÉ"}
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

                                        <div className="flex gap-4 pt-4 flex-col">
                                            {error && (
                                                <div className="p-3 bg-red-50 border border-red-100 rounded-lg flex items-start gap-3 text-red-600 text-xs mb-2">
                                                    <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                                    <p>{error}</p>
                                                </div>
                                            )}
                                            {formStep === activeSteps.length - 1 ? (
                                                <Button
                                                    type="button"
                                                    disabled={isLoading}
                                                    onClick={() => {
                                                        form.handleSubmit(onStudentInfoSubmit, (errors) => {
                                                            console.error("Validation errors:", errors);
                                                            const firstError = Object.values(errors)[0];
                                                            if (firstError) {
                                                                toast.error(`Erreur: ${firstError.message}`);
                                                            } else {
                                                                toast.error("Veuillez vérifier les champs du formulaire.");
                                                            }
                                                        })();
                                                    }}
                                                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold h-12 rounded-lg shadow-lg shadow-indigo-200"
                                                >
                                                    {isLoading ? (
                                                        <>
                                                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                                            Traitement...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <CheckCircle2 className="w-5 h-5 mr-2" />
                                                            Terminer l'inscription
                                                        </>
                                                    )}
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

                    {step === 'success' && (
                        <motion.div
                            key="success"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="w-full sm:bg-white sm:rounded-xl sm:shadow-[0_10px_40px_rgba(0,0,0,0.08)] sm:border sm:border-slate-100 p-6 sm:p-10 text-center"
                        >
                            <div className="flex justify-center mb-6">
                                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 animate-bounce">
                                    <CheckCircle2 className="w-10 h-10" />
                                </div>
                            </div>

                            <h1 className="text-2xl font-bold text-slate-800 mb-2">
                                Inscription Terminée !
                            </h1>
                            <p className="text-slate-500 text-sm mb-8">
                                Votre dossier a été enregistré avec succès pour l'année universitaire 2025-2026.
                            </p>

                            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 mb-8">
                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between items-center text-sm border-b border-slate-100 pb-3">
                                        <span className="text-slate-500 font-medium">Parcours</span>
                                        <span className="text-slate-800 font-bold">{enrollmentResult?.nomPortail || selectedPortal?.nomPortail}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm border-b border-slate-100 pb-3">
                                        <span className="text-slate-500 font-medium">Année Universitaire</span>
                                        <span className="text-slate-800 font-bold">2025-2026</span>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Votre Numéro d'Inscription</p>
                                    <div className="text-2xl font-black text-indigo-600 tracking-tight break-all">
                                        {enrollmentResult?.numInscription}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4 text-left bg-indigo-50/50 p-6 rounded-xl border border-indigo-100/50 mb-8">
                                <h3 className="text-sm font-bold text-indigo-700 flex items-center gap-2">
                                    <AlertCircle className="w-4 h-4" /> Prochaines étapes
                                </h3>
                                <ul className="text-xs text-indigo-900/70 space-y-2 list-disc pl-4">
                                    <li>Conservez précieusement votre <strong>numéro d'inscription</strong>.</li>
                                    <li>Ce numéro est indispensable pour récupérer votre <strong>carte d'étudiant</strong>.</li>
                                </ul>
                            </div>

                            <div className="flex flex-col gap-3">
                                <Button
                                    onClick={() => {
                                        setStep('selection');
                                        setIsLoading(false);
                                        setError(null);
                                        setEligiblePortals([]);
                                        setSelectedPortal(null);
                                        setPhoto(null);
                                        setRawPhoto(null);
                                        setEnrollmentResult(null);
                                        setCinRectoImage(null);
                                        setCinVersoImage(null);
                                        setActeNaissanceImage(null);
                                        setHasNoCin(false);
                                        setCrop({ x: 0, y: 0 });
                                        setZoom(1);
                                        setCroppedAreaPixels(null);
                                        setMode('choice');
                                        setCameraError(false);
                                        setL1Data({ baccNum: '', baccYear: '' });
                                        setOthersData({ inscriptionNum: '' });
                                        setReenrollmentData(null);
                                        setFormStep(0);
                                        form.reset();
                                    }}
                                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold h-12 rounded-xl"
                                >
                                    Nouvelle inscription
                                </Button>
                                <Button
                                    onClick={() => window.location.reload()}
                                    variant="outline"
                                    className="w-full border-slate-200 hover:bg-slate-50 text-slate-600 font-bold h-12 rounded-xl"
                                >
                                    Retour à l'accueil
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div >
    );
};

export default InscriptionPage;
