package com.buildledger.backend.buildledger.service.impl.building;

import com.buildledger.backend.buildledger.dto.request.CreateIntermediateDTO;
import com.buildledger.backend.buildledger.dto.request.UpdateGarageDTO;
import com.buildledger.backend.buildledger.dto.responce.objects.ResponseGarageDTO;
import com.buildledger.backend.buildledger.model.building.Cooperation;
import com.buildledger.backend.buildledger.model.sos.Floor;
import com.buildledger.backend.buildledger.model.sos.Garage;
import com.buildledger.backend.buildledger.repository.CooperationRepository;
import com.buildledger.backend.buildledger.repository.FloorRepository;
import com.buildledger.backend.buildledger.repository.GarageRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class GarageService {
    private final CooperationRepository cooperationRepository;
    private final GarageRepository garageRepository;
    private final FloorRepository floorRepository;

    public GarageService(CooperationRepository cooperationRepository, GarageRepository garageRepository, FloorRepository floorRepository) {
        this.cooperationRepository = cooperationRepository;
        this.garageRepository = garageRepository;
        this.floorRepository = floorRepository;
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
            ifFloorIsNullValidation(garage, dto);
            responseDTO.add(dto);
        }
        return responseDTO;
    }
    public ResponseGarageDTO getGarageByID(long garageID) {
        Optional<Garage> garage = garageRepository.findById(garageID);
        ResponseGarageDTO response = new ResponseGarageDTO();
        if (garage.isPresent()) {
            BeanUtils.copyProperties(garage.get(), response);
            ifFloorIsNullValidation(garage.get(), response);
            return response;
        } else {
            throw new IllegalArgumentException("Garage with ID " + garageID + " not found.");
        }
    }

    private static void ifFloorIsNullValidation(Garage garage, ResponseGarageDTO response) {
        Floor floor = garage.getFloor();
        if (floor != null) {
            response.setFloor(garage.getFloor().getNumber());
        }
    }

    public ResponseGarageDTO updateGarageByID( UpdateGarageDTO updateGarageDTO) {
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

    public ResponseGarageDTO updateGarage(UpdateGarageDTO updateGarageDTO) {
        ResponseGarageDTO response = new ResponseGarageDTO();
        Optional<Garage> garage = garageRepository.findById(updateGarageDTO.getId());
        if (garage.isPresent()) {
            Floor floor = floorRepository.findById(updateGarageDTO.getFloorID()).get();
            floor.getGarages().add(garage.get());
            floorRepository.save(floor);
            garage.get().setFloor(floor);
            garage.get().setPriceEur(updateGarageDTO.getPriceEur());
            Garage saved = garageRepository.saveAndFlush(garage.get());
            response.setPriceEur(saved.getPriceEur());
            response.setNumber(saved.getNumber());
            response.setId(saved.getId());
            response.setFloor(floor.getNumber());
            response.setSold(saved.isSold());
        }
        return response;
    }
}
