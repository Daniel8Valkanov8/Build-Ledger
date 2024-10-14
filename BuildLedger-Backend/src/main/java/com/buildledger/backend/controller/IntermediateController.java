package com.buildledger.backend.controller;

import com.buildledger.backend.dto.request.CreateIntermediateDTO;
import com.buildledger.backend.dto.responce.ResponseMessageDTO;
import com.buildledger.backend.service.impl.building.*;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/quick-create")
public class IntermediateController {
    private final CooperationService cooperationService;
    private final GarageService garageService;
    private final FloorService floorService;
    private final ApartmentService apartmentService;
    private final ParkingPlaceService parkingPlaceService;

    public IntermediateController(CooperationService cooperationService, GarageService garageService, FloorService floorService, ApartmentService apartmentService, ParkingPlaceService parkingPlaceService) {
        this.cooperationService = cooperationService;
        this.garageService = garageService;
        this.floorService = floorService;
        this.apartmentService = apartmentService;
        this.parkingPlaceService = parkingPlaceService;
    }


    @PostMapping()
    public ResponseEntity<List<ResponseMessageDTO>> createIntermediate(@Valid @RequestBody CreateIntermediateDTO createIntermediateDTO) {

        List<ResponseMessageDTO> response = new ArrayList<>();
        cooperationService.addEntryToCooperation(createIntermediateDTO);
        response.add(new ResponseMessageDTO("Entrance added successfully"));
        //todo print
        parkingPlaceService.createParkingPlaceByCount(createIntermediateDTO);
        response.add(new ResponseMessageDTO("Parking place created successfully"));
        //Floor creation in cooperation
        floorService.createFloorByCount(createIntermediateDTO);
        response.add(new ResponseMessageDTO("Floor created successfully"));
        floorService.createUndergroundFloor(createIntermediateDTO);
        response.add(new ResponseMessageDTO("Underground floor created successfully"));
        apartmentService.createApartmentByCount(createIntermediateDTO);
        response.add(new ResponseMessageDTO("Apartment created successfully"));

        garageService.createGarageByCount(createIntermediateDTO);
        response.add(new ResponseMessageDTO("Garage created successfully"));
        System.out.println(createIntermediateDTO.toString());
        return new ResponseEntity<>(response, HttpStatus.OK);

    }
}
