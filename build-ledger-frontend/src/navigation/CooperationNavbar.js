import React from 'react';
import { Link, useParams } from 'react-router-dom';

const CooperationNavbar = ({ cooperationName, currentCooperationId }) => {
    const { id } = useParams(); // Използваме id на кооперацията от URL-то

    return (
        <nav className="navbar navbar-expand navbar-blue bg-blue">
            <Link to="/" className="navbar-brand">
                {cooperationName} {/* Показва името на кооперацията чрез пропс */}
            </Link>

            <div className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link to={`/quick-create/${currentCooperationId}`} className="nav-link">
                        Quick Create
                    </Link>
                </li>
            </div>

            

            <div className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link to={`/cooperation/${id}/floors`} className="nav-link">
                        Floors
                    </Link>
                </li>
            </div>

            <div className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link to={`/cooperation/${currentCooperationId}/apartments`} className="nav-link" >
                    
                        Apartments
                    </Link>
                </li>
            </div>

            <div className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link to={`/cooperation/${id}/garages`} className="nav-link">
                        Garages
                    </Link>
                </li>
            </div>
            <div className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link to={`/cooperation/${id}/floors`} className="nav-link">
                        Parking Places
                    </Link>
                </li>
            </div>
        </nav>
    );
};

export default CooperationNavbar;
