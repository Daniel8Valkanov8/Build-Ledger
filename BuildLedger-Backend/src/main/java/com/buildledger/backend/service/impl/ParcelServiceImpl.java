package com.buildledger.backend.service.impl;


import com.buildledger.backend.dto.request.CreateNewProjectDTO;
import com.buildledger.backend.dto.responce.ResponseParcelDTO;
import com.buildledger.backend.model.Parcel;
import com.buildledger.backend.model.Project;
import com.buildledger.backend.repository.CooperationRepository;
import com.buildledger.backend.repository.HouseRepository;
import com.buildledger.backend.repository.ParcelRepository;
import com.buildledger.backend.service.CreateBuildingService;
import com.buildledger.backend.service.ParcelService;
import com.buildledger.backend.service.impl.building.CooperationService;
import com.buildledger.backend.service.impl.building.HouseService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
public class ParcelServiceImpl implements ParcelService {
    private final ParcelRepository parcelRepository;
    private final CooperationRepository cooperationRepository;
    private final HouseRepository houseRepository;
    private CreateBuildingService buildingService;
    public ParcelServiceImpl(ParcelRepository parcelRepository, CooperationRepository buildingRepository, HouseRepository houseRepository) {
        this.parcelRepository = parcelRepository;
        this.cooperationRepository = buildingRepository;
        this.houseRepository = houseRepository;
    }


    @Override
    public Parcel createParcelByProject(CreateNewProjectDTO createNewProjectDTO, Project project) {
        // Създаване и запазване на Parcel
        Parcel parcel = new Parcel();

        parcel.setEik(createNewProjectDTO.getEik());
        parcel.setAddress(createNewProjectDTO.getAddress());
        parcel.setArea(createNewProjectDTO.getParcelArea());
        parcel.setCompensated(true);
        parcel.setRegular(true);
        parcel.setWithElectricityAndWater(true);
        parcel.setPercentageOfCompensation(25);

        Parcel savedParcel = parcelRepository.save(parcel);  // Запазваме Parcel

        // Създаване на сграда
        if (createNewProjectDTO.getBuildingStatus().equals("Cooperation")) {
            this.buildingService = new CooperationService(cooperationRepository);
            this.buildingService.createBuildingByProjectDTO(createNewProjectDTO, savedParcel);
        } else if (createNewProjectDTO.getBuildingStatus().equals("House")) {
            this.buildingService = new HouseService(houseRepository);
            this.buildingService.createBuildingByProjectDTO(createNewProjectDTO, savedParcel);
        }

        return savedParcel;
    }


    @Override
    public List<ResponseParcelDTO> findAllParcels() {
        // Извличаме всички парцели от базата
        List<Parcel> parcels = parcelRepository.findAll();

        // Преобразуваме списъка от Parcel в ResponseParcelDto
        return parcels.stream()
                .map(this::convertToDto) // Извикваме метода за конвертиране
                .collect(Collectors.toList());
    }

    @Override
    public Optional<ResponseParcelDTO> findParcelById(Long id) {
        // Търсим парцела по неговото id
        Optional<Parcel> parcel = parcelRepository.findById(id);

        // Ако парцелът е намерен, преобразуваме го в ResponseParcelDto и връщаме резултата
        if (parcel.isPresent()) {
            ResponseParcelDTO responseParcelDto = convertToDto(parcel.get());
            return Optional.of(responseParcelDto);
        }

        // Ако не е намерен, връщаме празно Optional
        return Optional.empty();
    }

    @Override
    public void deleteParcelById(Long id) {
        // Проверяваме дали парцелът съществува преди да го изтрием
        if (parcelRepository.existsById(id)) {
            parcelRepository.deleteById(id);
        } else {
            // Можем да хвърлим изключение, ако искаме да обработваме случая, когато парцелът не е намерен
            throw new EntityNotFoundException("Parcel with id " + id + " not found.");
        }
    }

    // Метод за конвертиране на Parcel към ResponseParcelDto
    private ResponseParcelDTO convertToDto(Parcel parcel) {
        ResponseParcelDTO dto = new ResponseParcelDTO();

        dto.setId(parcel.getId());
        dto.setEik(parcel.getEik());
        dto.setAddress(parcel.getAddress());
        dto.setArea(parcel.getArea());
        dto.setCompensated(parcel.isCompensated());
        dto.setRegular(parcel.isRegular());
        dto.setPercentageOfCompensation(parcel.getPercentageOfCompensation());
        dto.setWithElectricityAndWater(parcel.isWithElectricityAndWater());
        dto.setProjectTitle(parcel.getProject().getTitle());
        dto.setStatus(parcel.getProject().getBuildingStatus());
        return dto;
    }

}