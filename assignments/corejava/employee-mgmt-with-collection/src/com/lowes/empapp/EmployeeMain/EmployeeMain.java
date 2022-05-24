package com.lowes.empapp.EmployeeMain;
import com.lowes.empapp.Model.Employee;
import com.lowes.empapp.Service.EmployeeService;
import com.lowes.empapp.Service.EmployeeServiceColImpl;
import com.lowes.empapp.Util.DisplayUtil;
import com.lowes.empapp.Util.InputUtil;
import java.util.List;
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
                    List<Employee> arrayList = empObject.addEmployeeArrayList(emp);
                    List<Employee> linkedList = empObject.addEmployeeLinkedList(emp);
                    Set<Employee> hashSet = empObject.addEmployeeHashSet(emp);
                    Set<Employee> linkedHashSet = empObject.addEmployeeLinkedHashSet(emp);
                    Set<Employee> treeSet = empObject.addEmployeeTreeSet(emp);
                    System.out.println("Array List       : " + arrayList);
                    System.out.println("Linked List      : " + linkedList);
                    System.out.println("Hash set         : " + hashSet);
                    System.out.println("Linked hash set  : " + linkedHashSet);
                    System.out.println("Tree set         : " + treeSet);

                    break;
                case 2:
                    List<Employee> arrayList1 = empObject.readEmployeeArrayList();
                    List<Employee> linkedList1 = empObject.readEmployeeLinkedList();
                    Set<Employee> hashSet1 = empObject.readEmployeeHashSet();
                    Set<Employee> linkedHashSet1 = empObject.readEmployeeLinkedHashSet();
                    Set<Employee> treeSet1 = empObject.readEmployeeTreeSet();
                    System.out.println("Array List        : " + arrayList1);
                    System.out.println("Linked List       : " + linkedList1);
                    System.out.println("Hash set          : " + hashSet1);
                    System.out.println("linked hash set   : " + linkedHashSet1);
                    System.out.println("Tree set          : " + treeSet1);
                    break;
                case 3:
                    System.out.println("Enter the Emp Id to be updated : ");
                    String empId = InputUtil.getString(scan);
                    System.out.println("Enter the Salary to be update : ");
                    Integer salary = InputUtil.getInt(scan);
                    List<Employee> arrayList2 = empObject.updateEmployeeArrayList(empId, salary);
                    List<Employee> linkedList2 = empObject.updateEmployeeLinkedList(empId, salary);
                    Set<Employee> hashSet2 = empObject.updateEmployeeHashSet(empId, salary);
                    Set<Employee> linkedHashSet2 = empObject.updateEmployeeLinkedHashSet(empId, salary);
                    Set<Employee> treeSet2 = empObject.updateEmployeeTreeSet(empId, salary);
                    System.out.println("Array List      : " + arrayList2);
                    System.out.println("Linked List     : " + linkedList2);
                    System.out.println("Hash set        : " + hashSet2);
                    System.out.println("Linked hash set : " + linkedHashSet2);
                    System.out.println("Tree set        : " + treeSet2);
                    break;
                case 4:
                    System.out.println("Enter the Emp ID to be Deleted : ");
                    String empId1 = InputUtil.getString(scan);
                    List<Employee> arrayList3 = empObject.deleteEmployeeArrayList(empId1);
                    List<Employee> linkedList3 = empObject.deleteEmployeeLinkedList(empId1);
                    Set<Employee> hashSet3 = empObject.deleteEmployeeHashSet(empId1);
                    Set<Employee> linkedHashSet3 = empObject.deleteEmployeeLinkedHashSet(empId1);
                    Set<Employee> treeSet3 = empObject.deleteEmployeeTreeSet(empId1);
                    System.out.println("Array List       : " + arrayList3);
                    System.out.println("Linked List      : " + linkedList3);
                    System.out.println("Hash set         : " + hashSet3);
                    System.out.println("Linked hash set  : " + linkedHashSet3);
                    System.out.println("Tree set         : " + treeSet3);
                    break;
                default:
                    flag = true;
            }
        } while(!flag);

    }
}

