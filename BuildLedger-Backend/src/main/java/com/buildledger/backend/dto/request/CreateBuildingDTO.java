package com.buildledger.backend.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateBuildingDTO {

    private String title;
    private String description;

    private int garageCount;
    private int parkingPlaceCount;
    private int floorCount;
    private int undergroundFloorCount;
    private int apartmentCount;

}
