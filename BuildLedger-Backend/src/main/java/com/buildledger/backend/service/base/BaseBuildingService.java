package com.buildledger.backend.service.base;

import com.buildledger.backend.dto.request.CreateNewProjectDTO;
import com.buildledger.backend.model.Parcel;
import com.buildledger.backend.model.building.Building;
import com.buildledger.backend.repository.BuildingRepository;
import com.buildledger.backend.service.CreateBuildingService;
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
