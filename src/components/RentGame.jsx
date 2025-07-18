import React, { useState, useMemo } from 'react';
import parisRentData from '../data/logement-encadrement-des-loyers-Paris.json';

const RentGame = () => {
  const [formData, setFormData] = useState({
    nom_quartier: '',
    meuble_txt: '',
    piece: '',
    epoque: '',
    surface: '',
    loyerMensuel: ''
  });

  const [result, setResult] = useState(null);
  const [isChecking, setIsChecking] = useState(false);

  // Filter data for 2023 (latest available data)
  const data2023 = useMemo(() => {
    return parisRentData.filter(item => item.annee === "2023");
  }, []);

  // Extract unique values for dropdowns
  const uniqueValues = useMemo(() => {
    const quartiers = [...new Set(data2023.map(item => item.nom_quartier))].sort();
    const meubleTypes = [...new Set(data2023.map(item => item.meuble_txt))].sort();
    const pieces = [...new Set(data2023.map(item => item.piece))].sort((a, b) => a - b);
    const epoques = [...new Set(data2023.map(item => item.epoque))].sort();

    return {
      quartiers,
      meubleTypes,
      pieces,
      epoques
    };
  }, [data2023]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setResult(null); // Reset result when form changes
  };

  const isFormComplete = () => {
    return formData.nom_quartier && 
           formData.meuble_txt && 
           formData.piece && 
           formData.epoque && 
           formData.surface && 
           formData.loyerMensuel;
  };

  const handleVerify = () => {
    setIsChecking(true);
    
    // Find matching data
    const matchingData = data2023.find(item => 
      item.nom_quartier === formData.nom_quartier &&
      item.meuble_txt === formData.meuble_txt &&
      item.piece === parseInt(formData.piece) &&
      item.epoque === formData.epoque
    );

    if (matchingData) {
      const surface = parseFloat(formData.surface);
      const loyerMensuel = parseFloat(formData.loyerMensuel);
      
      // Calculate monthly rent limits based on surface
      const loyerMinMensuel = matchingData.min * surface;
      const loyerRefMensuel = matchingData.ref * surface;
      const loyerMaxMensuel = matchingData.max * surface;
      
      // Calculate rent per m² from user input
      const loyerParM2 = loyerMensuel / surface;
      
      // Determine status
      let status = 'normal';
      let message = '';
      let emoji = '';
      
      if (loyerParM2 <= matchingData.min) {
        status = 'excellent';
        message = 'Excellent ! Votre loyer est très avantageux !';
        emoji = '🎉';
      } else if (loyerParM2 <= matchingData.ref) {
        status = 'bon';
        message = 'Bon prix ! Votre loyer est dans la norme basse.';
        emoji = '✅';
      } else if (loyerParM2 <= matchingData.max) {
        status = 'correct';
        message = 'Prix correct, mais vous pourriez négocier.';
        emoji = '⚠️';
      } else {
        status = 'cher';
        message = 'Attention ! Votre loyer dépasse le plafond légal.';
        emoji = '🚨';
      }

      setResult({
        status,
        message,
        emoji,
        loyerParM2: loyerParM2.toFixed(2),
        loyerMensuel,
        surface,
        limits: {
          min: matchingData.min,
          ref: matchingData.ref,
          max: matchingData.max
        },
        monthlyLimits: {
          min: loyerMinMensuel.toFixed(2),
          ref: loyerRefMensuel.toFixed(2),
          max: loyerMaxMensuel.toFixed(2)
        }
      });
    } else {
      setResult({
        status: 'error',
        message: 'Désolé, aucune donnée trouvée pour ces critères.',
        emoji: '❌'
      });
    }
    
    setIsChecking(false);
  };

  const resetForm = () => {
    setFormData({
      nom_quartier: '',
      meuble_txt: '',
      piece: '',
      epoque: '',
      surface: '',
      loyerMensuel: ''
    });
    setResult(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
          <h1 className="text-3xl font-bold text-center mb-2">
            🏠 Vérificateur de Loyer
          </h1>
          <p className="text-center text-blue-100">
            Découvrez si votre loyer respecte l'encadrement parisien !
          </p>
        </div>

        <div className="p-6">
          {/* Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Quartier */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                📍 Quartier
              </label>
              <select
                value={formData.nom_quartier}
                onChange={(e) => handleInputChange('nom_quartier', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Choisissez un quartier</option>
                {uniqueValues.quartiers.map(quartier => (
                  <option key={quartier} value={quartier}>{quartier}</option>
                ))}
              </select>
            </div>

            {/* Type de location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                🏡 Type de location
              </label>
              <select
                value={formData.meuble_txt}
                onChange={(e) => handleInputChange('meuble_txt', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Choisissez le type</option>
                {uniqueValues.meubleTypes.map(type => (
                  <option key={type} value={type}>
                    {type.includes('meubl') && !type.includes('non') ? 'Meublé' : 'Non meublé'}
                  </option>
                ))}
              </select>
            </div>

            {/* Nombre de pièces */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                🏠 Nombre de pièces
              </label>
              <select
                value={formData.piece}
                onChange={(e) => handleInputChange('piece', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Choisissez le nombre</option>
                {uniqueValues.pieces.map(piece => (
                  <option key={piece} value={piece}>
                    {piece} pièce{piece > 1 ? 's' : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* Époque de construction */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                🏗️ Époque de construction
              </label>
              <select
                value={formData.epoque}
                onChange={(e) => handleInputChange('epoque', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Choisissez l'époque</option>
                {uniqueValues.epoques.map(epoque => (
                  <option key={epoque} value={epoque}>{epoque}</option>
                ))}
              </select>
            </div>

            {/* Surface */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                📐 Surface (m²)
              </label>
              <input
                type="number"
                value={formData.surface}
                onChange={(e) => handleInputChange('surface', e.target.value)}
                placeholder="Ex: 45"
                min="1"
                step="0.1"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Loyer mensuel */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                💰 Loyer mensuel (€)
              </label>
              <input
                type="number"
                value={formData.loyerMensuel}
                onChange={(e) => handleInputChange('loyerMensuel', e.target.value)}
                placeholder="Ex: 1200"
                min="1"
                step="0.01"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-4 justify-center mb-8">
            <button
              onClick={handleVerify}
              disabled={!isFormComplete() || isChecking}
              className={`px-8 py-3 rounded-lg font-semibold text-white transition-all duration-200 ${
                isFormComplete() && !isChecking
                  ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 transform hover:scale-105'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              {isChecking ? '🔍 Vérification...' : '✅ Vérifier mon loyer'}
            </button>
            
            <button
              onClick={resetForm}
              className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200"
            >
              🔄 Recommencer
            </button>
          </div>

          {/* Results */}
          {result && (
            <div className={`rounded-xl p-6 text-center ${
              result.status === 'excellent' ? 'bg-green-100 border-green-300' :
              result.status === 'bon' ? 'bg-blue-100 border-blue-300' :
              result.status === 'correct' ? 'bg-yellow-100 border-yellow-300' :
              result.status === 'cher' ? 'bg-red-100 border-red-300' :
              'bg-gray-100 border-gray-300'
            } border-2`}>
              <div className="text-4xl mb-3">{result.emoji}</div>
              <h3 className="text-xl font-bold mb-4">{result.message}</h3>
              
              {result.status !== 'error' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-semibold mb-2">💰 Votre situation</h4>
                    <p>Loyer: <span className="font-mono font-bold">{result.loyerMensuel}€/mois</span></p>
                    <p>Surface: <span className="font-mono">{result.surface}m²</span></p>
                    <p>Prix/m²: <span className="font-mono font-bold">{result.loyerParM2}€/m²</span></p>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-semibold mb-2">📊 Limites légales</h4>
                    <div className="space-y-1 text-sm">
                      <p>Min: <span className="font-mono">{result.limits.min}€/m²</span> = <span className="font-bold">{result.monthlyLimits.min}€/mois</span></p>
                      <p>Référence: <span className="font-mono">{result.limits.ref}€/m²</span> = <span className="font-bold">{result.monthlyLimits.ref}€/mois</span></p>
                      <p>Max: <span className="font-mono">{result.limits.max}€/m²</span> = <span className="font-bold">{result.monthlyLimits.max}€/mois</span></p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RentGame; 