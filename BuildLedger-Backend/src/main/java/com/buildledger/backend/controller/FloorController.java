package com.buildledger.backend.controller;

import com.buildledger.backend.dto.responce.ResponseFloorDTO;
import com.buildledger.backend.service.impl.building.FloorService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/floors/{id}")
public class FloorController {
    private final FloorService floorService;

    public FloorController(FloorService floorService) {
        this.floorService = floorService;
    }

    @GetMapping
    public ResponseEntity<List<ResponseFloorDTO>> getAllFloorsByCooperationID(@PathVariable long id) {
        System.out.println("Fetching floors for cooperation ID: " + id);
        List<ResponseFloorDTO> response = floorService.getAllFloorsByCooperationID(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
