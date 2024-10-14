package com.buildledger.backend.dto.responce.objects;


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
    private double priceEur;
    private boolean sold;
    private String description;
    private int bedroomCount;
    private int bathroomCount;
    private String floor;
}