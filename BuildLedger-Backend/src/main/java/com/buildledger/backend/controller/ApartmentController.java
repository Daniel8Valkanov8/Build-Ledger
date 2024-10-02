package com.buildledger.backend.controller;

import com.buildledger.backend.dto.request.UpdateApartmentDTO;
import com.buildledger.backend.dto.responce.ResponseApartmentDTO;
import com.buildledger.backend.service.impl.building.ApartmentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/apartments") // Основният път
public class ApartmentController {
    private final ApartmentService apartmentService;

    public ApartmentController(ApartmentService apartmentService) {
        this.apartmentService = apartmentService;
    }

    // Метод за получаване на апартаментите по ID на кооперацията с GET заявка
    @GetMapping({"/{id}"})
    public ResponseEntity<List<ResponseApartmentDTO>> getAllApartmentsByCooperationID(@PathVariable long id) {
        System.out.println("Fetching apartments for cooperation ID: " + id);
        List<ResponseApartmentDTO> response = apartmentService.getAllApartmentsByCooperationID(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("is-free/{id}")
    public ResponseEntity<List<ResponseApartmentDTO>> getAllFreeApartmentsByCooperationID(@PathVariable long id) {
        System.out.println("Fetching apartments for cooperation ID: " + id);
        List<ResponseApartmentDTO> response = apartmentService.getAllFreeApartmentsByCooperationID(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @PutMapping("/update")
    public ResponseEntity<ResponseApartmentDTO> updateApartment(@RequestBody UpdateApartmentDTO updateApartmentDTO) {
        ResponseApartmentDTO response = apartmentService.updateApartment(updateApartmentDTO);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
