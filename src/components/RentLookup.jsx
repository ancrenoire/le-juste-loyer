import React, { useState, useEffect, useMemo } from 'react';
import parisRentData from '../data/logement-encadrement-des-loyers-Paris.json';

const RentLookup = () => {
  const [filters, setFilters] = useState({
    annee: '',
    nom_quartier: '',
    meuble_txt: '',
    piece: '',
    epoque: ''
  });

  const [results, setResults] = useState([]);

  // Extract unique values for dropdowns
  const uniqueValues = useMemo(() => {
    const annees = [...new Set(parisRentData.map(item => item.annee))].sort();
    const quartiers = [...new Set(parisRentData.map(item => item.nom_quartier))].sort();
    const meubleTypes = [...new Set(parisRentData.map(item => item.meuble_txt))].sort();
    const pieces = [...new Set(parisRentData.map(item => item.piece))].sort((a, b) => a - b);
    const epoques = [...new Set(parisRentData.map(item => item.epoque))].sort();

    return {
      annees,
      quartiers,
      meubleTypes,
      pieces,
      epoques
    };
  }, []);

  // Filter data based on selected criteria
  useEffect(() => {
    let filteredData = parisRentData;

    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        filteredData = filteredData.filter(item => {
          if (key === 'piece') {
            return item[key] === parseInt(value);
          }
          return item[key] === value;
        });
      }
    });

    setResults(filteredData);
  }, [filters]);

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const resetFilters = () => {
    setFilters({
      annee: '',
      nom_quartier: '',
      meuble_txt: '',
      piece: '',
      epoque: ''
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Encadrement des Loyers - Paris
      </h1>

      {/* Filter Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8 p-6 bg-gray-50 rounded-lg">
        <h2 className="col-span-full text-xl font-semibold text-gray-700 mb-4">
          Filtres de recherche
        </h2>

        {/* Année */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Année
          </label>
          <select
            value={filters.annee}
            onChange={(e) => handleFilterChange('annee', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Toutes les années</option>
            {uniqueValues.annees.map(annee => (
              <option key={annee} value={annee}>{annee}</option>
            ))}
          </select>
        </div>

        {/* Nom du quartier */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nom du quartier
          </label>
          <select
            value={filters.nom_quartier}
            onChange={(e) => handleFilterChange('nom_quartier', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Tous les quartiers</option>
            {uniqueValues.quartiers.map(quartier => (
              <option key={quartier} value={quartier}>{quartier}</option>
            ))}
          </select>
        </div>

        {/* Type de location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Type de location
          </label>
          <select
            value={filters.meuble_txt}
            onChange={(e) => handleFilterChange('meuble_txt', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Tous les types</option>
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
            Nombre de pièces
          </label>
          <select
            value={filters.piece}
            onChange={(e) => handleFilterChange('piece', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Tous les nombres</option>
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
            Époque de construction
          </label>
          <select
            value={filters.epoque}
            onChange={(e) => handleFilterChange('epoque', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Toutes les époques</option>
            {uniqueValues.epoques.map(epoque => (
              <option key={epoque} value={epoque}>{epoque}</option>
            ))}
          </select>
        </div>

        {/* Reset button */}
        <div className="flex items-end">
          <button
            onClick={resetFilters}
            className="w-full p-3 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors duration-200"
          >
            Réinitialiser
          </button>
        </div>
      </div>

      {/* Results Section */}
      <div>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Résultats ({results.length} logement{results.length > 1 ? 's' : ''})
        </h2>

        {results.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Aucun résultat trouvé pour ces critères
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full bg-white border border-gray-200 rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">
                    Quartier
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">
                    Pièces
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">
                    Type
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">
                    Époque
                  </th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-700 border-b">
                    Loyer min (€/m²)
                  </th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-700 border-b">
                    Loyer de référence (€/m²)
                  </th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-700 border-b">
                    Loyer max (€/m²)
                  </th>
                </tr>
              </thead>
              <tbody>
                {results.slice(0, 50).map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900 border-b">
                      {item.nom_quartier}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 border-b">
                      {item.piece}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 border-b">
                      {item.meuble_txt.includes('meubl') && !item.meuble_txt.includes('non') ? 'Meublé' : 'Non meublé'}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 border-b">
                      {item.epoque}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 border-b text-right font-mono">
                      {item.min}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 border-b text-right font-mono font-semibold">
                      {item.ref}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 border-b text-right font-mono">
                      {item.max}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {results.length > 50 && (
              <div className="text-center py-4 text-gray-500">
                Affichage des 50 premiers résultats sur {results.length}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RentLookup; 