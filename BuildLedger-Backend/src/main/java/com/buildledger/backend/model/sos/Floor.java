package com.buildledger.backend.model.sos;

import com.buildledger.backend.model.building.Building;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;


@Getter
@Setter
@Entity
public class Floor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false,unique = true)
    private String number;

    private Double commonArea;
    private int apartmentCount;
    private int fromApartmentNumber;
    private int toApartmentNumber;
    @OneToMany(mappedBy = "floor", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Apartment> apartments = new HashSet<>();

    @OneToMany(mappedBy = "floor", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Garage> garages = new HashSet<>();

    @ManyToOne
    //todo redaction of colum name
    @JoinColumn(name = "building_id")
    private Building cooperation;

    public Floor(String number) {
        this.number = number;
    }

    public Floor() {

    }
}
