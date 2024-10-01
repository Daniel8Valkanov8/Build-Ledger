package com.buildledger.backend.buildledger.model.persons;

import com.buildledger.backend.buildledger.model.abstraction.Person;
import com.buildledger.backend.buildledger.model.ledger.Sell;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
public class Broker extends Person {

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "broker")
    private Set<Sell> sells = new HashSet<>();
}
