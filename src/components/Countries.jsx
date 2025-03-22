import React, { useEffect, useState } from "react";
import CountriesAPI from "../services/countriesAPI";
import Card from "./Card";

const Countries = () => {
    const [countries, setCountries] = useState([]);
    const [sortedCountries, setSortedCountries] = useState([]);
    const [playOnce, setPlayOnce] = useState(true);
    const [rangeValue, setRangeValue] = useState(40);
    const [selectedRadio, setSelectedRadio] = useState("");

    const radios = ["Africa", "America", "Asia", "Europe", "Oceania"];

    const fetchCountries = async () => {
        try {
            const data = await CountriesAPI.findAllCountries();
            setCountries(data);
        } catch (error) {
            console.log(error);
        }
    };

    const sortedCountry = () => {
        const countriesObj = Object.keys(countries).map((i) => countries[i]);
        const sortedArray = countriesObj.sort((a, b) => {
            return b.population - a.population;
        });
        sortedArray.length = rangeValue;
        setSortedCountries(sortedArray);
    };

    useEffect(() => {
        if (playOnce) {
            fetchCountries();
            setPlayOnce(false);
        }
        sortedCountry();
    }, [countries, rangeValue]);

    return (
        <div className="countries">
            <div className="sort-container">
                <input
                    type="range"
                    min="1"
                    max="250"
                    value={rangeValue}
                    onChange={(e) => setRangeValue(e.target.value)}
                />
                <ul>
                    {radios.map((radio) => {
                        return (
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
                        );
                    })}
                </ul>
            </div>
            <div className="cancel">
                {selectedRadio && <h5 onClick={() => setSelectedRadio("")}>Annuler recherche</h5>}
            </div>
            <ul className="countries-list">
                {sortedCountries
                    .filter((country) => country.region.includes(selectedRadio))
                    .map((country) => (
                        <Card country={country} key={country.name} />
                    ))}
            </ul>
        </div>
    );
};

export default Countries;
