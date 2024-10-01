package com.buildledger.backend.buildledger.repository;

import com.buildledger.backend.buildledger.model.building.Cooperation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CooperationRepository extends BuildingRepository<Cooperation> {
    // Можеш да добавиш специфични методи за Cooperation
}