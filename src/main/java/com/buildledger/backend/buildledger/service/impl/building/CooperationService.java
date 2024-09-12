package com.buildledger.backend.buildledger.service.impl;
import com.buildledger.backend.buildledger.dto.request.CreateNewProjectDTO;
import com.buildledger.backend.buildledger.model.Parcel;
import com.buildledger.backend.buildledger.model.building.Cooperation;
import com.buildledger.backend.buildledger.repository.CooperationRepository;
import com.buildledger.backend.buildledger.service.base.BaseBuildingService;
import org.springframework.stereotype.Service;


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

}

