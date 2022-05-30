package Model;

import java.io.Serializable;

public class Employee implements Serializable, Comparable<Employee> {
    private String empId;
    private String employeeName;
    private String designation;
    private Integer salary;


    public Employee() {
    }

    public String getEmpId() {
        return this.empId;
    }

    public void setEmpId(String mId) {
        this.empId = mId;
    }

    public String getEmployeeName() {
        return this.employeeName;
    }

    public void setEmployeeName(String employeeName) {
        this.employeeName = employeeName;
    }

    public int getSalary() {
        return this.salary;
    }

    public void setSalary(int salary) {
        this.salary = salary;
    }
    public String getDesignation() {
        return this.designation;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }

    public int hashCode() {
        boolean prime = true;
        int result = 1;
        result = 31 * result + (this.employeeName == null ? 0 : this.employeeName.hashCode());
        result = 31 * result + (this.empId == null ? 0 : this.empId.hashCode());
        //result = 31 * result + Float.floatToIntBits(this.salary);
        result = 31 * result + (this.salary == null ?0: this.empId.hashCode());

        result = 31 * result + (this.designation == null ? 0 : this.designation.hashCode());
        return result;
    }
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
        System.out.println("this.empid"+this.empId);
        System.out.println("arg0:empid"+arg0.empId);
        return this.empId.compareTo(arg0.getEmpId());
    }

    public String toString() {
        System.out.println();
        return this.empId + "\t  " + this.employeeName +"\t  " +  this.salary +"\t  " + this.designation;

    }
}



/*
package Model;
import java.io.Serializable;
import java.util.ArrayList;
import Service.EmployeeService;

public class Employee implements Serializable  {
    private int empNo;
    private String empName;
    private int empSalary;
    private String empDesignation;

   // ArrayList<Employee> a1= new ArrayList<Employee>();

    public Employee(int empNo, String empName, int salary, String designation) {
        this.empNo = empNo;
        this.empName = empName;
        this.empSalary = salary;
        this.empDesignation = designation;
    }

    public String toString() {
        return empNo + "  " + empName + " " + empSalary + " " + empDesignation;

    }
}

*/
