package com.buildledger.backend.model.sos;

import com.buildledger.backend.model.building.Building;
import com.buildledger.backend.model.ledger.Sell;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity
public class Apartment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String number;
    private double priceEur;

    private double area;
    private boolean sold;
    private String description;
    private int bedroomCount;
    private int bathroomCount;


    //todo redaction: add cooperation id colum
    @ManyToOne
    @JoinColumn(name = "floor_id")
    private Floor floor;

    @ManyToOne
    @JoinColumn(name = "building_id")
    private Building cooperation;

    @ManyToOne
    @JoinColumn(name = "sell_id")
    private Sell sell;

    @OneToMany(mappedBy = "apartment", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Garage> garages = new HashSet<>();

    public Apartment(String number) {
        this.number = number;
    }

    public Apartment() {
    }
}
