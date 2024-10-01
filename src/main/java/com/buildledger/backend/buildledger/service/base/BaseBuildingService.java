package com.buildledger.backend.buildledger.service.base;

import com.buildledger.backend.buildledger.dto.request.CreateNewProjectDTO;
import com.buildledger.backend.buildledger.model.Parcel;
import com.buildledger.backend.buildledger.model.building.Building;
import com.buildledger.backend.buildledger.repository.BuildingRepository;
import com.buildledger.backend.buildledger.service.CreateBuildingService;
import org.springframework.stereotype.Service;

@Service
public abstract class BaseBuildingService
        <T extends Building>
        implements CreateBuildingService<T, Long> {

    protected final BuildingRepository<T> repository;

    public BaseBuildingService(BuildingRepository<T> repository) {
        this.repository = repository;
    }

    @Override
    public void createBuildingByProjectDTO(CreateNewProjectDTO createNewProjectDTO, Parcel parcel) {

    }
}
