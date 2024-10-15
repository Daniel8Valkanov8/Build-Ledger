package com.buildledger.backend.model.building;

import com.buildledger.backend.enums.Stage;
import com.buildledger.backend.model.Parcel;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Inheritance(strategy = InheritanceType.JOINED)  // Или можете да използвате SINGLE_TABLE или TABLE_PER_CLASS
@Table(name = "buildings")
public abstract class Building {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false, unique = false)
    private String title;
    private String description;
    private double rsp;  // retail selling price
    private int entranceCount = 1;

    @ElementCollection(targetClass = Stage.class)
    @CollectionTable(name = "project_stages", joinColumns = @JoinColumn(name = "project_id"))
    @Enumerated(EnumType.STRING)
    @Column(name = "stage")
    private Set<Stage> stages = new HashSet<>();

    @ManyToOne
    @JoinColumn(name = "parcel_id")
    private Parcel parcel;
}
