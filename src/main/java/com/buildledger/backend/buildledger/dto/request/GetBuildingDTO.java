package com.buildledger.backend.buildledger.dto.request;


import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class GetBuildingDTO {

    private Long parcelId;
    private String buildingStatus;

}
