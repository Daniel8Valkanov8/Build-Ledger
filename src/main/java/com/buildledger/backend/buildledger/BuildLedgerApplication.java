package com.buildledger.backend.buildledger;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

@SpringBootApplication
public class BuildLedgerApplication {

    public static void main(String[] args) {
        ApplicationContext context = SpringApplication.run(BuildLedgerApplication.class, args);
        TestComponent testComponent = context.getBean(TestComponent.class);
        testComponent.test();
    }

}
