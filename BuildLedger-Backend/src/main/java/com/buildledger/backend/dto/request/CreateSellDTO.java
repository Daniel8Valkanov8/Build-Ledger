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

    //todo
    private String paymentSchema;
    private InstallmentAndDate[] installmentAndDates;

    private SelfContainedUnits[] selfContainedUnits;
    private double discountInEuro;
    private double totalPriceInEuro;
    private double brokerProfitInPercentage;
    private double brokerProfitInEuro;
    //todo add contract date in frontend
    private LocalDate contractDate;

    //ready
    private String purchaserFirstName;
    private String purchaserLastName;
    private String purchaserEmail;
    private String brokerFirstName;
    private String brokerLastName;
    private String brokerEmail;



    private String description;
    private double price;

}
