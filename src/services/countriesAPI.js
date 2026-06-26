// Jeu de données pays embarqué localement.
//
// Les API publiques REST Countries (v2, puis v3.1) ont été successivement
// dépréciées, et la v5 exige désormais une clé d'API. Pour une application
// vitrine, on embarque donc un dataset statique (sources : mledoze/countries
// pour les noms/capitales/régions, Banque Mondiale pour la population, et
// flagcdn.com pour les drapeaux). Plus aucune dépendance réseau, plus rapide
// et plus fiable.
import countries from "../assets/countries.json";

async function findAllCountries() {
    return countries;
}

export default {
    findAllCountries,
};
