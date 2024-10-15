package com.buildledger.backend.dto.request;

import com.buildledger.backend.enums.Stage;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateCooperationDTO {
    private long id;
    private String description;
    private double rsp;
    private String stage;

}
