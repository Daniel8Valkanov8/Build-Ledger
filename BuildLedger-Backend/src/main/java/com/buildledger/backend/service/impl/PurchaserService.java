package com.buildledger.backend.service.impl;

import com.buildledger.backend.model.persons.Purchaser;
import com.buildledger.backend.repository.PurchaserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service
public class PurchaserService {

    private final PurchaserRepository purchaserRepository;

    public PurchaserService(PurchaserRepository purchaserRepository) {
        this.purchaserRepository = purchaserRepository;
    }
    public Purchaser createIfNotExist(String firstName, String lastName, String email) {
        Optional<Purchaser> purchaser = purchaserRepository.findByFirstNameAndLastNameAndEmail(firstName, lastName, email);
        if (purchaser.isEmpty()) {
            Purchaser newPurchaser = new Purchaser();
            newPurchaser.setFirstName(firstName);
            newPurchaser.setLastName(lastName);
            newPurchaser.setEmail(email);
            return purchaserRepository.save(newPurchaser);
        }
        return purchaser.get();
    }
}
