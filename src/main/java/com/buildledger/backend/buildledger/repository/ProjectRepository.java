package com.buildledger.backend.buildledger.repository;

import com.buildledger.backend.buildledger.model.Project;
import com.buildledger.backend.buildledger.model.building.Building;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {

    @Query("SELECT p FROM Project p WHERE p.parcel.id = :parcelId")
    Project findByParcelId(@Param("parcelId") Long parcelId);
}
