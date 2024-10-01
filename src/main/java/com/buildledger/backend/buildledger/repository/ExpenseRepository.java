package com.buildledger.backend.buildledger.repository;

import com.buildledger.backend.buildledger.model.ledger.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long> {
}
