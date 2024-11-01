package com.buildledger.backend.dto.request;

import com.buildledger.backend.dto.nested.InstallmentAndDate;
import com.buildledger.backend.dto.nested.SelfContainedUnits;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Arrays;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Setter
public class CreateSellDTO {
    private double discountInEuro;
    private double totalPriceInEuro;

    private String paymentSchema;  // paymentSchemaId -> paymentSchema
    private InstallmentAndDate[] installmentAndDates; // installments -> installmentAndDates
    private SelfContainedUnits[] selfContainedUnits;


    private double brokerProfitInPercentage;
    private double brokerProfitInEuro;


    private String purchaserFirstName;
    private String purchaserLastName;
    private String purchaserEmail;
    private String brokerFirstName;
    private String brokerLastName;
    private String brokerEmail;
    private String description;

    @Override
    public String toString() {
        StringBuilder jsonBuilder = new StringBuilder();
        jsonBuilder.append("{\n");

        jsonBuilder.append("  \"paymentSchema\": \"").append(paymentSchema).append("\",\n");
        for (InstallmentAndDate installmentAndDate : this.installmentAndDates) {
            jsonBuilder.append("  \"installmentAndDate\": ").append(installmentAndDate).append(",\n");
            jsonBuilder.append("  \"sumInEuros\": ").append(installmentAndDate.getSumInEuros()).append(",\n");
            jsonBuilder.append("  \"date\": \"").append(installmentAndDate.getDate().toString()).append("\",\n");

        }

        for (SelfContainedUnits selfContainedUnit : selfContainedUnits) {
            jsonBuilder.append("  \"selfContainedUnit\": ").append(selfContainedUnit).append(",\n");
            jsonBuilder.append("  \"id\": ").append(selfContainedUnit.getId()).append(",\n");
            jsonBuilder.append("  \"number\": \"").append(selfContainedUnit.getNumber()).append("\",\n");
            jsonBuilder.append("  \"priceEur\": ").append(selfContainedUnit.getPriceEur()).append(",\n");
        }
        jsonBuilder.append("  \"discountInEuro\": ").append(discountInEuro).append(",\n");
        jsonBuilder.append("  \"totalPriceInEuro\": ").append(totalPriceInEuro).append(",\n");
        jsonBuilder.append("  \"brokerProfitInPercentage\": ").append(brokerProfitInPercentage).append(",\n");
        jsonBuilder.append("  \"brokerProfitInEuro\": ").append(brokerProfitInEuro).append(",\n");


        jsonBuilder.append("  \"purchaserFirstName\": \"").append(purchaserFirstName).append("\",\n");
        jsonBuilder.append("  \"purchaserLastName\": \"").append(purchaserLastName).append("\",\n");
        jsonBuilder.append("  \"purchaserEmail\": \"").append(purchaserEmail).append("\",\n");
        jsonBuilder.append("  \"brokerFirstName\": \"").append(brokerFirstName).append("\",\n");
        jsonBuilder.append("  \"brokerLastName\": \"").append(brokerLastName).append("\",\n");
        jsonBuilder.append("  \"brokerEmail\": \"").append(brokerEmail).append("\",\n");
        jsonBuilder.append("  \"description\": \"").append(description).append("\",\n");

        jsonBuilder.append("}");

        return jsonBuilder.toString();
    }
}
