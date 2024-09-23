import React from 'react';
import { Link } from 'react-router-dom';
import { useCooperation } from './CooperationContext'; // Импортираме контекста

const CooperationNavbar = () => {
    const { currentCooperation } = useCooperation(); // Вземаме текущата кооперация от глобалното състояние

    if (!currentCooperation) {
        return null; // Ако няма избрана кооперация, не показваме навигационния бар
    }

    return (
        <nav className="navbar navbar-expand navbar-blue bg-blue">
            <Link to="/" className="navbar-brand">
                {currentCooperation.title} {/* Показваме името на кооперацията */}
            </Link>

            <div className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link to={`/quick-create/${currentCooperation.id}`} className="nav-link">
                        Quick Create
                    </Link>
                </li>
            </div>

            <div className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link to={`/cooperation/${currentCooperation.id}/floors`} className="nav-link">
                        Floors
                    </Link>
                </li>
            </div>

            <div className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link to={`/cooperation/${currentCooperation.id}/apartments`} className="nav-link">
                        Apartments
                    </Link>
                </li>
            </div>

            <div className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link to={`/cooperation/${currentCooperation.id}/garages`} className="nav-link">
                        Garages
                    </Link>
                </li>
            </div>
            <div className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link to={`/cooperation/${currentCooperation.id}/parking-places`} className="nav-link">
                        Parking Places
                    </Link>
                </li>
            </div>
        </nav>
    );
};

export default CooperationNavbar;
