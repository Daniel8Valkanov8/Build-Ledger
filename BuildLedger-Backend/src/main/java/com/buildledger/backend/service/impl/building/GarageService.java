package com.buildledger.backend.service.impl.building;

import com.buildledger.backend.dto.request.CreateIntermediateDTO;
import com.buildledger.backend.dto.request.UpdateGarageDTO;
import com.buildledger.backend.dto.responce.ResponseGarageDTO;
import com.buildledger.backend.model.building.Cooperation;
import com.buildledger.backend.model.sos.Floor;
import com.buildledger.backend.model.sos.Garage;
import com.buildledger.backend.repository.CooperationRepository;
import com.buildledger.backend.repository.FloorRepository;
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
    private final FloorRepository floorRepository;
    public GarageService(CooperationRepository cooperationRepository, GarageRepository garageRepository, FloorService floorService, FloorRepository floorRepository) {
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
            dto.setPriceEur(garage.getPriceEur());
            dto.setId(garage.getId());
            dto.setNumber(garage.getNumber());
            dto.setSold(garage.isSold());
            setResponseFloorNullCatch(dto,garage);
            responseDTO.add(dto);
        }
        return responseDTO;
    }
    public ResponseGarageDTO getGarageByID(long garageID) {
        Optional<Garage> garage = garageRepository.findById(garageID);
        ResponseGarageDTO response = new ResponseGarageDTO();
        if (garage.isPresent()) {
            Garage  garage1 = garage.get();
            response.setId(garage1.getId());
            response.setNumber(garage1.getNumber());
            setResponseFloorNullCatch(response,garage1);
            response.setPriceEur(garage1.getPriceEur());
            response.setSold(garage1.isSold());
            return response;
        } else {
            throw new IllegalArgumentException("Garage with ID " + garageID + " not found.");
        }
    }

    private void setResponseFloorNullCatch(ResponseGarageDTO response, Garage garage) {
        if (garage.getFloor() != null) {
            response.setFloorId(garage.getFloor().getId());
        }
    }

    public ResponseGarageDTO updateGarage(UpdateGarageDTO updateGarageDTO) {
        Optional<Garage> garageOpt = garageRepository.findById(updateGarageDTO.getId());

        System.out.println("in update garage service method price: " + updateGarageDTO.getPriceEur());
        if (garageOpt.isPresent()) {
            Garage garage = garageOpt.get();

            // Актуализиране на цената
            garage.setPriceEur(updateGarageDTO.getPriceEur());

            // Проверка дали етажът съществува преди да го зададем
            Optional<Floor> floorOpt = floorRepository.findById(updateGarageDTO.getFloorId());
            if (floorOpt.isPresent()) {
                garage.setFloor(floorOpt.get());
                floorOpt.get().getGarages().add(garage);
                floorRepository.save(floorOpt.get());
            } else {
                throw new IllegalArgumentException("Floor with ID " + updateGarageDTO.getFloorId() + " not found.");
            }

            // Запазване на гаража
            Garage savedGarage = garageRepository.saveAndFlush(garage); // използваме saveAndFlush вместо saveAllAndFlush за единичен запис
// todo setprice in responce
            // Връщаме ResponseGarageDTO с актуализираните данни
            ResponseGarageDTO response = new ResponseGarageDTO();
            response.setId(savedGarage.getId());
            response.setNumber(savedGarage.getNumber());
            setResponseFloorNullCatch(response, savedGarage);
            response.setPriceEur(savedGarage.getPriceEur());
            response.setSold(savedGarage.isSold());

            return response;
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

    public List<ResponseGarageDTO> getAllFreeGaragesByCooperationID(long id) {
   List<Garage> allFreeGaragesByCooperationID = garageRepository.getAllFreeGaragesByCooperationID(id);
        List<ResponseGarageDTO> response = new ArrayList<>();
        for (Garage garage : allFreeGaragesByCooperationID) {
            ResponseGarageDTO dto = new ResponseGarageDTO();
            BeanUtils.copyProperties(garage, dto);

            response.add(dto);
        }
        return response;

    }
}
