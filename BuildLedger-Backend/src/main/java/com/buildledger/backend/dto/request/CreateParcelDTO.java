package com.buildledger.backend.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateParcelDTO {
    private String eik;
    private String address;
    private double area;
    private boolean isCompensated;
    private boolean isRegular;
    private double percentageOfCompensation;
    private boolean withElectricityAndWater;
    private double priceBgn;
    private double priceEur;
    private Long projectId;  // ID на проекта, към който принадлежи парцелът
}
