package com.buildledger.backend.service;

import com.buildledger.backend.dto.request.CreatePaymentSchemaDTO;
import com.buildledger.backend.dto.responce.ResponsePaymentSchemaDTO;
import com.buildledger.backend.model.ledger.PaymentSchema;
import com.buildledger.backend.repository.PaymentSchemaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PaymentSchemaService {


    private final PaymentSchemaRepository paymentSchemaRepository;

    public PaymentSchemaService(PaymentSchemaRepository paymentSchemaRepository) {
        this.paymentSchemaRepository = paymentSchemaRepository;
    }

    public ResponsePaymentSchemaDTO createPaymentSchema(CreatePaymentSchemaDTO createPaymentSchemaDTO) {
        PaymentSchema paymentSchema = new PaymentSchema();
        paymentSchema.setTitle(createPaymentSchemaDTO.getTitle());
        paymentSchema.setInstallmentCount(createPaymentSchemaDTO.getInstallmentCount());
        paymentSchema.setPercentOfInstallments(createPaymentSchemaDTO.getPercentOfInstallments());

        PaymentSchema savedPaymentSchema = paymentSchemaRepository.save(paymentSchema);
        return new ResponsePaymentSchemaDTO(
                savedPaymentSchema.getId(),
                savedPaymentSchema.getTitle(),
                savedPaymentSchema.getInstallmentCount(),
                savedPaymentSchema.getPercentOfInstallments()
        );
    }

    public List<ResponsePaymentSchemaDTO> getAllPaymentSchemas() {
        List<PaymentSchema> paymentSchemas = paymentSchemaRepository.findAll();
        return paymentSchemas.stream().map(schema ->
                new ResponsePaymentSchemaDTO(
                        schema.getId(),
                        schema.getTitle(),
                        schema.getInstallmentCount(),
                        schema.getPercentOfInstallments()
                )).toList();
    }

    public Optional<ResponsePaymentSchemaDTO> getPaymentSchemaById(Long id) {
        return paymentSchemaRepository.findById(id)
                .map(schema -> new ResponsePaymentSchemaDTO(
                        schema.getId(),
                        schema.getTitle(),
                        schema.getInstallmentCount(),
                        schema.getPercentOfInstallments()
                ));
    }

    public void deletePaymentSchema(Long id) {
        paymentSchemaRepository.deleteById(id);
    }
}
