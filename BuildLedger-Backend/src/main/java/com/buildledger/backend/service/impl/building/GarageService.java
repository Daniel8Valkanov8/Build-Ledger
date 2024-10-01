package com.buildledger.backend.service.impl.building;

import com.buildledger.backend.dto.request.CreateIntermediateDTO;
import com.buildledger.backend.dto.request.UpdateGarageDTO;
import com.buildledger.backend.dto.responce.ResponseGarageDTO;
import com.buildledger.backend.model.building.Cooperation;
import com.buildledger.backend.model.sos.Garage;
import com.buildledger.backend.repository.CooperationRepository;
import com.buildledger.backend.repository.GarageRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class GarageService {
    private final CooperationRepository cooperationRepository;
    private final GarageRepository garageRepository;

    public GarageService(CooperationRepository cooperationRepository, GarageRepository garageRepository) {
        this.cooperationRepository = cooperationRepository;
        this.garageRepository = garageRepository;
    }

    public void createGarageByCount(CreateIntermediateDTO createIntermediateDTO) {
        if (createIntermediateDTO.getGarage() != 0) {


        Optional<Cooperation> cooperationOpt = cooperationRepository.findById(createIntermediateDTO.getId());

        if (cooperationOpt.isPresent()) {

            for (int i = 1; i <=createIntermediateDTO.getGarage(); i++) {
                Garage garage = new Garage("Garage " + i);
                garage.setCooperation(cooperationOpt.get());
                cooperationOpt.get().getGarages().add(garage);
                garageRepository.save(garage);
            }

            cooperationRepository.save(cooperationOpt.get());
            } else {
            throw new IllegalArgumentException("Cooperation with ID " + createIntermediateDTO.getId() + " not found.");
            }
        }
    }

    public List<ResponseGarageDTO> getAllGaragesByCooperationID(long cooperationID) {
        List<Garage> response = garageRepository.getAllGaragesByCooperationID(cooperationID);
        List<ResponseGarageDTO> responseDTO = new ArrayList<>();
        for (Garage garage : response) {
            ResponseGarageDTO dto = new ResponseGarageDTO();
            BeanUtils.copyProperties(garage, dto);
            responseDTO.add(dto);
        }
        return responseDTO;
    }
    public ResponseGarageDTO getGarageByID(long garageID) {
        Optional<Garage> garage = garageRepository.findById(garageID);
        ResponseGarageDTO response = new ResponseGarageDTO();
        if (garage.isPresent()) {
            BeanUtils.copyProperties(garage.get(), response);
            return response;
        } else {
            throw new IllegalArgumentException("Garage with ID " + garageID + " not found.");
        }
    }

    public ResponseGarageDTO updateGarage( UpdateGarageDTO updateGarageDTO) {
        Optional<Garage> garage = garageRepository.findById(updateGarageDTO.getId());
        if (garage.isPresent()) {
            BeanUtils.copyProperties(updateGarageDTO, garage.get());
            garageRepository.save(garage.get());
            return getGarageByID(updateGarageDTO.getId());
        } else {
            throw new IllegalArgumentException("Garage with ID " + updateGarageDTO.getId() + " not found.");
        }
    }
    public void deleteGarageByID(long garageID) {
        Optional<Garage> garage = garageRepository.findById(garageID);
        if (garage.isPresent()) {
            garageRepository.delete(garage.get());
        } else {
            throw new IllegalArgumentException("Garage with ID " + garageID + " not found.");
        }
    }
}
