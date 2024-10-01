package com.buildledger.backend.buildledger.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UpdateGarageDTO {
    private long id;
    private double priceEur;
    private long floorID;
}
