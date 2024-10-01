package com.buildledger.backend.dto.responce;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResponseParcelDTO {
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
    private Long projectId;
    private String projectTitle;
    private String status;
}
