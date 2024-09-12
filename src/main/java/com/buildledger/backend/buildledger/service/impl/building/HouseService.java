package com.buildledger.backend.buildledger.service.impl;

import com.buildledger.backend.buildledger.dto.request.CreateNewProjectDTO;
import com.buildledger.backend.buildledger.model.Parcel;
import com.buildledger.backend.buildledger.model.building.Cooperation;
import com.buildledger.backend.buildledger.model.building.House;
import com.buildledger.backend.buildledger.repository.HouseRepository;
import com.buildledger.backend.buildledger.service.base.BaseBuildingService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
public class HouseService  extends BaseBuildingService<House> {
    private final HouseRepository houseRepository;

    public HouseService(HouseRepository houseRepository) {
        super(houseRepository);
        this.houseRepository = houseRepository;
    }

    @Override
    public void createBuildingByProjectDTO(CreateNewProjectDTO createNewProjectDTO,
                                           Parcel parcel) {
        for (int i = 0; i < createNewProjectDTO.getBuildingCount(); i++) {
            House house = new House();
            house.setParcel(parcel);
            house.setTitle("House " + (i+1));
            repository.save(house);
            houseRepository.save(house);
        }
    }
}