package com.buildledger.backend.buildledger.model;


import com.buildledger.backend.buildledger.enums.Currency;
import com.buildledger.backend.buildledger.enums.IsPayStatus;
import com.buildledger.backend.buildledger.enums.TransactionStatus;
import com.buildledger.backend.buildledger.model.persons.Purchaser;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;


@Entity
@Getter
@Setter
public class Installment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private double installmentAmount;

    @Column
    @Enumerated(EnumType.STRING)
    private Currency currency;

    @Column
    @Enumerated(EnumType.STRING)
    private TransactionStatus transactionStatus;

    @ManyToOne
    @JoinColumn(name = "purchaser_id")
    private Purchaser purchaser;


    @Column
    private LocalDate installmentDate;

    @Column
    @Enumerated(EnumType.STRING)
    private IsPayStatus isPayStatus;

    @Column
    private String note;

    @ManyToOne
    @JoinColumn(name = "sell_id")
    private Payment payment;
}
