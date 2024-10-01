package com.buildledger.backend.dto.responce;

import com.buildledger.backend.enums.Stage;
import com.buildledger.backend.model.sos.Floor;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;
@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class ResponseBuildingImplementationDTO {

    private long id;
    private String title;
    private String description;
    private double rsp;  // retail selling price
    private int garageCount;
    private int parkingPlaceCount;
    private int floorCount;
    private Set<Stage> stages;
    private int undergroundFloorCount;
    private int apartmentCount;
    private  String Type; ;
    private Set<Floor> floors;
}
