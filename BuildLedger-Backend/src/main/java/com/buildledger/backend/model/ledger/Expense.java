package com.buildledger.backend.model.ledger;

import com.buildledger.backend.enums.ExpenseStatus;

import com.buildledger.backend.model.Project;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Entity
public class Expense {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;


    private String title;
    private String unitOfMeasurement;
    private ExpenseStatus expenseStatus;
    private double amountBgn;
    private double amountEur;
    private LocalDate date;
    private String note;
    private String factureNumber;

    @ManyToOne
    @JoinColumn(name = "project_id")
    private Project project;
}
