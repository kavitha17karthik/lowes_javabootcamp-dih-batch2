package com.examples.bankingapp.fundtransfer.model;

import javax.persistence.Entity;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;

// NOTE: order is SQL keyword. We can't create table with that name. 
@Entity(name = "fundtrans")
public class FundTransfer {

	@Id
	@GeneratedValue
	private Integer id;
	private String sourceAcctNo;
	private String dstnAcctNo;
	private double amount;
	private String type;
	private String status;
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getSourceAcctNo() {
		return sourceAcctNo;
	}
	public void setSourceAcctNo(String sourceAcctNo) {
		this.sourceAcctNo = sourceAcctNo;
	}
	public String getDstnAcctNo() {
		return dstnAcctNo;
	}
	public void setDstnAcctNo(String dstnAcctNo) {
		this.dstnAcctNo = dstnAcctNo;
	}
	public double getAmount() {
		return amount;
	}
	public void setAmount(double amount) {
		this.amount = amount;
	}

	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}

	
}