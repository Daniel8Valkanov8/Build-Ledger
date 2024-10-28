package com.buildledger.backend.model.abstraction;

import com.buildledger.backend.model.ledger.Sell;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@MappedSuperclass
@Getter
@Setter// Това казва на JPA, че този клас не е самостоятелна таблица, а ще бъде базов клас
public abstract class Person {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String firstName;
    private String lastName;
    private String email;

}
