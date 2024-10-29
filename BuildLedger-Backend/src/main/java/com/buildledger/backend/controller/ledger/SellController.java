package com.buildledger.backend.controller.ledger;

import com.buildledger.backend.dto.request.CreateSellDTO;
import com.buildledger.backend.service.impl.SellService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@CrossOrigin("localhost:3000")
@RequestMapping("/cooperation")
public class SellController {

    private final SellService sellService;

    public SellController(SellService sellService) {
        this.sellService = sellService;
    }

    @PostMapping("/{id}/create-sell")
    public ResponseEntity<String> createSell(
            @PathVariable Long id,
            @RequestBody @Valid CreateSellDTO createSellDTO) {

        String response = sellService.createSell(id, createSellDTO);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
