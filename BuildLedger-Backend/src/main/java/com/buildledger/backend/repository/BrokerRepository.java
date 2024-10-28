package com.buildledger.backend.repository;

import com.buildledger.backend.model.persons.Broker;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface BrokerRepository extends JpaRepository<Broker, Long> {

    @Query("SELECT b FROM Broker b WHERE b.firstName = :firstName AND b.lastName = :lastName AND b.email = :email")
    Optional<Broker> findByFirstNameAndLastNameAndEmail(@Param("firstName") String firstName,
                                                        @Param("lastName") String lastName,
                                                        @Param("email") String email);
}

