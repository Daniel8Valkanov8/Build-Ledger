package com.buildledger.backend.repository;

import com.buildledger.backend.model.ledger.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long>
{
}
