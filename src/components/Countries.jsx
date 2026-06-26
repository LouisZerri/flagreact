import { useEffect, useMemo, useState } from "react";
import CountriesAPI from "../services/countriesAPI";
import Card from "./Card";

const radios = ["Africa", "America", "Asia", "Europe", "Oceania"];

const Countries = () => {
    const [countries, setCountries] = useState([]);
    const [rangeValue, setRangeValue] = useState(40);
    const [selectedRadio, setSelectedRadio] = useState("");

    useEffect(() => {
        CountriesAPI.findAllCountries()
            .then(setCountries)
            .catch((error) => console.error(error));
    }, []);

    // On filtre d'abord par région, puis on trie par ordre alphabétique,
    // et enfin on limite au curseur. Ainsi le curseur s'applique à la région
    // sélectionnée (et non à l'ensemble avant filtrage).
    const displayedCountries = useMemo(() => {
        return countries
            .filter((country) => country.region?.includes(selectedRadio))
            .sort((a, b) => a.name.common.localeCompare(b.name.common, "fr"))
            .slice(0, rangeValue);
    }, [countries, rangeValue, selectedRadio]);

    return (
        <div className="countries">
            <div className="sort-container">
                <input
                    type="range"
                    min="1"
                    max="250"
                    value={rangeValue}
                    onChange={(e) => setRangeValue(Number(e.target.value))}
                />
                <ul>
                    {radios.map((radio) => (
                        <li key={radio}>
                            <input
                                type="radio"
                                value={radio}
                                id={radio}
                                checked={radio === selectedRadio}
                                onChange={(e) =>
                                    setSelectedRadio(e.target.value)
                                }
                            />
                            <label htmlFor={radio}>{radio}</label>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="cancel">
                {selectedRadio && (
                    <button
                        type="button"
                        className="cancel-btn"
                        onClick={() => setSelectedRadio("")}
                    >
                        Annuler recherche
                    </button>
                )}
            </div>
            <ul className="countries-list">
                {displayedCountries.map((country) => (
                    <Card country={country} key={country.name.common} />
                ))}
            </ul>
        </div>
    );
};

export default Countries;
