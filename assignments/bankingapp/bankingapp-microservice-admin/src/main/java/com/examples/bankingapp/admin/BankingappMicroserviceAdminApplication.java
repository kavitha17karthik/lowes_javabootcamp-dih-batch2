package com.examples.bankingapp.admin;

import de.codecentric.boot.admin.server.config.EnableAdminServer;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@EnableAdminServer
public class BankingappMicroserviceAdminApplication {

	public static void main(String[] args) {
		SpringApplication.run(BankingappMicroserviceAdminApplication.class, args);
	}

}
