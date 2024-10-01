package com.buildledger.backend.model.building;

import com.buildledger.backend.model.sos.Apartment;
import com.buildledger.backend.model.sos.Floor;
import com.buildledger.backend.model.sos.Garage;
import com.buildledger.backend.model.sos.ParkingPlace;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@Table(name = "cooperations")
public class Cooperation extends Building {

    private int undergroundFloorCount;
    private int apartmentCount;
    private final String TYPE = "Cooperation";


    @OneToMany(mappedBy = "cooperation", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Floor> floors = new HashSet<>();

    @OneToMany(mappedBy = "cooperation", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Apartment> apartments = new HashSet<>();

    @OneToMany(mappedBy = "cooperation", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Garage> garages = new HashSet<>();

    @OneToMany(mappedBy = "cooperation", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<ParkingPlace> parkingPlaces = new HashSet<>();

}
