package com.lowes.empapp.EmployeeMain;

import com.lowes.empapp.Model.Employee;
import com.lowes.empapp.Service.EmployeeService;
import com.lowes.empapp.Service.EmployeeServiceColImpl;

import com.lowes.empapp.Util.DisplayUtil;
import com.lowes.empapp.Util.InputUtil;
import java.util.List;
import java.util.Map;
import java.util.Scanner;
import java.util.Set;

public class EmployeeMain {
    static Scanner scan;

    static {
        scan = new Scanner(System.in);
    }

    public EmployeeMain() {
    }

    public static void main(String[] args) {
        boolean flag = false;

        EmployeeService empObject = new EmployeeServiceColImpl();

        do {
            DisplayUtil.displayMessage("Press 1 -Add Employee");
            DisplayUtil.displayMessage("Press 2 - Display all the employees data");
            DisplayUtil.displayMessage("Press 3 - Update Salary");
            DisplayUtil.displayMessage("Press 4 - Delete by ID");
            DisplayUtil.displayMessage("Press 5 - To Exit");
            int choice = InputUtil.getInt(scan);
            switch (choice) {
                case 1:
                    Employee emp = InputUtil.getEmployeeData(scan);
                   // List<Employee> arrayList = empObject.addEmployeeArrayList(emp);
                    List<Employee> linkedList = empObject.addEmployeeLinkedList(emp);

                   // System.out.println("array List : " + arrayList);
                    System.out.println("Linked List : " + linkedList);

                    break;
                case 2:
                   // List<Employee> arrayList1 = empObject.readEmployeeArrayList();
                    List<Employee> linkedList1 = empObject.readEmployeeLinkedList();

                   // System.out.println("array List : " + arrayList1);
                    System.out.println("Linked List : " + linkedList1);

                    break;
                case 3:
                    DisplayUtil.displayMessage("Enter the mid to be updated : ");
                    String mId = InputUtil.getString(scan);
                    DisplayUtil.displayMessage("Enter the Salary to be update : ");

                    float salary = InputUtil.getFloat(scan);
                   // List<Employee> arrayList2 = empObject.updateEmployeeArrayList(mId, salary);
                    List<Employee> linkedList2 = empObject.updateEmployeeLinkedList(mId, salary);

                   // System.out.println("array List : " + arrayList2);
                    System.out.println("Linked List : " + linkedList2);

                    break;
                case 4:
                    DisplayUtil.displayMessage("Enter the mid to be updated : ");
                    String mId1 = InputUtil.getString(scan);
                   // List<Employee> arrayList3 = empObject.deleteEmployeeArrayList(mId1);
                    List<Employee> linkedList3 = empObject.deleteEmployeeLinkedList(mId1);

                   // System.out.println("array List : " + arrayList3);
                    System.out.println("Linked List : " + linkedList3);

                    break;
                default:
                    flag = true;
            }
        } while(!flag);

    }
}

