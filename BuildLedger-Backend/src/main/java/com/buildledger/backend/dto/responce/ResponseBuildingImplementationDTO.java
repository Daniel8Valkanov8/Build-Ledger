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
    private int entranceCount;
    private Set<Stage> stages;

    private  String Type; ;

    public ResponseBuildingImplementationDTO(String title) {
        this.title = title;
    }
}
