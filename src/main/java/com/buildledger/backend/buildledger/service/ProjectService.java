package com.buildledger.backend.buildledger.service;

import com.buildledger.backend.buildledger.dto.request.CreateNewProjectDTO;
import com.buildledger.backend.buildledger.dto.responce.ResponseByIdProjectDTO;
import com.buildledger.backend.buildledger.dto.responce.ResponseNewProjectDTO;

import java.util.List;

public interface ProjectService {

    ResponseNewProjectDTO createNewProject(CreateNewProjectDTO newProjectDTO);


    ResponseByIdProjectDTO getProjectById(Long id);

    // Нов метод за взимане на всички проекти
    List<ResponseNewProjectDTO> getAllProjects();

    String getProjectByParcelId(Long id);
}
