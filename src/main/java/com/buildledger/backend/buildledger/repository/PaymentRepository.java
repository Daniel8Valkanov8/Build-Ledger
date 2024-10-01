package com.buildledger.backend.buildledger.repository;

import com.buildledger.backend.buildledger.model.ledger.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long>
{
}
