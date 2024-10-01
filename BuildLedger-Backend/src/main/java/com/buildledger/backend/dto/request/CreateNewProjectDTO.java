package com.buildledger.backend.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDate;
@Getter
@AllArgsConstructor
public class CreateNewProjectDTO {

    private String title;
    private String eik;
    private String address;
    private double parcelArea;
    private LocalDate startDate;
    private LocalDate endDate;
    private int buildingCount;
    private String buildingStatus;


}
