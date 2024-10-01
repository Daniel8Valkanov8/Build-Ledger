package com.buildledger.backend.controller;

import com.buildledger.backend.dto.request.CreateNewProjectDTO;
import com.buildledger.backend.dto.responce.ResponseByIdProjectDTO;
import com.buildledger.backend.dto.responce.ResponseNewProjectDTO;
import com.buildledger.backend.service.ProjectService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/projects")
public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @PostMapping("/create")
    public ResponseEntity<ResponseNewProjectDTO> createNewProject(
            @Valid @RequestBody CreateNewProjectDTO createNewProjectDTO) {
        ResponseNewProjectDTO response = projectService.createNewProject(createNewProjectDTO);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseByIdProjectDTO> getProjectById(@PathVariable Long id) {
        ResponseByIdProjectDTO project = projectService.getProjectById(id);
        return ResponseEntity.ok(project);
    }

    @GetMapping("/parcel/{id}")
    public ResponseEntity<String> getProjectByParcelId(@PathVariable Long id) {
        System.out.println("in controller");
        String projectTitle = projectService.getProjectByParcelId(id);
        return ResponseEntity.ok(projectTitle);
    }


    @GetMapping("/all")
    public ResponseEntity<List<ResponseNewProjectDTO>> getAllProjects() {
        List<ResponseNewProjectDTO> projects = projectService.getAllProjects();
        return ResponseEntity.ok(projects);
    }
}
