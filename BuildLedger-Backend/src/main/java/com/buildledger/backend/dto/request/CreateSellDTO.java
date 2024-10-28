package com.buildledger.backend.dto.request;

import com.buildledger.backend.dto.nested.InstallmentAndDate;
import com.buildledger.backend.dto.nested.SelfContainedUnits;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Setter
public class CreateSellDTO {
    private String purchaserFirstName;
    private String purchaserLastName;
    private String purchaserEmail;
    private String brokerFirstName;
    private String brokerLastName;
    private String brokerEmail;


    private SelfContainedUnits[] selfContainedUnits;
    private double discountInEuro;
    private double brokerProfitInPercentage;
    private double totalPriceInEuro;
    private double brokerProfitInEuro;
    private String paymentSchema;
    private InstallmentAndDate[] installmentAndDates;
    private LocalDate contractDate;
    private String description;
    private double price;

}
