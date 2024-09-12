package com.buildledger.backend.buildledger.model.persons;

import com.buildledger.backend.buildledger.model.Parcel;
import com.buildledger.backend.buildledger.model.ledger.Expense;
import com.buildledger.backend.buildledger.model.ledger.Income;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table()
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;
    private double expectedIncome;
    private double expectedExpenses;
    private double expectedProfit;

    private Set<Parcel> parcels = new HashSet<>();
    
    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Expense> expenses = new HashSet<>();

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Income> incomes = new HashSet<>();

}