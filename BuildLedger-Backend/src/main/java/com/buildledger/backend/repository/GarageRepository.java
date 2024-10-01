package com.buildledger.backend.repository;


import com.buildledger.backend.model.sos.Garage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GarageRepository extends JpaRepository<Garage, Long> {
    @Query("SELECT g FROM Garage g WHERE g.cooperation.id = :cooperationID")
    List<Garage> getAllGaragesByCooperationID(@Param("cooperationID") long cooperationID);
}
