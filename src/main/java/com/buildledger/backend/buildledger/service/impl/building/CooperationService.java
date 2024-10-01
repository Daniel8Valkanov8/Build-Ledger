package com.buildledger.backend.buildledger.service.impl.building;
import com.buildledger.backend.buildledger.dto.request.CreateIntermediateDTO;
import com.buildledger.backend.buildledger.dto.request.CreateNewProjectDTO;
import com.buildledger.backend.buildledger.model.Parcel;
import com.buildledger.backend.buildledger.model.building.Cooperation;
import com.buildledger.backend.buildledger.repository.CooperationRepository;
import com.buildledger.backend.buildledger.service.base.BaseBuildingService;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
public class CooperationService extends BaseBuildingService<Cooperation> {

    private final CooperationRepository cooperationRepository;

    public CooperationService(CooperationRepository cooperationRepository) {
        super(cooperationRepository);
        this.cooperationRepository = cooperationRepository;
    }

    @Override
    public void createBuildingByProjectDTO(CreateNewProjectDTO createNewProjectDTO,
                                           Parcel parcel) {
        for (int i = 0; i < createNewProjectDTO.getBuildingCount(); i++) {
            Cooperation cooperation = new Cooperation();
            cooperation.setParcel(parcel);
            cooperation.setTitle("Cooperation " + (i+1));
            repository.save(cooperation);
            cooperationRepository.save(cooperation);
        }
    }

    @Override
    public void addEntryToCooperation(CreateIntermediateDTO createIntermediateDTO) {

        Optional<Cooperation> cooperationOpt = cooperationRepository.findById(createIntermediateDTO.getId());

        if (cooperationOpt.isPresent()) {
               Cooperation cooperation = cooperationOpt.get();
               if(cooperation.getEntranceCount()==1){
                   cooperation.setEntranceCount(0);
                   int newCount = createIntermediateDTO.getEntrance();
                   int currentCount = cooperation.getEntranceCount();
                   cooperation.setEntranceCount(currentCount + newCount);
               }
               cooperation.setEntranceCount(createIntermediateDTO.getEntrance());
               cooperationRepository.saveAndFlush(cooperation);
        }
    }

}

