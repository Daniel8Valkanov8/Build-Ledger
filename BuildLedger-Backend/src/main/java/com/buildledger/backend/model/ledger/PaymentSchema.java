package com.buildledger.backend.model.ledger;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
@Getter
@Setter
@Entity
public class PaymentSchema {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String title;
    private int installmentCount;

    @ElementCollection
    @CollectionTable(name = "payment_schema_installments", joinColumns = @JoinColumn(name = "payment_schema_id"))
    @Column(name = "percent")
    private List<Integer> percentOfInstallments;

}
