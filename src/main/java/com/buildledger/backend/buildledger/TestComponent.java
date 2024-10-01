package com.buildledger.backend.buildledger;


import com.buildledger.backend.buildledger.dto.request.CreateNewProjectDTO;
import com.buildledger.backend.buildledger.dto.responce.ResponseNewProjectDTO;
import com.buildledger.backend.buildledger.model.sos.Apartment;
import com.buildledger.backend.buildledger.model.sos.Garage;
import com.buildledger.backend.buildledger.model.sos.ParkingPlace;
import com.buildledger.backend.buildledger.repository.ApartmentRepository;
import com.buildledger.backend.buildledger.repository.GarageRepository;
import com.buildledger.backend.buildledger.repository.ParkingPlaceRepository;
import com.buildledger.backend.buildledger.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class TestComponent {

    private final ProjectService projectService;
    private final ApartmentRepository apartmentRepository;
    private final GarageRepository garageRepository;
    private final ParkingPlaceRepository parkingPlaceRepository;

    @Autowired
    public TestComponent(ProjectService projectService, ApartmentRepository apartmentRepository, GarageRepository garageRepository, ParkingPlaceRepository parkingPlaceRepository) {
        this.projectService = projectService;
        this.apartmentRepository = apartmentRepository;
        this.garageRepository = garageRepository;
        this.parkingPlaceRepository = parkingPlaceRepository;
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

        for(Apartment apartment : apartmentRepository.findAll()) {
            Boolean isSold = apartment.isSold();
            if (isSold == null){
                apartment.setSold(false);
            }
        }

        for (Garage garage : garageRepository.findAll()) {
            Boolean isSold = garage.isSold();
            if (isSold == null){
                garage.setSold(false);
            }
        }
        for (ParkingPlace parkingPlace : parkingPlaceRepository.findAll()) {
            Boolean isSold = parkingPlace.isSold();
            if (isSold == null){
                parkingPlace.setSold(false);
            }
        }
   }
}
