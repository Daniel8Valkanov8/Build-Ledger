import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CooperationContext } from './CooperationContext';
import './CooperationNavbar.css';

const CooperationNavbar = () => {
    const { cooperation } = useContext(CooperationContext);

    if (!cooperation) return null;

    return (
        <nav className="navbar navbar-expand navbar-blue bg-blue">
            <li className="nav-item">
                <Link to={`/cooperation/${cooperation.id}`} className="navbar-brand">
                    {cooperation.title}
                </Link>
            </li>
            
            <div className="navbar-nav ">
                <li className="nav-item">
                    <Link to={`/quick-create/${cooperation.id}`} className="nav-link">
                        Quick Create
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to={`/cooperation/${cooperation.id}/apartments`} className="nav-link">
                        Apartments
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to={`/cooperation/${cooperation.id}/floors`} className="nav-link">
                        Floors
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to={`/cooperation/${cooperation.id}/garages`} className="nav-link">
                        Garages
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to={`/cooperation/${cooperation.id}/parking-places`} className="nav-link">
                        Parking Places
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to={`/cooperation/${cooperation.id}/create-sell`} className="nav-link">
                        Create Sell
                    </Link>
                </li>
            </div>

            {/* Dropdown Menu - Right Aligned */}
            <div className="navbar-nav ml-auto">
                <div className="nav-item dropdown">
                    <button 
                        className="btn dropdown-toggle" 
                        type="button" 
                        id="dropdownMenu1" 
                        data-toggle="dropdown" 
                        aria-haspopup="true" 
                        aria-expanded="false">
                        Ledger
                    </button>
                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu1">
                        <Link to={`/cooperation/${cooperation.id}/incomes-table`} className="dropdown-item">
                            Incomes
                        </Link>
                        <Link to={`/cooperation/${cooperation.id}/expenses-table`} className="dropdown-item">
                            Expenses
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default CooperationNavbar;
