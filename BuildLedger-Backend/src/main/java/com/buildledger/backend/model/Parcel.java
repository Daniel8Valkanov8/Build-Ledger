package com.buildledger.backend.model;

import com.buildledger.backend.model.building.Building;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@Table(name = "parcels")
public class Parcel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String eik;

    private String address;

    private double area;

    private boolean isCompensated;

    private boolean isRegular;

    private double percentageOfCompensation;

    private boolean withElectricityAndWater;

    private double priceBgn;

    private double priceEur;


    @OneToMany(mappedBy = "parcel", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Building> buildings = new HashSet<>();
    @ManyToOne()
    @JoinColumn(name = "project_id")
    private Project project;
}
