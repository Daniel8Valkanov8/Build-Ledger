import React from 'react';
import './Projects.css'; // Импорт на CSS стилове

const ProjectComponent = ({ project }) => {
    // Определяме иконата на база на статуса на проекта
    const getIconForStatus = (status) => {
        if (status === 'Кооперация') {
            return <i className="bi bi-buildings project-icon"></i>; // Иконка за кооперация
        } else if (status === 'Къща') {
            return <i className="bi bi-house project-icon"></i>; // Иконка за къща
        }
        return null; // Няма иконка за други статуси
    };

    return (
        <div className="project-card">
            <div className="project-info">
                <h2>{project.title}</h2>
                <p><strong>EIK:</strong> {project.eik}</p>
                <p><strong>Start Date:</strong> {project.startDate}</p>
                <p><strong>End Date:</strong> {project.endDate}</p>
            </div>
            {getIconForStatus(project.buildingStatus)} {/* Показваме иконката за статуса */}
        </div>
    );
};

export default ProjectComponent;
