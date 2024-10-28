package com.buildledger.backend.service.impl;


import com.buildledger.backend.dto.nested.InstallmentAndDate;
import com.buildledger.backend.dto.nested.SelfContainedUnits;
import com.buildledger.backend.dto.request.CreateSellDTO;
import com.buildledger.backend.enums.PaymentStatus;
import com.buildledger.backend.model.Project;
import com.buildledger.backend.model.ledger.Income;
import com.buildledger.backend.model.ledger.Installment;
import com.buildledger.backend.model.ledger.Payment;
import com.buildledger.backend.model.ledger.Sell;
import com.buildledger.backend.model.persons.Broker;
import com.buildledger.backend.model.persons.Purchaser;
import com.buildledger.backend.model.sos.Apartment;
import com.buildledger.backend.model.sos.Garage;
import com.buildledger.backend.model.sos.ParkingPlace;
import com.buildledger.backend.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.HashSet;
import java.util.Set;

@Service
public class SellService {

    private static final String UPLOAD_DIR = "src/main/resources/contracts/";
    private final SellRepository sellRepository;
    private final BrokerService brokerService;
    private final PurchaserService purchaserService;
    private final ApartmentRepository apartmentRepository;
    private final GarageRepository garageRepository;
    private final ParkingPlaceRepository parkingPlaceRepository;
    private final PaymentRepository paymentRepository;
    private final InstallmentRepository installmentRepository;
    private final ProjectRepository projectRepository;
    private final IncomeRepository incomeRepository;

    public SellService(SellRepository sellRepository, BrokerService brokerService, PurchaserService purchaserService, ApartmentRepository apartmentRepository, GarageRepository garageRepository, ParkingPlaceRepository parkingPlaceRepository, PaymentRepository paymentRepository, InstallmentRepository installmentRepository, ProjectRepository projectRepository, IncomeRepository incomeRepository) {
        this.sellRepository = sellRepository;
        this.brokerService = brokerService;
        this.purchaserService = purchaserService;
        this.apartmentRepository = apartmentRepository;
        this.garageRepository = garageRepository;
        this.parkingPlaceRepository = parkingPlaceRepository;
        this.paymentRepository = paymentRepository;
        this.installmentRepository = installmentRepository;
        this.projectRepository = projectRepository;
        this.incomeRepository = incomeRepository;
    }

    public String createSell(Long id, MultipartFile contract, CreateSellDTO createSellDTO) {
        Sell sell = new Sell();
        sell.setCooperationId(id);
        contractSetData(contract, createSellDTO, sell);
        addObjectsInSell(createSellDTO, sell);
        Sell savedSell = sellRepository.saveAndFlush(sell);
        Payment payment = new Payment();
        payment.setSell(savedSell);
        payment.setAmountRemaining(createSellDTO.getTotalPriceInEuro());
        payment.setAmountReceived(0);
        payment.setPaymentStatus(PaymentStatus.IN_PROGRESS);
        savedSell.setPayment(payment);
        for (InstallmentAndDate installmentAndDate : createSellDTO.getInstallmentAndDates()) {
            Installment installment = new Installment();
            installment.setInstallment(installmentAndDate.getInstallment());

            installment.setPayment(payment);
            installment.setInstallmentAmount(installmentAndDate.getSumInEuros());
            installment.setInstallmentDate(installmentAndDate.getDate());
            installment.setPayStatus(false);
            Installment savedInstallment = installmentRepository.saveAndFlush(installment);
            payment.getInstallments().add(savedInstallment);

            Income income = new Income();
            income.setInstallment(installment);
            Project project = projectRepository.findByBuildingId(id);
            income.setProject(project);
            income.setPayed(false);
            Income savedIncome = incomeRepository.saveAndFlush(income);
            project.getIncomes().add(savedIncome);
            projectRepository.saveAndFlush(project);

        }

        return "Success";
    }

    private void addObjectsInSell(CreateSellDTO createSellDTO, Sell sell) {
        Set<Apartment> apartments = new HashSet<>();
        Set<Garage> garages = new HashSet<>();
        Set<ParkingPlace> parkingPlaces = new HashSet<>();
        for (SelfContainedUnits object : createSellDTO.getSelfContainedUnits()) {
            System.out.println("the number is: " + object.getNumber());
            if (object.getNumber().contains("Apartment")) {
                Apartment apartment = apartmentRepository.findById(object.getId()).get();
                apartments.add(apartment);
            }else if (object.getNumber().contains("Garage")) {
                Garage garage = garageRepository.findById(object.getId()).get();
                garages.add(garage);
            }else if (object.getNumber().contains("Parking-Place")) {
                ParkingPlace parkingPlace = parkingPlaceRepository.findById(object.getId()).get();
                parkingPlaces.add(parkingPlace);
            }
        }

        sell.setApartments(apartments);
        sell.setGarages(garages);
        sell.setParkingPlaces(parkingPlaces);
    }

    private void contractSetData(MultipartFile contract, CreateSellDTO createSellDTO, Sell sell) {
        String filePath = saveFile(contract);
        System.out.println(filePath);
        Broker broker = brokerService.createIfNotExist(createSellDTO.getBrokerFirstName(), createSellDTO.getBrokerLastName(), createSellDTO.getBrokerEmail());
        Purchaser purchaser = purchaserService.createIfNotExist(createSellDTO.getPurchaserFirstName(), createSellDTO.getPurchaserLastName(), createSellDTO.getPurchaserEmail());
        sell.setBroker(broker);
        sell.setPurchaser(purchaser);
        sell.setContractDate(createSellDTO.getContractDate());
        sell.setFilePath(filePath);
        sell.setTotalPriceInEuro(createSellDTO.getTotalPriceInEuro());
        sell.setDiscountInEuro(createSellDTO.getDiscountInEuro());
        sell.setBrokerProfitInEuro(createSellDTO.getBrokerProfitInEuro());
        sell.setBrokerProfitInPercentage(createSellDTO.getBrokerProfitInPercentage());
        sell.setDescription(createSellDTO.getDescription());
    }

    private String saveFile(MultipartFile file) {
        try {
            // Създаване на директория, ако не съществува
            File directory = new File(UPLOAD_DIR);
            if (!directory.exists()) {
                directory.mkdirs();
            }

            // Записване на файла
            File outputFile = new File(directory, file.getOriginalFilename());
            try (FileOutputStream fos = new FileOutputStream(outputFile)) {
                fos.write(file.getBytes());
            }
            return outputFile.getPath(); // Връща пътя до файла
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }
}
