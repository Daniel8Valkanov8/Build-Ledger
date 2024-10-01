package com.buildledger.backend.model.persons;

import com.buildledger.backend.model.abstraction.Person;
import com.buildledger.backend.model.ledger.Installment;
import com.buildledger.backend.model.ledger.Sell;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
public class Purchaser extends Person {

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "purchaser")
    private Set<Sell> purchases = new HashSet<>();

    @OneToMany(mappedBy = "purchaser")
    private Set<Installment> installments = new HashSet<>();

}
