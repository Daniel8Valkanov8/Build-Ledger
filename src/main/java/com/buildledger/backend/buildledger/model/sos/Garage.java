package com.buildledger.backend.buildledger.model;


import com.buildledger.backend.buildledger.model.ledger.Sell;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "garages")
public class Garage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String number;
    private double priceLv;
    private double priceEur;
    private boolean sold;
    private String description;


    @ManyToOne
    @JoinColumn(name = "floor_id")
    private Floor floor;

    @ManyToOne
    @JoinColumn(name = "sell_id")
    private Sell sell;

    @ManyToOne
    @JoinColumn(name = "apartment_id")
    private Apartment apartment;

    public Garage(String number) {
        this.number = number;
    }

    public Garage() {

    }
}
