package com.lowes.empapp.EmployeeMain;
import com.lowes.empapp.Model.Employee;
import com.lowes.empapp.Service.EmployeeService;
import com.lowes.empapp.Service.EmployeeServiceColImpl;
import com.lowes.empapp.Util.DisplayUtil;
import com.lowes.empapp.Util.InputUtil;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.*;
import java.util.function.BinaryOperator;
import java.util.stream.Collectors;

//validation
import java.util.function.Consumer;
import java.util.function.Predicate;
import static java.util.Comparator.comparingInt;
import static java.util.stream.Collectors.collectingAndThen;
import static java.util.stream.Collectors.groupingBy;
import static java.util.stream.Collectors.maxBy;
public class EmployeeMain {
    static Scanner scan;
   // static ArrayList<Employee> arrayList;

    static {
        scan = new Scanner(System.in);
    }

    public EmployeeMain() {
    }
   //

    public static boolean validate(Employee emp, Predicate<Employee> validator) {
        // emp.getAge() >= 20 && emp.getAge() <= 60 && emp.getSalary() > 0
        return validator.test(emp); // executes lambda expression body
    }

    public static void handleError(String errorMessage, Consumer<String> consumer)
    {
        consumer.accept(errorMessage);
    }
    public static void main(String[] args) throws IOException {
        boolean flag = false;
        EmployeeService empObject = new EmployeeServiceColImpl();


       //  List<Employee> arrayList;
        do {
            System.out.println("Type 1 - Add Employee");
            System.out.println("Type 2 - Display All");
            System.out.println("Type 3 - Update Salary");
            System.out.println("Type 4 - Delete by ID");
            System.out.println("Type 5 - Display Statistics");
            System.out.println("Type 6 - Import");
            System.out.println("Type 7 - Exit");
            System.out.println("Enter Your Choice");
            Scanner sc = new Scanner(System.in);
            int choice = sc.nextInt();
          //  EmployeeService empObject = new EmployeeServiceColImpl();

            switch (choice) {
                case 1:
                    Employee emp = InputUtil.getEmployeeData();
                    /*boolean valStatus = validate(emp, e -> e.getAge() >= 21 && e.getAge()<= 60 );

                    if (valStatus) {
                        // Logic to save employee details
                        System.out.println("Employee saved");
                    }
                    else
                    {
                        handleError("Inappropriate Age to Work", msg -> {System.out.println("Validation Error:" );System.out.println(msg);});
                    }*/
                List<Employee> arrayList = empObject.addEmployeeArrayList(emp);
                System.out.println("Array List       : " + arrayList);

                break;
                case 2:
                    List<Employee> arrayList1 = empObject.readEmployeeArrayList();
                    System.out.println("Array List        : " + arrayList1);

                    break;
                case 3:
                    System.out.println("Enter the Emp Id to be updated : ");
                    String empId = InputUtil.getString(scan);
                    System.out.println("Enter the Salary to be update : ");
                    Integer salary = InputUtil.getInt(scan);
                    List<Employee> arrayList2 = empObject.updateEmployeeArrayList(empId, salary);
                    System.out.println("Array List      : " + arrayList2);

                    break;
                case 4:
                    System.out.println("Enter the Emp ID to be Deleted : ");
                    String empId1 = InputUtil.getString(scan);
                    List<Employee> arrayList3 = empObject.deleteEmployeeArrayList(empId1);
                    System.out.println("Array List       : " + arrayList3);

                    break;

                case 5:
                    List<Employee> arrayList4 = empObject.readEmployeeArrayList();
                   /* System.out.println("Displays how many Department are there in the organization");
                    arrayList4.stream()
                            .map(Employee::getDepartment)
                            .distinct()
                            .forEach(System.out::println);
                    System.out.println("******************************");*/
                    System.out.println("Highest paid employee in the organizaion");
                    Optional<Employee> highestPaidEmployeeWrapper =
                            arrayList4.stream().collect(Collectors.maxBy(Comparator.comparingDouble(Employee::getSalary)));

                    Employee highestPaidEmployee = highestPaidEmployeeWrapper.get();

                    System.out.println("Details Of Highest Paid Employee : ");

                    System.out.println("==================================");

                    System.out.println("ID : " + highestPaidEmployee.getEmpId());

                    System.out.println("Name : " + highestPaidEmployee.getEmployeeName());

                    System.out.println("Department : " + highestPaidEmployee.getDepartment());

                    System.out.println("Salary : " + highestPaidEmployee.getSalary());
                    System.out.println("***********************************");
                    System.out.println("Select Highest Paid Employee of Each Department");
                    //first group by dept..with grouping return the max salary..at the end choose the max one
                    Comparator<Employee> empHighSalary = Comparator.comparing(Employee::getSalary);
                    Map<String, Optional<Employee>> empHighSalarycollect =
                            arrayList4.stream().collect(
                                    Collectors.groupingBy(
                                            Employee::getDepartment,
                                            Collectors.reducing(BinaryOperator.maxBy(empHighSalary))
                                    )
                            );
                    empHighSalarycollect.entrySet().stream().forEach(System.out::println);
                    System.out.println("***********************************");
                    System.out.println("Select Lowest Paid Employee of Each Department");
                    //first group by dept..with grouping return the max salary..at the end choose the max one
                    Comparator<Employee> empLowSalary = Comparator.comparing(Employee::getSalary);
                    Map<String, Optional<Employee>> empLowSalaryCollect =
                            arrayList4.stream().collect(
                                    Collectors.groupingBy(
                                            Employee::getDepartment,
                                            Collectors.reducing(BinaryOperator.minBy(empLowSalary))
                                    )
                            );
                    empLowSalaryCollect.entrySet().stream().forEach(System.out::println);

                    System.out.println("Employees Salary more than 50k");
                    List<Employee> filteredList = arrayList4.stream()
                            .filter(e->e.getSalary() > 50000)
                            .collect(Collectors.toList());

                    filteredList.forEach(System.out::println);

                    System.out.println("***********************************");
                    System.out.println("Average salary of all the people");


                    DoubleSummaryStatistics employeeSalaryStatistics=
                            arrayList4.stream().collect(Collectors.summarizingDouble(Employee::getSalary));

                    System.out.println("Average Salary = "+employeeSalaryStatistics.getAverage());

                    System.out.println("Total Salary = "+employeeSalaryStatistics.getSum());

                    break;

                case 6:
                    BufferedReader bReader = new BufferedReader(new FileReader("src/employee.txt"));
                    String readLine = null;
                    List<Employee> arrayList6 = null;
                    while ((readLine = bReader.readLine()) != null) {
                        String employeeInfo[] = readLine.split(",");

                        String empNum = String.valueOf(Integer.parseInt(employeeInfo[0]));
                        String empName = employeeInfo[1];
                        int empAge = Integer.parseInt(employeeInfo[2]);
                        int empSalary = Integer.parseInt(employeeInfo[3]);
                        String empDesign = employeeInfo[4];
                        String empDept = employeeInfo[5];
                        Employee newEmp = new Employee(empNum, empName, empAge, empSalary, empDesign, empDept);
                        arrayList6 = empObject.addEmployeeArrayList(newEmp);
                    }
                    for(Employee e:arrayList6){
                        System.out.println(e);
                    }
                    System.out.println("Import done successfully");
                    break;

                case 7:
                    System.exit(0);
                    break;
                default:
                    flag = true;
            }
        } while(!flag);

    }
}

