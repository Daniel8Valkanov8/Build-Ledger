package com.buildledger.backend.service.impl.building;

import com.buildledger.backend.dto.request.CreateIntermediateDTO;
import com.buildledger.backend.dto.request.UpdateApartmentDTO;
import com.buildledger.backend.dto.responce.ResponseApartmentDTO;
import com.buildledger.backend.model.building.Cooperation;
import com.buildledger.backend.model.sos.Apartment;
import com.buildledger.backend.model.sos.Floor;
import com.buildledger.backend.repository.ApartmentRepository;
import com.buildledger.backend.repository.CooperationRepository;
import com.buildledger.backend.repository.FloorRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ApartmentService {
    private final CooperationRepository cooperationRepository;
    private final ApartmentRepository apartmentRepository;
    private final FloorService floorService;
    private final FloorRepository floorRepository;


    public ApartmentService(CooperationRepository cooperationRepository, ApartmentRepository apartmentRepository, FloorService floorService, FloorRepository floorRepository) {
        this.cooperationRepository = cooperationRepository;
        this.apartmentRepository = apartmentRepository;
        this.floorService = floorService;
        this.floorRepository = floorRepository;
    }

    public void createApartmentByCount(CreateIntermediateDTO createIntermediateDTO) {
        Optional<Cooperation> cooperation = cooperationRepository.findById(createIntermediateDTO.getId());
        if (cooperation.isPresent()){
            for (int i = 1; i <=createIntermediateDTO.getApartment(); i++) {
                Apartment apartment = new Apartment();
                apartment.setNumber("Apartment " + i);
                apartment.setCooperation(cooperation.get());
                cooperation.get().getApartments().add(apartment);
                apartmentRepository.save(apartment);
            }
            cooperationRepository.save(cooperation.get());
        }else {
            throw new IllegalArgumentException("Cooperation with ID " + createIntermediateDTO.getId() + " not found.");
        }
    }

    public List<ResponseApartmentDTO> getAllApartmentsByCooperationID(long cooperationID) {
    List<Apartment> response = apartmentRepository.getAllApartmentsByCooperationID(cooperationID);
    List<ResponseApartmentDTO> responseDTO = new ArrayList<>();

        for (Apartment apartment : response) {
        ResponseApartmentDTO dto = new ResponseApartmentDTO();
        BeanUtils.copyProperties(apartment, dto);
        responseDTO.add(dto);
        }
    return responseDTO;
    }
    public ResponseApartmentDTO getApartmentByID(long id) {
        Optional<Apartment> apartment = apartmentRepository.findById(id);
        if (apartment.isPresent()) {
            ResponseApartmentDTO responseApartmentDTO = new ResponseApartmentDTO();
            BeanUtils.copyProperties(apartment.get(), responseApartmentDTO);
            return responseApartmentDTO;
        } else {
            throw new IllegalArgumentException("Apartment with ID " + id + " not found.");
        }
    }
    public ResponseApartmentDTO updateApartment(UpdateApartmentDTO updateApartmentDTO) {
        Optional<Apartment> apartment = apartmentRepository.findById(updateApartmentDTO.getId());
        ResponseApartmentDTO responseApartmentDTO = new ResponseApartmentDTO();
        if (apartment.isPresent()) {
           Apartment apartment1 = apartment.get();
           apartment1.setArea(updateApartmentDTO.getArea());
            Floor floor = floorRepository.findById(updateApartmentDTO.getFloorId()).get();
           apartment1.setFloor(floor);
           apartment1.setBedroomCount(updateApartmentDTO.getBedroomCount());
           apartment1.setBathroomCount(updateApartmentDTO.getBathroomCount());
           apartmentRepository.saveAndFlush(apartment1);
        }
        return responseApartmentDTO;
    }

    public List<ResponseApartmentDTO> getAllFreeApartmentsByCooperationID(long id) {
        List<Apartment> response = apartmentRepository.getAllFreeApartmentsByCooperationID(id);
        List<ResponseApartmentDTO> responseDTO = new ArrayList<>();
        for (Apartment apartment : response) {
            ResponseApartmentDTO dto = new ResponseApartmentDTO();
            BeanUtils.copyProperties(apartment, dto);
            responseDTO.add(dto);
        }
        return responseDTO;
    }
}
