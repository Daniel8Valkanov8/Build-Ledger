package com.buildledger.backend.service.impl;

import com.buildledger.backend.model.persons.Broker;
import com.buildledger.backend.repository.BrokerRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class BrokerService {
    private final BrokerRepository brokerRepository;

    public BrokerService(BrokerRepository brokerRepository) {
        this.brokerRepository = brokerRepository;
    }

    public Broker createIfNotExist(String firstName, String lastName, String email) {
        Optional<Broker> broker = brokerRepository.findByFirstNameAndLastNameAndEmail(firstName, lastName, email);
    if (broker.isEmpty()) {
        Broker newBroker = new Broker();
        newBroker.setFirstName(firstName);
        newBroker.setLastName(lastName);
        newBroker.setEmail(email);
        return brokerRepository.save(newBroker);
    }

    return broker.get();
    }
}
