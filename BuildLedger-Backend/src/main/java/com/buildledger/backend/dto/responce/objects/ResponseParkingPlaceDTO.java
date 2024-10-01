package com.buildledger.backend.dto.responce.objects;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ResponseParkingPlaceDTO {
    private long id;
    private String number;
    private double priceEur;
    private boolean sold;
}
