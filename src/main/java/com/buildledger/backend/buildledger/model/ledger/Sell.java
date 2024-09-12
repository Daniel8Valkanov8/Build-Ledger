package com.buildledger.backend.buildledger.model;

import com.buildledger.backend.buildledger.model.persons.Broker;
import com.buildledger.backend.buildledger.model.persons.Purchaser;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;
@Entity
@Getter
@Setter
public class Sell {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private double fixedPrice;
    private double discountInPercent;
    private double sellPrice;

    @ManyToOne()
    @JoinColumn(name = "broker_id")
    private Broker broker;

    @ManyToOne()
    @JoinColumn(name = "purchaser_id") // Променете името на колоната
    private Purchaser purchaser;

    @OneToMany(mappedBy = "sell")
    private Set<Apartment> apartments = new HashSet<>();

    @OneToOne
    @JoinColumn(name = "payment_id")
    private Payment payment;

}
