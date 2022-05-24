package com.lowes.empapp.Model;

public class Employee implements Comparable<Employee> {
    private String mId;
    private String employeeName;
    private String designation;
    private float salary;


    public Employee() {
    }

    public String getmId() {
        return this.mId;
    }

    public void setmId(String mId) {
        this.mId = mId;
    }

    public String getEmployeeName() {
        return this.employeeName;
    }

    public void setEmployeeName(String employeeName) {
        this.employeeName = employeeName;
    }

    public float getSalary() {
        return this.salary;
    }

    public void setSalary(float salary) {
        this.salary = salary;
    }
    public String getDesignation() {
        return this.designation;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
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

            if (this.mId == null) {
                if (other.mId != null) {
                    return false;
                }
            } else if (!this.mId.equals(other.mId)) {  //***********HERE*********
                return false;
            }
            if (Float.floatToIntBits(this.salary) != Float.floatToIntBits(other.salary)) {
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
        return this.mId.compareTo(arg0.getmId());
    }

    public String toString() {
        return this.mId + "  " + this.employeeName +"   " +  this.salary +"   " + this.designation;

    }
}
