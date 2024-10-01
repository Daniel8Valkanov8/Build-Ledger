package com.buildledger.backend.repository;

import com.buildledger.backend.model.ledger.PaymentSchema;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentSchemaRepository extends JpaRepository<PaymentSchema, Long> {

}
