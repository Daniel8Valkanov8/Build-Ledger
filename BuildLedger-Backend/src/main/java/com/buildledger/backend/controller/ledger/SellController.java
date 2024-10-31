package com.buildledger.backend.controller.ledger;

import com.buildledger.backend.dto.request.CreateSellDTO;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/cooperation")
public class SellController {

    @PostMapping("/{id}/create-sell")
    public ResponseEntity<String> createSell(
            @PathVariable Long id,
            @RequestParam("file") MultipartFile file,
            @ModelAttribute CreateSellDTO createSellDTO) {  // Добавяме JSON данните като String

        // Абсолютен път до папката за качване на файлове в основната директория
        //todo change dir in deploy
        String uploadDir = System.getProperty("user.dir") + "/src/main/resources/contracts";
        Path directoryPath = Paths.get(uploadDir);

        try {
            // Проверка и създаване на директорията, ако не съществува
            if (Files.notExists(directoryPath)) {
                Files.createDirectories(directoryPath);
            }

            // Запис на файла в директорията
            Path filePath = directoryPath.resolve(file.getOriginalFilename());
            file.transferTo(filePath.toFile());

            // Принтиране на JSON данните в конзолата
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(createSellDTO.toString());
            System.out.println("Получени JSON данни: " + jsonNode.toPrettyString());

            String response = "Файлът и JSON данните са успешно обработени!";
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>("Грешка при запис на файла или обработка на JSON", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
