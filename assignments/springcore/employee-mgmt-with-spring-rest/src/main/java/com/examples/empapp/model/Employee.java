package com.examples.empapp.model;
import javax.xml.bind.annotation.XmlRootElement;
import java.util.List;

@XmlRootElement
public class Employee {

	private int empId;
	private String name;
	private Integer age = null;
	private String designation;
	private String department;
	private String country;
	public int getId() {
		return empId;
	}

	public void setId(int id) {
		this.empId = id;
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
	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}
}
