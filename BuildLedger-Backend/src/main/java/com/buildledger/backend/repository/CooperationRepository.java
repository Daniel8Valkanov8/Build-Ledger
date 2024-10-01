package com.buildledger.backend.repository;

import com.buildledger.backend.model.building.Cooperation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CooperationRepository extends BuildingRepository<Cooperation> {
    // Можеш да добавиш специфични методи за Cooperation
}