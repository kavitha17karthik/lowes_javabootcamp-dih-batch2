package com.lowes.empapp.EmployeeMain;

import com.lowes.empapp.Model.Employee;
import com.lowes.empapp.Service.EmployeeService;
import com.lowes.empapp.Service.EmployeeServiceColImpl;
import com.lowes.empapp.Util.DisplayUtil;
import com.lowes.empapp.Util.InputUtil;
import java.util.List;
import java.util.Scanner;

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
            System.out.println("Type 1 - Add Employee");
            System.out.println("Type 2 - Display All");
            System.out.println("Type 3 - Update Salary");
            System.out.println("Type 4 - Delete by ID");
            System.out.println("Type 5 - To Exit");
            System.out.println("Enter Your Choice");
            Scanner sc = new Scanner(System.in);
            int choice = sc.nextInt();
            switch (choice) {
                case 1:
                    Employee emp = InputUtil.getEmployeeData();
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
                    System.out.println("Enter the Emp Id to be updated : ");
                    String empId = InputUtil.getString(scan);
                    System.out.println("Enter the Salary to be update : ");
                    float salary = InputUtil.getFloat(scan);
                   // List<Employee> arrayList2 = empObject.updateEmployeeArrayList(empId, salary);
                    List<Employee> linkedList2 = empObject.updateEmployeeLinkedList(empId, salary);
                   // System.out.println("array List : " + arrayList2);
                    System.out.println("Linked List : " + linkedList2);

                    break;
                case 4:
                    System.out.println("Enter the Emp ID to be Deleted : ");
                    String emId = InputUtil.getString(scan);
                   // List<Employee> arrayList3 = empObject.deleteEmployeeArrayList(emId);
                    List<Employee> linkedList3 = empObject.deleteEmployeeLinkedList(emId);
                   // System.out.println("array List : " + arrayList3);
                    System.out.println("Linked List : " + linkedList3);
                    break;
                default:
                    flag = true;
            }
        } while(!flag);

    }
}

