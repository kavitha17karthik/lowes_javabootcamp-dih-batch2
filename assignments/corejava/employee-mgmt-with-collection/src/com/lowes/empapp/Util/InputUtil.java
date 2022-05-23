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

    public static int getInt(Scanner scan) throws NumberFormatException {
       // int intNumber = 0;

        try {
            int intNumber = Integer.parseInt(scan.nextLine());
            return intNumber;
        } catch (NumberFormatException var3) {
            throw new NumberFormatException("Please enter the Integer value and try again : ");
        }
    }

    public static double getDouble(Scanner scan) throws NumberFormatException {
        double doubleNumber = 0.0;

        try {
            doubleNumber = Double.parseDouble(scan.nextLine());
            return doubleNumber;
        } catch (NumberFormatException var4) {
            throw new NumberFormatException("Please Enter the double value and try again");
        }
    }

    public static float getFloat(Scanner scan) throws NumberFormatException {
        float floatNumber = 0.0F;

        try {
            floatNumber = Float.parseFloat(scan.nextLine());
            return floatNumber;
        } catch (NumberFormatException var3) {
            throw new NumberFormatException("Please Enter the double value and try again");
        }
    }

    public static String getString(Scanner scan) {
        String string = "";
        string = scan.nextLine();
        return string;
    }

    public static Employee getEmployeeData(Scanner scan) {
        Employee emp = new Employee();
        DisplayUtil.displayMessage("Enter the id : ");
        String mId = getString(scan);
        emp.setmId(mId);
        DisplayUtil.displayMessage("Enter the name : ");
        String employeeName = getString(scan);
        emp.setEmployeeName(employeeName);
        DisplayUtil.displayMessage("Enter the Salary : ");
        float salary = getFloat(scan);
        emp.setSalary(salary);
        DisplayUtil.displayMessage("Enter the Designation : ");
        String designation = getString(scan);
        emp.setDesignation(designation);

        return emp;
    }
}


