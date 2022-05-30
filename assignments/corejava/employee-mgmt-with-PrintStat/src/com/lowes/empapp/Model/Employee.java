package com.lowes.empapp.Model;

import java.util.ArrayList;

public class Employee implements Comparable<Employee> {

    private String empId;
    private String employeeName;
    private String designation;
    private double salary;
    private int age;
    private String department;


    public Employee() {
    }

    public Employee(String empNum, String empName, int empAge, int empSalary, String empDesign, String empDept) {
        this.empId=empNum;
        this.employeeName=empName;
        this.age=empAge;
        this.salary=empSalary;
        this.designation=empDesign;
        this.department=empDept;
    }


    public String getEmpId() {
        return this.empId;
    }

    public void setEmpId(String mId) {
        this.empId = mId;
    }

    public int getAge() {
        return this.age;
    }

    public void setAge(int age ) {
        this.age = age;
    }

    public String getDepartment() {
        return this.department;
    }

    public void setDepartment(String dept) {
        this.department = dept;
    }

    public String getEmployeeName() {
        return this.employeeName;
    }

    public void setEmployeeName(String employeeName) {
        this.employeeName = employeeName;
    }

    public double getSalary() {
        return this.salary;
    }

    public void setSalary(double salary) {
        this.salary = salary;
    }
    public String getDesignation() {
        return this.designation;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }

/*
    public int hashCode() {
        boolean prime = true;
        int result = 1;
        result = 31 * result + (this.employeeName == null ? 0 : this.employeeName.hashCode());
        result = 31 * result + (this.empId == null ? 0 : this.empId.hashCode());
        result = 31 * result + (this.salary == null ?0: this.empId.hashCode());
        result = 31 * result + (this.designation == null ? 0 : this.designation.hashCode());
        return result;
    }*/
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        } else if (obj == null) {
            return false;
        } else if (this.getClass() != obj.getClass()) {
            return false;
        } else {
            Employee other = (Employee)obj;
            if (this.employeeName == null) {
                if (other.employeeName != null) {
                    return false;
                }
            } else if (!this.employeeName.equals(other.employeeName)) {
                return false;
            }

            if (this.empId == null) {
                if (other.empId != null) {
                    return false;
                }
            } else if (!this.empId.equals(other.empId)) {  //***********HERE*********
                return false;
            }
           // if (Float.floatToIntBits(this.salary) != Float.floatToIntBits(other.salary)) {
            if (this.salary != other.salary) {
                return false;
            } else {
                if (this.designation == null) {
                    if (other.designation != null) {
                        return false;
                    }
                } else if (!this.designation.equals(other.designation)) {
                    return false;
                }

                return true;
            }
        }
    }

    public int compareTo(Employee arg0) {
        return this.empId.compareTo(arg0.getEmpId());
    }

    public String toString() {
        System.out.println();
        return this.empId + "\t  " + this.employeeName +"\t  " +  this.salary +"\t  " + this.designation;

    }
}
