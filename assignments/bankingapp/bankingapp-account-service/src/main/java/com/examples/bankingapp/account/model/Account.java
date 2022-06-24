package com.examples.bankingapp.account.model;

import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import org.springframework.http.HttpHeaders;


@Entity
@Table
public class Account {
	@Id
	@GeneratedValue
	private int id;		
	@NotEmpty(message="name cannot be blank")
	private String name;
	@NotEmpty(message="AccountType cannot be blank")
	private String accType; //Savings,Current
	private String status;
	private double balance;
	//LocalDate openDate;
	private String openDate;

		
	/*
	 * @Basic private LocalDate openDate;
	 */

	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getAccType() {
		return accType;
	}
	public void setAccType(String accType) {
		this.accType = accType;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	
	public double getBalance() {
		return balance;
	}
	public void setBalance(double srcBalance) {
		this.balance = srcBalance;
	}
	public String getOpenDate() {
		return openDate;
	}
	public void setOpenDate(String openDate) {
		this.openDate = openDate;
	}
	public HttpHeaders getHeaders() {
		// TODO Auto-generated method stub
		return null;
	}
	
	/*
	 * public LocalDate getOpenDate() { return openDate; } public void
	 * setOpenDate(LocalDate openDate) { this.openDate = openDate; }
	 */
		
}
	