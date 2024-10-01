package com.buildledger.backend.service.impl;

import com.buildledger.backend.dto.request.CreateNewProjectDTO;
import com.buildledger.backend.dto.responce.ResponseByIdProjectDTO;
import com.buildledger.backend.dto.responce.ResponseNewProjectDTO;
import com.buildledger.backend.model.Parcel;
import com.buildledger.backend.model.Project;
import com.buildledger.backend.repository.ParcelRepository;
import com.buildledger.backend.repository.ProjectRepository;
import com.buildledger.backend.service.ParcelService;
import com.buildledger.backend.service.ProjectService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProjectServiceImpl implements ProjectService {
    private final ProjectRepository projectRepository;
    private final ParcelService parcelService;

    private final ParcelRepository parcelRepository;



    public ProjectServiceImpl(ProjectRepository projectRepository,
                              ParcelService parcelService, ParcelRepository parcelRepository, ParcelRepository parcelRepository1) {
        this.projectRepository = projectRepository;
        this.parcelService = parcelService;
        this.parcelRepository = parcelRepository1;
    }

    @Override
    public ResponseNewProjectDTO createNewProject(CreateNewProjectDTO newProjectDTO) {
        Project project = new Project();
        project.setTitle(newProjectDTO.getTitle());
        project.setEik(newProjectDTO.getEik());
        project.setStartDate(newProjectDTO.getStartDate());
        project.setEndDate(newProjectDTO.getEndDate());
        project.setBuildingStatus(newProjectDTO.getBuildingStatus());
        Project savedProject = projectRepository.save(project);

        // Създаване на Parcel и запис в контекста
        Parcel parcel = parcelService.createParcelByProject(newProjectDTO,savedProject);
        savedProject.setParcel(parcel);
        parcel.setProject(savedProject);

        projectRepository.save(savedProject);
        parcelRepository.save(parcel);

        return new ResponseNewProjectDTO();
    }




    @Override
    public ResponseByIdProjectDTO getProjectById(Long id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        // Конвертиране на Project в DTO (тук трябва да се разшири ResponseNewProjectDTO)
        return new ResponseByIdProjectDTO(
                project.getId(),
                project.getTitle(),
                project.getStartDate(),
                project.getEndDate(),
                project.getEik(),
                project.getBuildingStatus(),
                project.getParcel().getId());
    }

    @Override
    public List<ResponseNewProjectDTO> getAllProjects() {
        return projectRepository.findAll().stream()
                .map(project -> new ResponseNewProjectDTO(project.getId(), project.getTitle(),
                        project.getEik(), project.getStartDate(),
                        project.getEndDate()))
                .collect(Collectors.toList());
    }

    @Override
    public String getProjectByParcelId(Long id) {
        String project = projectRepository.findByParcelId(id).getTitle();

        return project;
    }
}