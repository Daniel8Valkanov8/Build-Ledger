package com.buildledger.backend.repository;

import com.buildledger.backend.model.building.Building;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BuildingRepository<T extends Building> extends JpaRepository<T, Long> {
    // Можеш да добавиш общи методи за всички видове сгради
    @Query("SELECT b FROM Building b WHERE b.parcel.id = :parcelId")
    List<Building> findByParcelId(long parcelId);
}