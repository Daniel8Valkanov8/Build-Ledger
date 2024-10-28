package com.buildledger.backend.model.ledger;

import com.buildledger.backend.enums.Currency;
import com.buildledger.backend.model.Project;
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

        private boolean isPayed;

        @OneToOne
        @JoinColumn(name = "installment_id")
        private Installment installment;

        @ManyToOne
        @JoinColumn(name = "project_id")
        private Project project;
}
