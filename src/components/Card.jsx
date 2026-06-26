const Card = ({ country }) => {
    const numberFormat = (x) =>
        x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

    const name = country.name?.common ?? "Inconnu";
    const capital = country.capital?.[0] ?? "—";
    const flag = country.flags?.svg ?? country.flags?.png;

    return (
        <li className="card">
            <img src={flag} alt={country.flags?.alt || `Drapeau ${name}`} />
            <div className="data-container">
                <ul>
                    <li>{name}</li>
                    <li>{capital}</li>
                    <li>Pop. {numberFormat(country.population)}</li>
                </ul>
            </div>
        </li>
    );
};

export default Card;
