'use client';

import { useState } from 'react';
import { Search, Users, CheckCircle, XCircle } from 'lucide-react';

interface StudentData {
  nom: string;
  prenom: string;
  verdicte: string;
  [key: string]: any;
}

interface SemesterData {
  [matiere: string]: string;
}

export default function StudentResults() {
  const [searchId, setSearchId] = useState<string>('');
  const [student, setStudent] = useState<StudentData | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const fetchStudentData = async (id: string) => {
    setLoading(true);
    setError('');
    setStudent(null);

    try {
      const file = id.trim().replace('/', '_');
      
      const response = await fetch(`./${file}.json`);
      
      if (!response.ok) {
        throw new Error('Aucun résultat trouvé pour cet étudiant.');
      }

      const data: StudentData = await response.json();
      setStudent(data);
    } catch  {
      setError("Aucun résultat trouvé pour cet étudiant.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (!searchId.trim()) {
      setError('Veuillez entrer un ID valide.');
      return;
    }
    fetchStudentData(searchId);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const renderResultsTable = (title: string, data: SemesterData) => {
    if (!data) return null;

    return (
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-4">
          <h3 className="text-white font-semibold text-lg">{title}</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-purple-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-purple-900 uppercase tracking-wider">
                  Matière
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-purple-900 uppercase tracking-wider">
                  Validation
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-purple-100">
              {Object.entries(data).map(([matiere, validation], index) => (
                <tr key={index} className="hover:bg-purple-50 transition-colors duration-150">
                  <td className="px-6 py-4 text-sm text-gray-900">{matiere}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                      validation === 'Validé' || validation === 'V' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {validation === 'Validé' || validation === 'V' ? (
                        <CheckCircle className="w-3 h-3 mr-1" />
                      ) : (
                        <XCircle className="w-3 h-3 mr-1" />
                      )}
                      <span>{validation}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const studentKeys = student ? Object.keys(student) : [];
  const summaryKey = studentKeys[4];
  const semester1Key = studentKeys[5];
  const semester2Key = studentKeys[6];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-purple-100">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-purple-600 rounded-full p-4 shadow-lg">
              <Users className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-center text-purple-900 mb-2">
            Résultat des Étudiants
          </h1>
          <p className="text-center text-purple-600 mb-8">
            Année universitaire 2024-2025
          </p>

          {/* Search Bar */}
          <div className="flex gap-3 max-w-2xl mx-auto">
            <div className="flex-1 relative">
              <input
                type="text"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Entrer votre numéro d'inscription"
                className="w-full px-5 py-3 pl-12 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all duration-200 text-gray-900 placeholder-gray-400"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-400" />
            </div>
            <button
              onClick={handleSearch}
              disabled={loading}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Recherche...' : 'Rechercher'}
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-lg shadow-md animate-shake">
            <div className="flex items-center">
              <XCircle className="w-5 h-5 text-red-500 mr-3" />
              <p className="text-red-800 font-medium">{error}</p>
            </div>
          </div>
        )}

        {/* Results Section */}
        {student && (
          <div className="space-y-6 animate-fadeIn">
            {/* Student Info Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-purple-100">
              <h2 className="text-2xl font-bold text-purple-900 mb-2">
                Étudiant : {student.nom} {student.prenom}
              </h2>
              <p className="text-lg mb-6">
                <span className="text-gray-600">Verdict : </span>
                <span className={`font-semibold ${
                  student.verdicte === 'Admis' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {student.verdicte}
                </span>
              </p>

              {/* Summary Table */}
              {summaryKey && student[summaryKey] && (
                <div className="overflow-x-auto rounded-xl border border-purple-200">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-purple-600 to-purple-700">
                      <tr>
                        {Object.keys(student[summaryKey]).map((key, index) => (
                          <th key={index} className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                            {key}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      <tr className="hover:bg-purple-50 transition-colors duration-150">
                        {Object.values(student[summaryKey]).map((value, index) => (
                          <td key={index} className="px-6 py-4 text-sm font-semibold text-gray-900 border-t border-purple-100">
                            <span>{String(value)}</span>
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Semester Results */}
            <div className="grid md:grid-cols-2 gap-6">
              {semester1Key && renderResultsTable(`Résultat ${semester1Key}`, student[semester1Key])}
              {semester2Key && renderResultsTable(`Résultat ${semester2Key}`, student[semester2Key])}
            </div>
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }

        .animate-shake {
          animation: shake 0.5s ease;
        }
      `}} />
    </div>
  );
}