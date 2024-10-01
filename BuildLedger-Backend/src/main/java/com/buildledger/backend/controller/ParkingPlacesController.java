package com.buildledger.backend.controller;

import com.buildledger.backend.dto.request.UpdateParkingPlaceDTO;
import com.buildledger.backend.service.impl.building.ParkingPlaceService;
import com.buildledger.backend.dto.responce.objects.ResponseParkingPlaceDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController()
@RequestMapping("/parking-places")
public class ParkingPlacesController {
    private final ParkingPlaceService parkingPlacesService;

    public ParkingPlacesController(ParkingPlaceService parkingPlacesService) {
        this.parkingPlacesService = parkingPlacesService;
    }
    @GetMapping("/{id}")
    public ResponseEntity<List<ResponseParkingPlaceDTO>> getAllParkingPlacesByCooperationID(@PathVariable long id) {

        List<ResponseParkingPlaceDTO> response = parkingPlacesService.getAllParkingPlacesByCooperationID(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<ResponseParkingPlaceDTO> updateParkingPlace(@RequestBody UpdateParkingPlaceDTO updateParkingPlaceDTO) {
        ResponseParkingPlaceDTO response = parkingPlacesService.updateParkingPlace(updateParkingPlaceDTO);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}
