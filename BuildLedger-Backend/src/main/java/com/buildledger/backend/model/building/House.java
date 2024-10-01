package com.buildledger.backend.model.building;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
public class House extends Building {
    private final String TYPE = "House";
    public House() {
        super();
    }
}
