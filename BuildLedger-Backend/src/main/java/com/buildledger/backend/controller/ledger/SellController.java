package com.buildledger.backend.controller.ledger;

import com.buildledger.backend.dto.request.CreateSellDTO;
import com.buildledger.backend.service.impl.SellService;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/cooperation")
public class SellController {
    private static final String UPLOAD_DIR = "src/main/resources/contracts/";
    private static final Path directoryPath = Paths.get(UPLOAD_DIR);
    private final SellService sellService;

    public SellController(SellService sellService) {
        this.sellService = sellService;
    }

    @PostMapping("/{id}/create-sell")
    public ResponseEntity<String> createSell(
            @PathVariable Long id,
            //@RequestParam("file") MultipartFile file,
            @Valid @RequestBody CreateSellDTO createSellDTO) {  // Добавяме JSON данните като String
            String response = sellService.createSell(id, createSellDTO);
            return new ResponseEntity<>(response, HttpStatus.OK);

        //try {
        //    // Проверка и създаване на директорията, ако не съществува
        //    //if (Files.notExists(directoryPath)) {
        //    //    Files.createDirectories(directoryPath);
        //    //}
        //    // Запис на файла в директорията
        //    //Path filePath = directoryPath.resolve(file.getOriginalFilename());
        //    //file.transferTo(filePath.toFile());
        //    System.out.println(createSellDTO.toString());
        //    return new ResponseEntity<>(response, HttpStatus.OK);
        //} catch (IOException e) {
        //    e.printStackTrace();
        //    return new ResponseEntity<>("Грешка при запис на файла или обработка на JSON", HttpStatus.INTERNAL_SERVER_ERROR);
        //}
    }
}
