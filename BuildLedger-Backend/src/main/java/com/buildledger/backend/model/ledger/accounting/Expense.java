package com.buildledger.backend.model.ledger.accounting;

import com.buildledger.backend.enums.ExpenseStatus;

import com.buildledger.backend.model.Project;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Entity
public class Expense extends BaseLedger {

    private String note;
    private String factureNumber;

    @ManyToOne
    @JoinColumn(name = "project_id")
    private Project project;
}
