package com.buildledger.backend.dto.responce;

import com.buildledger.backend.model.Parcel;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
@Getter
@Setter
public class ResponseByIdProjectDTO {

    private long id;
    private String title;
    private LocalDate startDate;
    private LocalDate endDate;
    private String eik;
    private String buildingStatus;
    private long parcel;


    public ResponseByIdProjectDTO(long id, String title, LocalDate startDate, LocalDate endDate, String eik, String buildingStatus, long parcel) {
        this.id = id;
        this.title = title;
        this.startDate = startDate;
        this.endDate = endDate;
        this.eik = eik;
        this.buildingStatus = buildingStatus;
        this.parcel = parcel;
    }
}
