import React, { Component } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import CreateProject from './create-project/CreateProject';
import Navbar from './navigation/Navbar';
import AllProjects from "./all-projects/AllProjects";
import IndividualProjectTemplate from "./all-projects/IndividualProjectTemplate";
import CooperationTemplate from "./building/cooperation/CooperationTemplate";
import ParcelTemplate from "./parcel/ParcelTemplate";
import CooperationNavbar from "./navigation/CooperationNavbar";
import CreateCooperationObjects from "./building/cooperation/create-objects/CreateCooperationObjects";
import AllApartments from './apartment/AllApartmentsComponent';
import { CooperationProvider } from './navigation/CooperationContext'; // Импортираме контекста

const AppContent = () => {
  const location = useLocation();

  // Пътища, където основният Navbar трябва да бъде скрит
  const hideNavbarPaths = ['/cooperation/:id', '/building/:id', '/quick-create/:id'];

  // Проверка дали трябва да скрием Navbar-а
  const shouldHideNavbar = hideNavbarPaths.some(path => 
    new RegExp(path.replace(':id', '[^/]+')).test(location.pathname)
  );

  // Проверка дали трябва да покажем CooperationNavbar
  const isCooperationPath = /^\/cooperation\/[^/]+/.test(location.pathname);
  const isQuickCreatePath = /^\/quick-create\/[^/]+/.test(location.pathname);
  const isApartmentPath = /^\/cooperation\/[^/]+\/apartments/.test(location.pathname);

  return (
    <div>
      {!shouldHideNavbar && <Navbar />}
      {(isCooperationPath || isQuickCreatePath || isApartmentPath) && (
        <CooperationNavbar />
      )}
      
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<div>Welcome to Build Ledger!</div>} />
          <Route path="/create-project" element={<CreateProject />} />
          <Route path="/all-projects" element={<AllProjects />} />
          <Route path="/project/:id" element={<IndividualProjectTemplate />} />
          <Route path="/parcel/:id" element={<ParcelTemplate />} />
          <Route path="/cooperation/:id" element={<CooperationTemplate />} />
          <Route path="/quick-create/:id" element={<CreateCooperationObjects />} />
          <Route path="/cooperation/:id/apartments" element={<AllApartments />} />
          <Route path="/building/:id" element={<div>Building Template</div>} />
          <Route path="/house/:id" element={<div>House Template</div>} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </div>
    </div>
  );
};

class App extends Component {
  render() {
    return (
      <CooperationProvider> {/* Обвиваме с контекста */}
        <AppContent />
      </CooperationProvider>
    );
  }
}

export default App;
