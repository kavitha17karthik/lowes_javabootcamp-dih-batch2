package com.examples.bankingapp.gateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;

@SpringBootApplication
@EnableZuulProxy
public class BankingAppApiGateway {

	public static void main(String[] args) {
		SpringApplication.run(BankingAppApiGateway.class, args);
	}

}
