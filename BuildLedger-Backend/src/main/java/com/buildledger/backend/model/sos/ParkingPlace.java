package com.buildledger.backend.model.sos;

import com.buildledger.backend.model.building.Building;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "parking_places")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ParkingPlace {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String number;
    private double priceEur;
    private boolean sold;
    private String description;


    @ManyToOne
    @JoinColumn(name = "building_id")
    private Building cooperation;

    public ParkingPlace(String number) {
        this.number = number;
    }
}