package com.buildledger.backend.model.ledger;

import com.buildledger.backend.enums.PaymentStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column()
    @Enumerated(EnumType.STRING)
    private PaymentStatus paymentStatus;

    private double amountReceived;
    private double amountRemaining;

    @OneToMany(mappedBy = "payment", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Installment> installments = new HashSet<>();
    private int installmentCount;

    @OneToOne
    @JoinColumn(name = "sell_id")
    private Sell sell;
}
