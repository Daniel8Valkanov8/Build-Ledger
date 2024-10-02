package com.buildledger.backend.repository;

import com.buildledger.backend.dto.responce.ResponseApartmentDTO;
import com.buildledger.backend.model.sos.Apartment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ApartmentRepository extends JpaRepository<Apartment, Long> {

    @Query("SELECT a FROM Apartment a WHERE a.cooperation.id = :cooperationID")
    List<Apartment> getAllApartmentsByCooperationID(@Param("cooperationID") long cooperationID);

    @Query("SELECT a FROM Apartment a WHERE a.cooperation.id = :cooperationID AND a.sold = false")
    List<Apartment> getAllFreeApartmentsByCooperationID(@Param("cooperationID") long cooperationID);

}
