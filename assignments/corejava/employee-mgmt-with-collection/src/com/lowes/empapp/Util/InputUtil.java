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

public class InputUtil{
    public InputUtil() {
    }

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

        System.out.println("Enter the Salary : ");
        Scanner sc3=new Scanner(System.in);
        Integer salary= sc3.nextInt();
        emp.setSalary(salary);

        System.out.println("Enter the Designation : ");
        Scanner sc4=new Scanner(System.in);
        String designation= sc4.nextLine();
        emp.setDesignation(designation);

        return emp;
    }
}


