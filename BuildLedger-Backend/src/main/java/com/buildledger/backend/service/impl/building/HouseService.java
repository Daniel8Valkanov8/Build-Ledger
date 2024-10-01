package com.buildledger.backend.service.impl.building;

import com.buildledger.backend.dto.request.CreateIntermediateDTO;
import com.buildledger.backend.dto.request.CreateNewProjectDTO;
import com.buildledger.backend.model.Parcel;
import com.buildledger.backend.model.building.House;
import com.buildledger.backend.repository.HouseRepository;
import com.buildledger.backend.service.base.BaseBuildingService;
import org.springframework.stereotype.Service;

import java.util.Optional;


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

    @Override
    public void addEntryToCooperation(CreateIntermediateDTO createIntermediateDTO) {

        Optional<House> houseOpt = houseRepository.findById(createIntermediateDTO.getId());

        if (houseOpt.isPresent()) {
            House house = houseOpt.get();
            if(house.getEntranceCount()==1){
                house.setEntranceCount(0);
                int newCount = createIntermediateDTO.getEntrance();
                int currentCount = house.getEntranceCount();
                house.setEntranceCount(currentCount + newCount);
            }
            house.setEntranceCount(createIntermediateDTO.getEntrance());
            houseRepository.saveAndFlush(house);
        }
    }
}