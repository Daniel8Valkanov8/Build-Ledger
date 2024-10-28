package com.buildledger.backend.controller.ledger;

import com.buildledger.backend.dto.request.CreateSellDTO;
import com.buildledger.backend.service.impl.SellService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

@RequestMapping("/cooperation")
public class SellController {

    private final SellService sellService;

    public SellController(SellService sellService) {
        this.sellService = sellService;
    }

    @PostMapping("/{id}/create-sell")
    public ResponseEntity<String> createSell(@PathVariable Long id, @RequestParam MultipartFile contract,
                                            @RequestParam @Valid CreateSellDTO createSellDTO)
    {
        String response = sellService.createSell(id,contract, createSellDTO);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
