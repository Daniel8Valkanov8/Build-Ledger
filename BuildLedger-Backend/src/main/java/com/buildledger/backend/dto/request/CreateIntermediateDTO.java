package com.buildledger.backend.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CreateIntermediateDTO {
    private long id;

    private int entrance;
    private int floor;
    private int undergroundFloor;

    private int apartment;
    private int garage;
    private int parkingPlace;

    @Override
    public String toString() {
        return "CreateIntermediateDTO{" +
                "id=" + id +
                ", entrance=" + entrance +
                ", floor=" + floor +
                ", undergroundFloor=" + undergroundFloor +
                ", apartment=" + apartment +
                ", garage=" + garage +
                ", parkingPlace=" + parkingPlace +
                '}';
    }
}
