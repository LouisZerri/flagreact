import { NavLink } from "react-router-dom";

const navClass = ({ isActive }) => (isActive ? "nav-active" : undefined);

const Navigation = () => {
    return (
        <div className="navigation">
            <NavLink to="/" className={navClass} end>
                Accueil
            </NavLink>
            <NavLink to="/news" className={navClass} end>
                News
            </NavLink>
            <NavLink to="/a-propos" className={navClass} end>
                A propos
            </NavLink>
        </div>
    );
};

export default Navigation;
