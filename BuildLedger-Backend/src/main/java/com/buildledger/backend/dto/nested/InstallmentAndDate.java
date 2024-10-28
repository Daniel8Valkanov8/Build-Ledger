package com.buildledger.backend.dto.nested;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class InstallmentAndDate {
    private String installment;
    private double sumInEuros;
    private LocalDate date;
}
