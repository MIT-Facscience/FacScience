import { User, Mail, Phone, Globe, Flag, ChevronRight, Ticket, MapPin, HandCoins } from 'lucide-react';
import type { ForeignBankInfo, ForeignPersonalInfo } from '../../types';
import { useTranslation } from 'react-i18next';

interface StepOneProps {
  personalInfo: ForeignPersonalInfo;
  bankInfo: ForeignBankInfo;
  errors: Record<string, string>;
  setPersonalInfo: (field: keyof ForeignPersonalInfo, value: string) => void;
  setBankInfo: (field: keyof ForeignBankInfo, value: string) => void;
  setErrors: (errors: Record<string, string>) => void;
  onNext: () => void;
}

export default function StepOne({ personalInfo, bankInfo, errors, setPersonalInfo, setBankInfo, setErrors, onNext }: StepOneProps) {
  const { t } = useTranslation("admission");

  const validateStepOne = () => {
    const newErrors: Record<string, string> = {};

    if (!personalInfo.firstName.trim()) newErrors.firstName = t('formulaire.stepOneStranger.fields.firstName.error');
    if (!personalInfo.lastName.trim()) newErrors.lastName = t('formulaire.stepOneStranger.fields.lastName.error');
    if (!personalInfo.email.trim()) newErrors.email = t('formulaire.stepOneStranger.fields.email.error.required');
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personalInfo.email)) newErrors.email = t('formulaire.stepOneStranger.fields.email.error.invalid');
    if (!personalInfo.telephone.trim()) newErrors.telephone = t('formulaire.stepOneStranger.fields.telephone.error');
    if (!personalInfo.bacNationality.trim()) newErrors.bacNationality = t('formulaire.stepOneStranger.fields.bacNationality.error');
    if (!personalInfo.personalNationality.trim()) newErrors.personalNationality = t('formulaire.stepOneStranger.fields.personalNationality.error');
    if (!bankInfo.reference.trim()) newErrors.reference = t('formulaire.stepOneStranger.fields.reference.error');
    if (!bankInfo.agenceRef.trim()) newErrors.agenceRef = t('formulaire.stepOneStranger.fields.agenceRef.error');
    if (!bankInfo.dateRef) newErrors.dateRef = t('formulaire.stepOneStranger.fields.dateRef.error');

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStepOne()) onNext();
  };

  const updateField = (field: keyof ForeignPersonalInfo, value: string) => {
    setPersonalInfo(field, value);
    if (errors[field]) {
      const newErrors = { ...errors };
      delete newErrors[field];
      setErrors(newErrors);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">
        {t('formulaire.stepOneStranger.title')}
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {['firstName', 'lastName'].map((field) => (
          <div key={field}>
            <label className="flex items-center text-sm font-medium mb-2">
              <User className="w-4 h-4 text-gray-400 mr-2" />
              {field === 'firstName' 
                ? `${t('formulaire.stepOneStranger.fields.firstName.label')} *` 
                : `${t('formulaire.stepOneStranger.fields.lastName.label')} *`
              }
            </label>
            <input
              type="text"
              value={personalInfo[field as keyof ForeignPersonalInfo]}
              onChange={e => updateField(field as keyof ForeignPersonalInfo, e.target.value)}
              className={`w-full px-4 py-3 border rounded-sm ${errors[field] ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors[field] && <p className="text-red-500 text-sm">{errors[field]}</p>}
          </div>
        ))}
      </div>

      <div>
        <label className="flex items-center text-sm font-medium mb-2">
          <Mail className="w-4 h-4 text-gray-400 mr-2"/>
          {t('formulaire.stepOneStranger.fields.email.label')} *
        </label>
        <input
          type="email"
          value={personalInfo.email}
          onChange={e => updateField('email', e.target.value)}
          className={`w-full px-4 py-3 border rounded-sm ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>

      <div>
        <label className="flex items-center text-sm font-medium mb-2">
          <Phone className="w-4 h-4 text-gray-400 mr-2"/>
          {t('formulaire.stepOneStranger.fields.telephone.label')} *
        </label>
        <input
          type="tel"
          value={personalInfo.telephone}
          onChange={e => updateField('telephone', e.target.value)}
          className={`w-full px-4 py-3 border rounded-sm ${errors.telephone ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.telephone && <p className="text-red-500 text-sm">{errors.telephone}</p>}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="flex items-center text-sm font-medium mb-2">
            <Globe className="w-4 h-4 text-gray-400 mr-2"/>
            {t('formulaire.stepOneStranger.fields.bacNationality.label')} *
          </label>
          <input 
            type="text" 
            value={personalInfo.bacNationality} 
            onChange={e => updateField('bacNationality', e.target.value)}
            className={`w-full px-4 py-3 border rounded-sm ${errors.bacNationality ? 'border-red-500' : 'border-gray-300'}`} 
          />
          {errors.bacNationality && <p className="text-red-500 text-sm">{errors.bacNationality}</p>}
        </div>
        <div>
          <label className="flex items-center text-sm font-medium mb-2">
            <Flag className="w-4 h-4 text-gray-400 mr-2"/>
            {t('formulaire.stepOneStranger.fields.personalNationality.label')} *
          </label>
          <input 
            type="text" 
            value={personalInfo.personalNationality} 
            onChange={e => updateField('personalNationality', e.target.value)}
            className={`w-full px-4 py-3 border rounded-sm ${errors.personalNationality ? 'border-red-500' : 'border-gray-300'}`} 
          />
          {errors.personalNationality && <p className="text-red-500 text-sm">{errors.personalNationality}</p>}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {['reference', 'agenceRef', 'dateRef'].map((field) => (
          <div key={field}>
            <label className="flex items-center mb-2 text-sm font-medium">
              {field === 'reference' && <Ticket className="w-4 h-4 text-gray-400 mr-2"/>}
              {field === 'agenceRef' && <MapPin className="w-4 h-4 text-gray-400 mr-2"/>}
              {field === 'dateRef' && <HandCoins className="w-4 h-4 text-gray-400 mr-2"/>}
              {field === 'reference' 
                ? `${t('formulaire.stepOneStranger.fields.reference.label')} *`
                : field === 'agenceRef' 
                ? `${t('formulaire.stepOneStranger.fields.agenceRef.label')} *`
                : `${t('formulaire.stepOneStranger.fields.dateRef.label')} *`
              }
            </label>
            <input
              type={field === 'dateRef' ? 'date' : 'text'}
              value={bankInfo[field as keyof ForeignBankInfo]}
              onChange={e => setBankInfo(field as keyof ForeignBankInfo, e.target.value)}
              className={`w-full px-4 py-3 border rounded ${errors[field] ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors[field] && <p className="text-red-500 text-sm">{errors[field]}</p>}
          </div>
        ))}
      </div>

      <div className="flex justify-end pt-6">
        <button 
          onClick={handleNext} 
          className="px-6 py-3 bg-faculty-purple-600 text-white rounded-sm flex items-center hover:bg-faculty-purple-700 transition-colors duration-200"
        >
          {t('formulaire.stepOneStranger.buttons.continue')}
          <ChevronRight className="w-5 h-5 ml-2"/>
        </button>
      </div>
    </div>
  );
}