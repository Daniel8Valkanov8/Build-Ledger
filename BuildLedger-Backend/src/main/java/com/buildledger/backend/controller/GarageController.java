package com.buildledger.backend.controller;

import com.buildledger.backend.dto.request.UpdateGarageDTO;

import com.buildledger.backend.dto.responce.ResponseGarageDTO;
import com.buildledger.backend.service.impl.building.GarageService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/garages")
public class GarageController {
    private final GarageService garageService;

    public GarageController(GarageService garageService) {
        this.garageService = garageService;
    }


    @GetMapping("/is-free/{id}")
    public ResponseEntity<List<ResponseGarageDTO>> getAllGaragesByCooperationID(@PathVariable long id) {
        System.out.println("Fetching garages" + id);
        List<ResponseGarageDTO> response = garageService.getAllFreeGaragesByCooperationID(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<ResponseGarageDTO>> getAllFreeGaragesByCooperationID(@PathVariable long id) {
        System.out.println("Fetching garages" + id);
        List<ResponseGarageDTO> response = garageService.getAllGaragesByCooperationID(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }


    @PutMapping("/update")
    public ResponseEntity<ResponseGarageDTO> updateGarage(@Valid @RequestBody UpdateGarageDTO updateGarageDTO) {
        System.out.println("Updating garage" + updateGarageDTO.getId());
        ResponseGarageDTO response = garageService.updateGarage(updateGarageDTO);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
