package com.buildledger.backend.buildledger.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ParkingPlaceRepository extends JpaRepository<ParkingPlace, Long> {
}
