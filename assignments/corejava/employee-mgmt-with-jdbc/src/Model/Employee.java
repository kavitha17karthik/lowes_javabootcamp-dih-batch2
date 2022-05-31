package Model;

import java.text.SimpleDateFormat;
import java.time.LocalDate;

public class Employee {

    //DATE
    private static final ThreadLocal<SimpleDateFormat> df = new ThreadLocal<SimpleDateFormat>() {
        @Override
        protected SimpleDateFormat initialValue() {
            return new SimpleDateFormat("yyyy-MM-dd");

        }
    };
    private int empId;
    private String empName;
    private int empAge;
    private String empDesignation;
    private String empDepartment;
    private double empSalary;
   // private Date empDOJ;
    private LocalDate empDOJ;
    public Employee() {
    }

    public Employee(int id, String name, int age, double salary,String designation, String department,LocalDate employmentDate) {
        this.empId = id;
        this.empName = name;
        this.empAge = age;
        this.empSalary = salary;
        this.empDepartment=department;
        this.empDesignation=designation;
        this.empDOJ = employmentDate;
    }

//DATE
    public LocalDate getEmploymentDate() {
    return empDOJ;
}
    public void setEmploymentDate(LocalDate empDOJ) { this.empDOJ = empDOJ;  }

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

    //DATE
    @Override
   public String toString() {
        SimpleDateFormat fmt = df.get();
        return "Employee{id=" + this.empId + ", Name=" + this.empName + ", Age=" + this.empAge + ", Salary=" + this.empSalary + ", Designation=" + this.empDesignation + ", Department=" + this.empDepartment +  ",Employment Date=" + empDOJ+ '}';
    }

    private boolean doubleEquals(double d1, double d2) {
        return (Math.abs(d1-d2) <= 0.001);
    }

    @Override
    public boolean equals(Object obj) {
        if (!(obj instanceof Employee)) {
            return false;
        }
        Employee other = (Employee) obj;
        SimpleDateFormat fmt = df.get();
        if (this.empId != other.empId) {
            return false;
        }
        if (!this.empName.equals(other.empName)) {
            return false;
        }
        if (!fmt.format(this.empDOJ).equals(fmt.format(other.empDOJ))) {
            return false;
        }
        if (!doubleEquals(this.empSalary, other.empSalary)) {
            return false;
        }
        if (this.empDepartment == null && other.empDepartment != null) {
            return false;
        }
        if (this.empDesignation != null && !this.empDesignation.equals(other.empDesignation)) {
            return false;
        }
        return true;
    }


}
