package com.buildledger.backend.controller;

import com.buildledger.backend.dto.request.CreateNewProjectDTO;
import com.buildledger.backend.dto.responce.ResponseParcelDTO;
import com.buildledger.backend.model.Parcel;
import com.buildledger.backend.model.Project;
import com.buildledger.backend.service.ParcelService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
@CrossOrigin(origins = "http://localhost:3000") // Заменете с адреса на вашето React приложение
@RestController
@RequestMapping("/parcels")
public class ParcelController {

    private final ParcelService parcelService;

    @Autowired
    public ParcelController(ParcelService parcelService) {
        this.parcelService = parcelService;
    }

    // Метод за получаване на всички парцели
    @GetMapping
    public ResponseEntity<List<ResponseParcelDTO>> getAllParcels() {
        List<ResponseParcelDTO> parcels = parcelService.findAllParcels();
        return new ResponseEntity<>(parcels, HttpStatus.OK);
    }

    // Метод за получаване на парцел по ID
    @GetMapping("/{id}")
    public ResponseEntity<ResponseParcelDTO> getParcelById(@PathVariable Long id) {
        Optional<ResponseParcelDTO> parcel = parcelService.findParcelById(id);
        return parcel.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }



    // Метод за създаване на нов Parcel чрез Project
    @PostMapping("/create")
    public ResponseEntity<Parcel> createParcel(@RequestBody CreateNewProjectDTO createNewProjectDTO, Project project) {
        Parcel createdParcel = parcelService.createParcelByProject(createNewProjectDTO, project);
        return new ResponseEntity<>(createdParcel, HttpStatus.CREATED);
    }

    // Метод за изтриване на парцел по ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteParcelById(@PathVariable Long id) {
        try {
            parcelService.deleteParcelById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
