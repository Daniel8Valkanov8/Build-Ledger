package com.buildledger.backend.service.impl.building;

import com.buildledger.backend.dto.UpdateFloorDTO;
import com.buildledger.backend.dto.request.CreateIntermediateDTO;
import com.buildledger.backend.dto.responce.ResponseFloorDTO;
import com.buildledger.backend.model.building.Cooperation;
import com.buildledger.backend.model.sos.Floor;
import com.buildledger.backend.repository.CooperationRepository;
import com.buildledger.backend.repository.FloorRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class FloorService {
    private final CooperationRepository cooperationRepository;
    private final FloorRepository floorRepository;

    public FloorService(CooperationRepository cooperationRepository, FloorRepository floorRepository) {
        this.cooperationRepository = cooperationRepository;
        this.floorRepository = floorRepository;
    }

    public void createFloorByCount(CreateIntermediateDTO dto) {
        // Намираме кооперацията по ID
        Optional<Cooperation> cooperationOpt = cooperationRepository.findById(dto.getId());

        if (cooperationOpt.isPresent()) {
            Cooperation cooperation = cooperationOpt.get();

            // Създаваме и добавяме етажи към кооперацията
            for (int i = 0; i <=dto.getFloor(); i++) {
                String floorNumber = String.valueOf(i);
                Floor floor = new Floor(floorNumber);
                floor.setCooperation(cooperation);
                cooperation.getFloors().add(floor);
                floorRepository.save(floor);
            }

            // Запазваме кооперацията с новите етажи
            cooperationRepository.save(cooperation);
        } else {
            throw new IllegalArgumentException("Cooperation with ID " + dto.getId() + " not found.");
        }
    }


    public void createUndergroundFloor(CreateIntermediateDTO createIntermediateDTO) {

        Optional<Cooperation> cooperationOpt = cooperationRepository.findById(createIntermediateDTO.getId());

        if (cooperationOpt.isPresent()) {
            Cooperation cooperation = cooperationOpt.get();

            for (int i = 1; i <=createIntermediateDTO.getUndergroundFloor(); i++) {
                String floorNumber ="-" + i;
                Floor floor = new Floor(floorNumber);
                floor.setCooperation(cooperation);
                cooperation.getFloors().add(floor);
                floorRepository.save(floor);
            }

            cooperationRepository.save(cooperation);
        } else {
            throw new IllegalArgumentException("Cooperation with ID " + createIntermediateDTO.getId() + " not found.");
        }
    }

    public List<ResponseFloorDTO> getAllFloorsByCooperationID(long id) {
        Optional<Cooperation> cooperationOpt = cooperationRepository.findById(id);
        List<ResponseFloorDTO> response = null;

        if (cooperationOpt.isPresent()) {
            response = cooperationOpt.get()
                    .getFloors()
                    .stream()
                    .map(floor -> new ResponseFloorDTO(floor.getId(), floor.getNumber()))
                    .sorted((floor1, floor2) -> {
                        int num1 = Integer.parseInt(floor1.getNumber());
                        int num2 = Integer.parseInt(floor2.getNumber());

                        // Сортираме подземните етажи последни
                        if (num1 < 0 && num2 < 0) {
                            return Integer.compare(num1, num2); // Подреждаме подземните във възходящ ред
                        } else if (num1 < 0) {
                            return 1; // Подземните етажи отиват най-накрая
                        } else if (num2 < 0) {
                            return -1; // Подземните етажи отиват най-накрая
                        }

                        // Подреждаме етаж 0 последен от надземните
                        if (num1 == 0) {
                            return 1;
                        } else if (num2 == 0) {
                            return -1;
                        }

                        // Подреждаме надземните етажи в низходящ ред
                        return Integer.compare(num2, num1);
                    })
                    .toList();
        } else {
            throw new IllegalArgumentException("Cooperation with ID " + id + " not found.");
        }

        return response;
    }


    public ResponseFloorDTO getFloorByFloorNumber( long floorId) {
        Optional<Floor> floorOpt = floorRepository.findById(floorId);
        if (floorOpt.isPresent()) {
            Floor floor = floorOpt.get();
            return new ResponseFloorDTO(floor.getId(),floor.getNumber());
        } else {
            throw new IllegalArgumentException("Floor with ID " + floorId + " not found.");
        }
    }

    public ResponseFloorDTO updateFloor(UpdateFloorDTO updateFloorDTO) {

        Optional<Floor> floorOpt = floorRepository.findById(updateFloorDTO.getId());
        if (floorOpt.isPresent()) {
            Floor floor = floorOpt.get();
            BeanUtils.copyProperties(updateFloorDTO, floor);
            floorRepository.save(floor);
            return new ResponseFloorDTO(floor.getId(),floor.getNumber());
        } else {
            throw new IllegalArgumentException("Floor with ID " + updateFloorDTO.getId() + " not found.");
        }
    }


}

