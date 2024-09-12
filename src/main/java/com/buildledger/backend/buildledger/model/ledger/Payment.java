package com.buildledger.backend.buildledger.model;

import com.buildledger.backend.buildledger.enums.PaymentStatus;
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

    private double amountReceivedLv;
    private double amountRemainingLv;

    @OneToMany(mappedBy = "payment", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Installment> installments = new HashSet<>();
    private int installmentCount;

    private String note;

    @OneToOne
    @JoinColumn(name = "sell_id")
    private Sell sell;
}
