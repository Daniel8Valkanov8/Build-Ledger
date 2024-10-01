package com.buildledger.backend.dto;

import lombok.Getter;

@Getter
public class CreateParcelDto {
    private String eik;

    private String address;

    private double area;

    public CreateParcelDto(String eik, String address, double area) {
        this.eik = eik;
        this.address = address;
        this.area = area;
    }
}
