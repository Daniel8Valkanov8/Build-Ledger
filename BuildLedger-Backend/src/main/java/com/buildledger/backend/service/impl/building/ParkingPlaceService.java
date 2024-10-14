package com.buildledger.backend.service.impl.building;

import com.buildledger.backend.dto.request.CreateIntermediateDTO;
import com.buildledger.backend.dto.request.UpdateParkingPlaceDTO;
import com.buildledger.backend.dto.responce.objects.ResponseParkingPlaceDTO;
import com.buildledger.backend.model.building.Cooperation;
import com.buildledger.backend.model.sos.ParkingPlace;
import com.buildledger.backend.repository.CooperationRepository;
import com.buildledger.backend.repository.ParkingPlaceRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
public class ParkingPlaceService {
    private final CooperationRepository cooperationRepository;
    private final ParkingPlaceRepository parkingPlaceRepository;

    @Autowired
    public ParkingPlaceService(CooperationRepository cooperationRepository, ParkingPlaceRepository parkingPlaceRepository) {
        this.cooperationRepository = cooperationRepository;
        this.parkingPlaceRepository = parkingPlaceRepository;
    }

    public void createParkingPlaceByCount(CreateIntermediateDTO createIntermediateDTO) {
        System.out.println("In service with correct dto" + createIntermediateDTO);
        if(createIntermediateDTO.getParkingPlace() != 0) {

            Optional<Cooperation> cooperationOpt = cooperationRepository.findById(createIntermediateDTO.getId());
            if (cooperationOpt.isPresent()) {
                for (int i = 1; i <=createIntermediateDTO.getParkingPlace(); i++) {
                String parkingPlaceNumber = "Parking-Place " + i;

                ParkingPlace parkingPlace = new ParkingPlace();     System.out.println("new parking place: " + parkingPlace);

                parkingPlace.setNumber(parkingPlaceNumber);         System.out.println( "Set operation successful: " + parkingPlace.getNumber());

                parkingPlace.setCooperation(cooperationOpt.get());
                cooperationOpt.get().getParkingPlaces().add(parkingPlace);
                ParkingPlace save = parkingPlaceRepository.save(parkingPlace); System.out.println( "Save  PARKING PLACEoperation successful: " + save);

                    cooperationOpt.get().getParkingPlaces().add(save);
                    cooperationRepository.save(cooperationOpt.get());
                }
            } else {
                throw new IllegalArgumentException("Cooperation with ID " + createIntermediateDTO.getId() + " not found.");
            }
        }
    }

    public List<ResponseParkingPlaceDTO> getAllParkingPlacesByCooperationID(long cooperationID) {
        List<ParkingPlace> allParkingPlacesByCooperationID = parkingPlaceRepository.getAllParkingPlacesByCooperationID(cooperationID);
        List<ResponseParkingPlaceDTO> response = new ArrayList<>();
        for (ParkingPlace parkingPlace : allParkingPlacesByCooperationID) {
            ResponseParkingPlaceDTO dto = new ResponseParkingPlaceDTO();
            BeanUtils.copyProperties(parkingPlace, dto);
            response.add(dto);
        }
        return response;
    }

    public ResponseParkingPlaceDTO getParkingPlaceByID(long parkingPlaceID) {
        Optional<ParkingPlace> parkingPlace = parkingPlaceRepository.findById(parkingPlaceID);
        ResponseParkingPlaceDTO response = new ResponseParkingPlaceDTO();
        if (parkingPlace.isPresent()) {
            BeanUtils.copyProperties(parkingPlace.get(), response);
            return response;
        } else {
            throw new IllegalArgumentException("ParkingPlace with ID " + parkingPlaceID + " not found.");
        }
    }
    public ResponseParkingPlaceDTO updateParkingPlace(UpdateParkingPlaceDTO updateParkingPlaceDTO) {
        Optional<ParkingPlace> parkingPlace = parkingPlaceRepository.findById(updateParkingPlaceDTO.getId());
        if (parkingPlace.isPresent()) {
            ParkingPlace parkingPlace1 = parkingPlace.get();
            parkingPlace1.setPriceEur(updateParkingPlaceDTO.getPriceEur());
            parkingPlaceRepository.saveAllAndFlush(List.of(parkingPlace1));
            return getParkingPlaceByID(updateParkingPlaceDTO.getId());
        } else {
            throw new IllegalArgumentException("ParkingPlace with ID " + updateParkingPlaceDTO.getId() + " not found.");
        }
    }

    public void deleteParkingPlace(long parkingPlaceID) {
        Optional<ParkingPlace> parkingPlace = parkingPlaceRepository.findById(parkingPlaceID);
        if (parkingPlace.isPresent()) {
            parkingPlaceRepository.delete(parkingPlace.get());
        } else {
            throw new IllegalArgumentException("ParkingPlace with ID " + parkingPlaceID + " not found.");
        }
    }

    public List<ResponseParkingPlaceDTO> getAllFreeParkingPlacesByCooperationID(long id) {
        List<ParkingPlace> allFreeParkingPlacesByCooperationID = parkingPlaceRepository.getAllFreeParkingPlacesByCooperationID(id);
        List<ResponseParkingPlaceDTO> response = new ArrayList<>();
        for (ParkingPlace parkingPlace : allFreeParkingPlacesByCooperationID) {
            ResponseParkingPlaceDTO dto = new ResponseParkingPlaceDTO();
            BeanUtils.copyProperties(parkingPlace, dto);
            response.add(dto);
        }
        return response;
    }
}
