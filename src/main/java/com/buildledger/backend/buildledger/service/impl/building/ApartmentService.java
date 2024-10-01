package com.buildledger.backend.buildledger.service.impl.building;

import com.buildledger.backend.buildledger.dto.request.CreateIntermediateDTO;
import com.buildledger.backend.buildledger.dto.request.UpdateApartmentDTO;
import com.buildledger.backend.buildledger.dto.responce.objects.ResponseApartmentDTO;
import com.buildledger.backend.buildledger.model.building.Cooperation;
import com.buildledger.backend.buildledger.model.sos.Apartment;
import com.buildledger.backend.buildledger.model.sos.Floor;
import com.buildledger.backend.buildledger.repository.ApartmentRepository;
import com.buildledger.backend.buildledger.repository.CooperationRepository;
import com.buildledger.backend.buildledger.repository.FloorRepository;
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
        if (apartment.getFloor() != null) {
            dto.setFloor(apartment.getFloor().getNumber());
        }

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
           floor.getApartments().add(apartment1);
           apartment1.setBedroomCount(updateApartmentDTO.getBedroomCount());
           apartment1.setBathroomCount(updateApartmentDTO.getBathroomCount());
           apartment1.setPriceEur(updateApartmentDTO.getPriceEur());
           Apartment saved = apartmentRepository.saveAndFlush(apartment1);
           floorRepository.saveAndFlush(floor);
           responseApartmentDTO.setArea(saved.getArea());
           responseApartmentDTO.setBedroomCount(saved.getBedroomCount());
           responseApartmentDTO.setBathroomCount(saved.getBathroomCount());
           responseApartmentDTO.setPriceEur(saved.getPriceEur());
           responseApartmentDTO.setFloor(saved.getFloor().getNumber());
        }//todo
        return responseApartmentDTO;
    }
}
