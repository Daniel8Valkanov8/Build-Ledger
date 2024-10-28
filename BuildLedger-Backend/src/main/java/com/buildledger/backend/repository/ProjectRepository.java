package com.buildledger.backend.repository;


import com.buildledger.backend.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {

    @Query("SELECT p FROM Project p WHERE p.parcel.id = :parcelId")
    Project findByParcelId(@Param("parcelId") Long parcelId);



    @Query("SELECT p FROM Project p JOIN p.parcel.buildings b WHERE b.id = :buildingId")
    Project findByBuildingId(@Param("buildingId") Long buildingId);
}
