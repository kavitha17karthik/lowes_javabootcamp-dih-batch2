package com.examples.bankingapp.transaction.model;

import java.time.LocalDateTime;
import javax.persistence.Basic;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;

@Entity
@Table
public class Transaction {
	
	@Id
	@GeneratedValue
	private Integer id;
	@NotBlank(message="Transaction type cannot be empty.")
	private String type;//states whether credit or debit transaction
	
	//description explains why the transaction is made..ex:rent, tax or utility payment..etc
	private String description; 	
	private double amount;	
	private int accountId;
	
	//@Basic
	//private LocalDateTime transactionTime;

	
	public void setId(Integer id) {
		this.id = id;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public double getAmount() {
		return amount;
	}

	public void setAmount(double amount) {
		this.amount = amount;
	}

	public Integer getId() {
			return id;
	}

	public int getAccountId() {
		return accountId;
	}

	public void setAccountId(int accountId) {
		this.accountId = accountId;
	}
}