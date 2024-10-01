package com.buildledger.backend.buildledger.service;

import com.buildledger.backend.buildledger.dto.request.CreateNewProjectDTO;
import com.buildledger.backend.buildledger.dto.responce.ResponseParcelDTO;
import com.buildledger.backend.buildledger.model.Parcel;
import com.buildledger.backend.buildledger.model.Project;

import java.util.List;
import java.util.Optional;

public interface ParcelService {

    // Създаване на нов парцел


    Parcel createParcelByProject(CreateNewProjectDTO createNewProjectDTO, Project project);
    // Намиране на всички парцели
    List<ResponseParcelDTO> findAllParcels();

    // Намиране на парцел по ID
    Optional<ResponseParcelDTO> findParcelById(Long id);

    // Изтриване на парцел по ID
    void deleteParcelById(Long id);
}
