package com.buildledger.backend.dto.responce;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResponseMessageDTO {
    private String message;

    public ResponseMessageDTO(String message) {
        this.message = message;
    }
}
