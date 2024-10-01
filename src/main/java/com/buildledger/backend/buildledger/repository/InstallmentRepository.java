package com.buildledger.backend.buildledger.repository;

import com.buildledger.backend.buildledger.model.ledger.Installment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InstallmentRepository extends JpaRepository<Installment, Long> {
}
