package com.buildledger.backend.dto.responce;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResponseBuildingDTO {

    private long id;

    private String title;

    private String description;

    public ResponseBuildingDTO(long id, String title, String description) {
        this.id = id;
        this.title = title;
        this.description = description;
    }
}
