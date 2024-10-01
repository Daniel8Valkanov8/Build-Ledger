package com.buildledger.backend.repository;

import com.buildledger.backend.model.sos.ParkingPlace;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ParkingPlaceRepository extends JpaRepository<ParkingPlace, Long> {

    @Query("SELECT p FROM ParkingPlace p WHERE p.cooperation.id = :cooperationID")
    List<ParkingPlace> getAllParkingPlacesByCooperationID(@Param("cooperationID") long cooperationID);
}
