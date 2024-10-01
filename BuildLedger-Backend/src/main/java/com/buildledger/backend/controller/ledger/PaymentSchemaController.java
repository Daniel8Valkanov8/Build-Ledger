package com.buildledger.backend.controller.ledger;

import com.buildledger.backend.dto.request.CreatePaymentSchemaDTO;
import com.buildledger.backend.dto.responce.ResponsePaymentSchemaDTO;
import com.buildledger.backend.service.PaymentSchemaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/payment-schema")
public class PaymentSchemaController {

    @Autowired
    private final PaymentSchemaService paymentSchemaService;

    public PaymentSchemaController(PaymentSchemaService paymentSchemaService) {
        this.paymentSchemaService = paymentSchemaService;
    }

    @PostMapping("/create")
    public ResponseEntity<ResponsePaymentSchemaDTO> createPaymentSchema(@RequestBody CreatePaymentSchemaDTO createPaymentSchemaDTO) {
        System.out.println("In controller: " + createPaymentSchemaDTO);
        ResponsePaymentSchemaDTO response = paymentSchemaService.createPaymentSchema(createPaymentSchemaDTO);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<ResponsePaymentSchemaDTO>> getAllPaymentSchemas() {
        List<ResponsePaymentSchemaDTO> response = paymentSchemaService.getAllPaymentSchemas();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponsePaymentSchemaDTO> getPaymentSchemaById(@PathVariable Long id) {
        Optional<ResponsePaymentSchemaDTO> response = paymentSchemaService.getPaymentSchemaById(id);
        return response.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePaymentSchema(@PathVariable Long id) {
        paymentSchemaService.deletePaymentSchema(id);
        return ResponseEntity.noContent().build();
    }
}
