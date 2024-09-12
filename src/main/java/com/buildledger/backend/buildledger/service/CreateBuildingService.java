package com.buildledger.backend.buildledger.service;


import com.buildledger.backend.buildledger.dto.request.CreateNewProjectDTO;
import com.buildledger.backend.buildledger.model.Parcel;
import com.buildledger.backend.buildledger.model.building.Building;
import com.buildledger.backend.buildledger.model.building.Cooperation;

import java.util.List;
import java.util.Optional;

public interface BuildingService
        <T extends Building, ID> {

    T createBuilding(T entity);

    List<T> findAllBuildings();

    List<T> findAllBuildingsByParcelId(long parcelId);

    Optional<T> findBuildingById(ID id);

    void deleteBuildingById(ID id);

    void createBuildingByProjectDTO(CreateNewProjectDTO createNewProjectDTO, Parcel parcel);
}

