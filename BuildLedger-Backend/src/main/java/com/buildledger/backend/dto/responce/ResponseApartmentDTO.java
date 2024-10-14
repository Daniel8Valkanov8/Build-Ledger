package com.buildledger.backend.dto.responce;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ResponseApartmentDTO {
    private long id;
    private String number;
    private double area;
    private double balconyArea;
    private double priceLv;
    private double priceEur;
    private long floorId;
    private boolean sold;
    private String description;
    private int bedroomCount;
    private int bathroomCount;
}
