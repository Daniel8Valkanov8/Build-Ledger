package com.buildledger.backend;


import com.buildledger.backend.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class TestComponent {

    private final ProjectService projectService;

    @Autowired
    public TestComponent(ProjectService projectService) {
        this.projectService = projectService;
    }

    public void test() {
       // CreateNewProjectDTO createNewProjectDTO = new CreateNewProjectDTO(
       //         "Obelya",
       //         "231.003.22.1.1",
       //         "Obelq nomer 7",
       //         1500,
       //         LocalDate.now(),
       //         LocalDate.of(25,12,22),
       //         1,
       //         "Cooperation"
       // );
//
       // ResponseNewProjectDTO responseNewProjectDTO
       //         = projectService.createNewProject(createNewProjectDTO);
       // System.out.println(responseNewProjectDTO.toString());
//
       // System.out.println("test");
   }
}
