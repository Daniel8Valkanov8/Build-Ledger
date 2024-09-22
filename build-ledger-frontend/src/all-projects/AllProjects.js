import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Импорт на useNavigate за пренасочване
import ProjectComponent from './project-component/ProjectComponent';
import './project-component/Projects.css';

const AllProjects = () => {
    const [projects, setProjects] = useState([]);
    const navigate = useNavigate(); // Hook за пренасочване

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch('http://localhost:8080/projects/all'); // URL към API-то
                const data = await response.json();
                setProjects(data); // Запазваме проектите в state
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };

        fetchProjects();
    }, []);

    const handleProjectClick = (id) => {
        navigate(`/project/${id}`); // Пренасочване към страницата на проекта по ID
    };

    return (
        <div className="projects-container">
            <h1>All Projects</h1> {/* Заглавието над проектите */}
            <div className="projects-wrapper">
                {projects.length > 0 ? (
                    projects.map((project) => (
                        <div key={project.id} onClick={() => handleProjectClick(project.id)} className="project-item">
                            <ProjectComponent project={project} />
                        </div>
                    ))
                ) : (
                    <p>No projects available</p>
                )}
            </div>
        </div>
    );
};

export default AllProjects;
