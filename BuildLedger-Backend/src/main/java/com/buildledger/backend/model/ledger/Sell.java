package com.buildledger.backend.model.ledger;

import com.buildledger.backend.enums.SellStatus;
import com.buildledger.backend.model.sos.Apartment;
import com.buildledger.backend.model.sos.Garage;
import com.buildledger.backend.model.persons.Broker;
import com.buildledger.backend.model.persons.Purchaser;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
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
    private double brokerProfit;
    private double profit;

    private LocalDate contractDate;

    private SellStatus sellStatus;
    private String description;
    private String filePath;

    @ManyToOne()
    @JoinColumn(name = "broker_id")
    private Broker broker;

    @ManyToOne()
    @JoinColumn(name = "purchaser_id") // Променете името на колоната
    private Purchaser purchaser;

    @OneToMany(mappedBy = "sell")
    private Set<Apartment> apartments = new HashSet<>();

    @OneToMany(mappedBy = "sell")
    private Set<Garage> garages = new HashSet<>();

    @OneToOne
    @JoinColumn(name = "payment_id")
    private Payment payment;

}
