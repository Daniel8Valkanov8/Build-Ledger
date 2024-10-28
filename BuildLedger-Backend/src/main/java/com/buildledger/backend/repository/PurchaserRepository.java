package com.buildledger.backend.repository;

import com.buildledger.backend.model.persons.Broker;
import com.buildledger.backend.model.persons.Purchaser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PurchaserRepository extends JpaRepository<Purchaser, Long> {
    @Query("SELECT p FROM Broker p WHERE p.firstName = :firstName AND p.lastName = :lastName AND p.email = :email")
    Optional<Purchaser> findByFirstNameAndLastNameAndEmail(@Param("firstName") String firstName,
                                                        @Param("lastName") String lastName,
                                                        @Param("email") String email);
}
