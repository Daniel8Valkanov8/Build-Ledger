package com.buildledger.backend.buildledger.model.ledger;

import com.buildledger.backend.buildledger.enums.Currency;
import com.buildledger.backend.buildledger.model.Project;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Entity
public class Income {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private long id;

        private String title;

        private double amount;

        private Currency currency;

        private LocalDate date;

        private String note;

        private boolean isPayed;

        @OneToOne
        @JoinColumn(name = "installment_id")
        private Installment installment;

        @ManyToOne
        @JoinColumn(name = "project_id")
        private Project project;
}
