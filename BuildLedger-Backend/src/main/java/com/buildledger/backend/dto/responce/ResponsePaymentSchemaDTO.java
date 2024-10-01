package com.buildledger.backend.dto.responce;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ResponsePaymentSchemaDTO {
    private long id;
    private String title;
    private int installmentCount;
    private List<Integer> percentOfInstallments;
}
