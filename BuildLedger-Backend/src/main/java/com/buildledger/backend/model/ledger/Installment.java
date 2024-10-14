package com.buildledger.backend.model.ledger;

import com.buildledger.backend.enums.Currency;
import com.buildledger.backend.enums.IsPayStatus;
import com.buildledger.backend.enums.TransactionStatus;
import com.buildledger.backend.model.persons.Purchaser;
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

    private double amountInPercent;

    private double installmentAmount;

    @Column
    @Enumerated(EnumType.STRING)
    private Currency currency;

    @Column
    private LocalDate installmentDate;

    @Column
    @Enumerated(EnumType.STRING)
    private TransactionStatus transactionStatus;

    @ManyToOne
    @JoinColumn(name = "purchaser_id")
    private Purchaser purchaser;

    private double installmentReceivedAmount;

    @Column
    @Enumerated(EnumType.STRING)
    private IsPayStatus isPayStatus;

    @Column
    private String note;

    @ManyToOne
    @JoinColumn(name = "sell_id")
    private Payment payment;
}