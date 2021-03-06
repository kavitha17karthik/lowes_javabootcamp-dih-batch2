package com.labs.spring.boot.model;
import javax.persistence.Entity;


import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.xml.bind.annotation.XmlRootElement;


@XmlRootElement
@Entity
@Table
public class Employee{
	@Id
	@GeneratedValue
	private int id;
	@NotNull(message = "Name is mandatory: Should not be null/blank")
	@NotBlank(message = "Name is mandatory: Should not be null/blank")
	private String name;
	@Min(21)
	@Max(60)
	private Integer age = null;
	//@NotBlank(message = "Gender is mandatory")
	//private String gender;
	//private double salary;
	private String designation;
	private String department;	
	@NotNull(message = "Country Cannot be Blank/Null")
	@NotBlank(message = "Country Cannot be Blank/Null")
	private String country;
	
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

	public Integer getAge() {
		return age;
	}

	public void setAge(Integer age) {
		this.age = age;
	}
	/*
	 * public String getGender() { return gender; }
	 * 
	 * public void setGender(String gender) { this.gender = gender; }
	 */

	public String getDepartment() {
		return department;
	}

	public void setDepartment(String department) {
		this.department = department;
	}

	public String getDesignation() {

		return designation;
	}

	public void setDesignation(String designation) {

		this.designation = designation;
	}

	/*
	 * public String getAddress() { return address; }
	 * 
	 * public void setAddress(String address) { this.address = address; }
	 */

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

}
