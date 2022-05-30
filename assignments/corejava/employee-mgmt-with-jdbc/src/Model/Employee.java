package Model;

import java.io.File;
import java.io.FileNotFoundException;
import java.sql.SQLException;
import java.util.Scanner;

public class Employee {
    private int empId;
    private String empName;
    private int empAge;
    private String empDesignation;
    private String empDepartment;
    private double empSalary;

    public Employee() {
    }

    public Employee(int id, String name, int age, double salary,String designation, String department) {
        this.empId = id;
        this.empName = name;
        this.empAge = age;
        this.empSalary = salary;
        this.empDepartment=department;
        this.empDesignation=designation;
    }

    public int getEmpId() {
        return this.empId;
    }

    public void setEmpId(int empId) {
        this.empId = empId;
    }

    public String getEmpName() {
        return this.empName;
    }
    public void setEmpName(String empName) {
        this.empName = empName;
    }

    public int getEmpAge() {
        return this.empAge;
    }

    public void setEmpAge(int empAge) {
        this.empAge = empAge;
    }

    public double getEmpSalary() {
        return this.empSalary;
    }

    public void setEmpSalary(double empSalary) {
        this.empSalary = empSalary;
    }

    public void setEmpDesignation(String empDesignation) { this.empDesignation = empDesignation;  }
    public String getEmpDesignation() {
        return this.empDesignation;
    }

    public void setEmpDepartment(String empDepartment) { this.empDepartment = empDepartment;  }
    public String getEmpDepartment() {
        return this.empDepartment;
    }

   // public static int insertdata(Employee emp) throws ClassNotFoundException, SQLException

    public String toString() {
        return "Employee{id=" + this.empId + ", Name=" + this.empName + ", Age=" + this.empAge + ", Salary=" + this.empSalary + ", Designation=" + this.empDesignation + ", Department=" + this.empDepartment +   '}';
    }



}
