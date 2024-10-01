package com.buildledger.backend.dto.responce;

import lombok.Getter;

import java.time.LocalDate;
@Getter
public class ResponseNewProjectDTO {
    private long id;
    private String title;
    private String eik;
    private String address;
    private String parcelArea;
    private LocalDate startDate;
    private LocalDate endDate;
    private int buildingCount;
    private String buildingStatus;

    public ResponseNewProjectDTO() {
    }

    public ResponseNewProjectDTO(long id,
                                 String title,
                                 String eik,
                                 LocalDate startDate,
                                 LocalDate endDate) {
        this.id = id;
        this.title = title;
        this.eik = eik;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}
