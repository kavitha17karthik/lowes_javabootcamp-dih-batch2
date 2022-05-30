package com.lowes.empapp.Util;
//package com.lowes.empapp;
//
//public class Input {
//}

//package com.lowes.empapp;
//
//public class InputUtilities {
//}

//package com.lowes.empapp.input;

import com.lowes.empapp.Model.Employee;
import java.util.Scanner;
import java.util.function.Predicate;

public class InputUtil{
    public InputUtil() {
    }

    //boolean valStatus = validate(employee, validator);
    public static String getString(Scanner scan) {
        String string = "";
        string = scan.nextLine();
        return string;
    }
    public static int getInt(Scanner scan) throws NumberFormatException {
        int intNumber = 0;

        try {
            intNumber = scan.nextInt();
            return intNumber;
        } catch (NumberFormatException var3) {
            throw new NumberFormatException("Please Enter the double value and try again");
        }
    }

    public static Employee getEmployeeData() {

        Employee emp = new Employee();
        System.out.println("Enter Employee ID : ");
        Scanner sc1=new Scanner(System.in);
        String empId= sc1.nextLine();
        emp.setEmpId(empId);

        System.out.println("Enter Employee Name : ");
        Scanner sc2=new Scanner(System.in);
        String employeeName = sc2.nextLine();
        emp.setEmployeeName(employeeName);

        System.out.println("Enter the Age : ");
        Scanner sc3=new Scanner(System.in);
        Integer age= sc3.nextInt();
        emp.setSalary(age);

        System.out.println("Enter the Salary : ");
        Scanner sc4=new Scanner(System.in);
        Integer salary= sc4.nextInt();
        emp.setSalary(salary);

        System.out.println("Enter the Designation : ");
        Scanner sc5=new Scanner(System.in);
        String designation= sc5.nextLine();
        emp.setDesignation(designation);

        System.out.println("Enter the Department : ");
        Scanner sc6=new Scanner(System.in);
        String department= sc6.nextLine();
        emp.setDesignation(department);
        return emp;

    }

    public static boolean validate(Employee emp, Predicate<Employee> validator) {
        // emp.getAge() >= 20 && emp.getAge() <= 60 && emp.getSalary() > 0
        return validator.test(emp); // executes lambda expression body
    }
}


