package com.buildledger.backend.buildledger.service.impl.building;

import com.buildledger.backend.buildledger.dto.request.UpdateFloorDTO;
import com.buildledger.backend.buildledger.dto.request.CreateIntermediateDTO;
import com.buildledger.backend.buildledger.dto.responce.ResponseFloorDTO;
import com.buildledger.backend.buildledger.model.building.Cooperation;
import com.buildledger.backend.buildledger.model.sos.Floor;
import com.buildledger.backend.buildledger.repository.CooperationRepository;
import com.buildledger.backend.buildledger.repository.FloorRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.*;

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
        Stack<ResponseFloorDTO> stack = new Stack<>();  // Use a stack for ordering

        if (cooperationOpt.isPresent()) {
            // Get the list of floors, map it to ResponseFloorDTO, parse number as int, sort by number
            List<ResponseFloorDTO> sortedFloors = cooperationOpt.get().getFloors().stream()
                    .map(floor -> new ResponseFloorDTO(
                            floor.getId(),
                            floor.getNumber()
                    ))
                    .sorted(Comparator.comparingInt(dto -> Integer.parseInt(dto.getNumber())))  // Sort by parsed floor number
                    .toList();

            // Push sorted floors onto the stack (smallest first)
            for (ResponseFloorDTO floorDTO : sortedFloors) {
                stack.push(floorDTO);
            }

            // Pop all elements from the stack into a new list (this will reverse the order)
            List<ResponseFloorDTO> response = new ArrayList<>();
            while (!stack.isEmpty()) {
                response.add(stack.pop());
            }

            return response;
        } else {
            throw new IllegalArgumentException("Cooperation with ID " + id + " not found.");
        }
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

