package com.buildledger.backend.dto.request;

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
    private int bedroomCount;
    private int bathroomCount;
    private long floorId;
    private double priceEur;

}
