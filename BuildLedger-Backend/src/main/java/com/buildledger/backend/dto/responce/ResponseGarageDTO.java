package com.buildledger.backend.dto.responce;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ResponseGarageDTO {

    private long id;
    private String number;
    private boolean status;
    private double price;
    private long floorId;
}
