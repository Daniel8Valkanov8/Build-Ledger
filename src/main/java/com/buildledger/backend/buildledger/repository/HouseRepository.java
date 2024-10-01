package com.buildledger.backend.buildledger.repository;

import com.buildledger.backend.buildledger.model.building.House;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HouseRepository extends BuildingRepository<House> {
}
