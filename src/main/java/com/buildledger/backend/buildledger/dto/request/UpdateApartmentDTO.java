package com.buildledger.backend.buildledger.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UpdateApartmentDTO {

    private long id;
    private long cooperationId;
    private String number;
    private double area;
    private double priceEur;
    private int bedroomCount;
    private int bathroomCount;
    private long floorId;

}
