package com.buildledger.backend.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateParkingPlaceDTO {

    private long id;
    private String number;
    private double priceEur;
    private long floorId;
}
