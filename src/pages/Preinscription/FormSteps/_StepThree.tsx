import React, { useState } from 'react';
import { ChevronRight, User, Mail, Phone, Ticket, MapPin, HandCoins } from 'lucide-react';
import type { ApplicationData, CandidateInfo } from '../types';

interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
}

interface Info {
  perso: PersonalInfo;
  bank: {
    reference: string;
    dateRef: Date;
    agenceRef: string;
  }
}

interface StepThreeProps {
  candidateInfo: CandidateInfo;
  onNext: (data: {
    personalInfo: PersonalInfo;
    bankInfo: {
      reference: string;
      agenceRef: string;
      dateRef: string;
    };
  }) => void;
  onBack: () => void;
}
export const StepThree: React.FC<StepThreeProps> = ({ candidateInfo, onNext, onBack }) => {
  const [personalInfo, setPersonalInfo] = useState<Info>({
    perso: {
      firstName: candidateInfo?.firstName || '',
      lastName: candidateInfo?.lastName || '',
      email: '',
      telephone: '',
    },
    bank: {
      reference: '',
      dateRef: new Date(),
      agenceRef: '',
    }
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!personalInfo.perso.firstName.trim()) {
      newErrors.firstName = 'Le prénom est requis';
    }

    if (!personalInfo.perso.lastName.trim()) {
      newErrors.lastName = 'Le nom est requis';
    }

    if (!personalInfo.perso.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personalInfo.perso.email)) {
      newErrors.email = 'Format d\'email invalide';
    }

    if (!personalInfo.perso.telephone.trim()) {
      newErrors.telephone = 'Le téléphone est requis';
    } else if (!/^(\+261|0)[0-9]{9}$/.test(personalInfo.perso.telephone.replace(/\s/g, ''))) {
      newErrors.telephone = 'Format de téléphone invalide (ex: +261 34 12 345 67 ou 034 12 345 67)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onNext({
        personalInfo: personalInfo.perso,
        bankInfo: {
          reference: personalInfo.bank.reference,
          agenceRef: personalInfo.bank.agenceRef,
          dateRef: personalInfo.bank.dateRef.toString(),
        }
      });
    }
  };


  const handleInputChange = (
    field: keyof Info | keyof PersonalInfo | keyof ApplicationData["bankInfo"],
    value: string | Date
  ) => {
    if (["firstName", "lastName", "email", "telephone"].includes(field as string)) {
      // Mise à jour perso
      setPersonalInfo(prev => ({
        ...prev,
        perso: {
          ...prev.perso,
          [field]: value,
        },
      }));
    } 
    else if (["reference", "dateRef", "agenceRef"].includes(field as string)) {
      // Mise à jour banque
      setPersonalInfo(prev => ({
        ...prev,
        bank: {
          ...prev.bank,
          [field]: value,
        }
      }));
    }

    // Reset erreur si existante
    if (errors[field as string]) {
      setErrors(prev => ({ ...prev, [field as string]: "" }));
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Informations personnelles
        </h2>
        <p className="text-gray-600">
          Complétez vos informations de contact
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Prénom */}
          <div>
            <label htmlFor="firstName" className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <User className="w-4 h-4 mr-2" />
              Prénom *
            </label>
            <input
              type="text"
              id="firstName"
              value={personalInfo.perso.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-faculty-purple-500 focus:border-transparent transition-all duration-200 ${
                errors.firstName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Votre prénom"
              disabled
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
            )}
          </div>

          {/* Nom */}
          <div>
            <label htmlFor="lastName" className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <User className="w-4 h-4 mr-2" />
              Nom *
            </label>
            <input
              type="text"
              id="lastName"
              value={personalInfo.perso.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-faculty-purple-500 focus:border-transparent transition-all duration-200 ${
                errors.lastName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Votre nom"
              disabled
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
            )}
          </div>
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <Mail className="w-4 h-4 mr-2" />
            Adresse email *
          </label>
          <input
            type="email"
            id="email"
            value={personalInfo.perso.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-faculty-purple-500 focus:border-transparent transition-all duration-200 ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="votre.email@example.com"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Téléphone */}
        <div>
          <label htmlFor="telephone" className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <Phone className="w-4 h-4 mr-2" />
            Numéro de téléphone *
          </label>
          <input
            type="tel"
            id="telephone"
            value={personalInfo.perso.telephone}
            onChange={(e) => handleInputChange('telephone', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-faculty-purple-500 focus:border-transparent transition-all duration-200 ${
              errors.telephone ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="+261 34 12 345 67 ou 034 12 345 67"
          />
          {errors.telephone && (
            <p className="text-red-500 text-sm mt-1">{errors.telephone}</p>
          )}
        </div>
        {/** Information pour la réference bancaire */}
        <div className='w-full text-center'>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Informations bancaires
          </h2>
          <p className="text-gray-600">
            Complétez les informations
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Reference*/}
          <div>
            <label htmlFor="ref" className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Ticket className="w-4 h-4 mr-2" />
              Reférence *
            </label>
            <input
              type="text"
              id="ref"
              value={personalInfo.bank.reference} 
              onChange={(e) => handleInputChange("reference", e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-faculty-purple-500 focus:border-transparent transition-all duration-200 ${
                errors.reference ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="reférence du transfert"
              required
            />
            {/* <div>{personalInfo.bank.reference}</div> */}
            {errors.reference && (
              <p className="text-red-500 text-sm mt-1">{errors.reference}</p>
            )}
          </div>

          {/* Agence */}
          <div>
            <label htmlFor="agence" className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <MapPin className="w-4 h-4 mr-2" />
              Agence *
            </label>
            <input
              type="text"
              id="agence"
              value={personalInfo.bank.agenceRef} 
              onChange={(e) => handleInputChange("agenceRef", e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-faculty-purple-500 focus:border-transparent transition-all duration-200 ${
                errors.agence ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Votre nom"
              required
            />
            {errors.agence && (
              <p className="text-red-500 text-sm mt-1">{errors.agence}</p>
            )}
          </div>

          {/* Date */}
          <div>
            <label htmlFor="date" className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <HandCoins className="w-4 h-4 mr-2" />
              Date de paiment *
            </label>
            <input
              type="date"
              id="date"
              value={personalInfo.bank.dateRef.toString().split("T")[0]}
              onChange={(e) => handleInputChange("dateRef", new Date(e.target.value))}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-faculty-purple-500 focus:border-transparent transition-all duration-200 ${
                errors.datePay ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Votre nom"
              required
            />
            {errors.datePay && (
              <p className="text-red-500 text-sm mt-1">{errors.datePay}</p>
            )}
          </div>
        </div>


        {/* Info supplémentaire */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-700">
            <strong>Note :</strong> Ces informations seront utilisées pour vous contacter concernant 
            votre demande de pré-inscription. Assurez-vous qu'elles sont correctes.
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            Précédent
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-faculty-purple-600 text-white rounded-lg hover:bg-faculty-purple-700 transition-colors duration-200 flex items-center space-x-2"
          >
            <span>Continuer</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
};