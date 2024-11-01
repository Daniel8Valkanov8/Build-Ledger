package com.buildledger.backend.model.ledger.accounting;

import com.buildledger.backend.model.Project;
import com.buildledger.backend.model.building.Building;
import com.buildledger.backend.model.ledger.Installment;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Income extends BaseLedger {

        @OneToOne
        @JoinColumn(name = "installment_id")
        private Installment installment;

        @ManyToOne
        @JoinColumn(name = "building_id")
        private Building building;

        @ManyToOne
        @JoinColumn(name = "project_id")
        private Project project;
}
