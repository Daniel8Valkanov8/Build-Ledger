import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CooperationContext } from './CooperationContext'; // Импортираме контекста

const CooperationNavbar = () => {
    const { cooperation } = useContext(CooperationContext); // Взимаме глобалното състояние

    if (!cooperation) return null; // Ако няма избрана кооперация, не показваме навбара

    return (
        <nav className="navbar navbar-expand navbar-blue bg-blue">

            <li className="nav-item">
            <Link to={`/cooperation/${cooperation.id}`} className="navbar-brand">
                {cooperation.title} {/* Показва името на кооперацията */}
            </Link>
            </li>
            <div className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link to={`/quick-create/${cooperation.id}`} className="nav-link">
                        Quick Create
                    </Link>
                </li>
            </div>

            <div className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link to={`/cooperation/${cooperation.id}/apartments`} className="nav-link">
                        Apartments
                    </Link>
                </li>
            </div>

            <div className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link to={`/cooperation/${cooperation.id}/floors`} className="nav-link">
                        Floors
                    </Link>
                </li>
            </div>

            <div className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link to={`/cooperation/${cooperation.id}/garages`} className="nav-link">
                        Garages
                    </Link>
                </li>
            </div>

            <div className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link to={`/cooperation/${cooperation.id}/parking-places`} className="nav-link">
                        Parking Places
                    </Link>
                </li>
            </div>
        </nav>
    );
};

export default CooperationNavbar;
