package com.buildledger.backend.buildledger.service;


import com.buildledger.backend.buildledger.dto.request.CreateIntermediateDTO;
import com.buildledger.backend.buildledger.dto.request.CreateNewProjectDTO;
import com.buildledger.backend.buildledger.model.Parcel;
import com.buildledger.backend.buildledger.model.building.Building;

public interface CreateBuildingService
        <T extends Building, ID> {

    void createBuildingByProjectDTO(CreateNewProjectDTO createNewProjectDTO, Parcel parcel);

    void addEntryToCooperation(CreateIntermediateDTO createIntermediateDTO);
}

