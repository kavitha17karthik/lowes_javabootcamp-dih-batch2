package Main;

import Model.Employee;
import Service.EmployeeDaoImpl;
import Service.EmployeeService;
import Util.DbConnection;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.support.AbstractApplicationContext;

import java.io.*;
import java.sql.*;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.*;
import java.util.function.BinaryOperator;
import java.util.function.Consumer;
import java.util.function.Predicate;
import java.util.stream.Collectors;

public class EmployeeManagementApp {
    public static void main(String[] args) throws SQLException, ClassNotFoundException, IOException {
        AnnotationConfigApplicationContext applicationContext = new AnnotationConfigApplicationContext(BeanConfiguration.class);
        System.out.println("Bean Count: " + applicationContext.getBeanDefinitionCount());

        for (String beanName : applicationContext.getBeanDefinitionNames()) {
            System.out.println(beanName);
        }

        EmployeeService employeeService = applicationContext.getBean("employeeService", EmployeeService.class);

        int choice = 0;

        do {
            System.out.println("Type 1 - Add Employee");
            System.out.println("Type 2 - Display All");
            System.out.println("Type 3 - Update Employee by Specific Field");
            System.out.println("Type 4 - Delete by ID");
            System.out.println("Type 5 - Import");
            System.out.println("Type 6 - Export");
            System.out.println("Type 7 - Print Statistics");
            System.out.println("Type 8 - Exit");
            System.out.println("Enter Your Choice");
            Scanner sc = new Scanner(System.in);
            Scanner sc1 = new Scanner(System.in);
            choice = sc.nextInt();

            switch (choice) {
                case 1:
                    System.out.println("Adding Employee....");
                    Employee employee = getEmployee();
                    employeeService.insert(employee);
                    break;

                case 2:
                    System.out.println("Getting All Employee Information....");
                    List<Employee> empList = employeeService.showAll();
                    for (Employee e : empList) {
                        System.out.println(e);
                    }
                    break;

                case 3:
                    System.out.println("Update which Employees Designation/Department to be modified");
                    int eId = sc.nextInt();
                    String eDesignation = sc1.nextLine();//.dept..designation
                    employeeService.updateEmployeeDesignationById(eDesignation, eId);
                    break;

                case 4:
                    System.out.println("Enter EmployeeID of a person whose record needs to be deleted");
                    int delEmp = sc.nextInt();
                    employeeService.delete(delEmp);
                    System.out.println("Employee ID " + delEmp + " is deleted");
                    break;

                case 5:
                    int count = 0;
                    try {

                        System.out.println("Import");
                        employee = new Employee();
                        String name = "", design = null, dept = null;
                        int age = 0, id = 0;
                        double salary = 0.0;
                        BufferedReader in = new BufferedReader(new FileReader("src/emp_data.txt"), 16 * 1024);
                        String readLine = null;

                        while ((readLine = in.readLine()) != null) {
                            Employee emp = new Employee();
                            String employeeInfo[] = readLine.split(",");
                            System.out.println(employeeInfo[6]);

                            emp.setEmpId(Integer.parseInt(employeeInfo[0]));
                            emp.setEmpName(employeeInfo[1]);
                            emp.setEmpAge(Integer.parseInt(employeeInfo[2]));
                            emp.setEmpSalary(Double.parseDouble(employeeInfo[3]));
                            emp.setEmpDepartment(employeeInfo[4]);
                            emp.setEmpDesignation(employeeInfo[5]);
                            emp.setEmploymentDate(LocalDate.parse(employeeInfo[6]));
                            employeeService.insert(emp);
                        }
                    } catch (Exception e) {
                        System.out.println("Exception: ReadFileInfo" + e.getMessage());
                    }

                    System.out.println("Import");
                    break;
                case 6:
                    System.out.println("Export");
                    BufferedWriter bWriter = new BufferedWriter(new FileWriter("emp_data.txt"));

                    try {
                        List<Employee> empExportList = employeeService.showAll();
                        for (Employee e : empExportList) {
                            bWriter.write(e.toString() + "\n");
                        }

                    } catch (IOException e) {
                        System.out.println("IoException ...exportFileThread" + e.getMessage());
                    } finally {
                        System.out.println("called finally");
                        bWriter.close();
                    }

                    break;
                case 7:
                    List<Employee> arrayList4 = employeeService.showAll();
                    System.out.println("Displays how many Department are there in the organization");
                    arrayList4.stream()
                            .map(Employee::getEmpDepartment)
                            .distinct()
                            .forEach(System.out::println);
                    System.out.println("**************************************");
                    System.out.println("Highest paid employee in the organizaion");
                    Optional<Employee> highestPaidEmployeeWrapper =
                            arrayList4.stream().collect(Collectors.maxBy(Comparator.comparingDouble(Employee::getEmpSalary)));

                    Employee highestPaidEmployee = highestPaidEmployeeWrapper.get();

                    System.out.println("Details Of Highest Paid Employee : ");

                    System.out.println("=======================+===========");

                    System.out.println("ID : " + highestPaidEmployee.getEmpId());

                    System.out.println("Name : " + highestPaidEmployee.getEmpName());

                    System.out.println("Department : " + highestPaidEmployee.getEmpDepartment());

                    System.out.println("Salary : " + highestPaidEmployee.getEmpSalary());
                    System.out.println("***********************************");
                    System.out.println("Select Highest Paid Employee of Each Department");
                    //first group by dept..with grouping return the max salary..at the end choose the max one
                    Comparator<Employee> empHighSalary = Comparator.comparing(Employee::getEmpSalary);
                    Map<String, Optional<Employee>> empHighSalarycollect =
                            arrayList4.stream().collect(
                                    Collectors.groupingBy(
                                            Employee::getEmpDepartment,
                                            Collectors.reducing(BinaryOperator.maxBy(empHighSalary))
                                    )
                            );
                    empHighSalarycollect.entrySet().stream().forEach(System.out::println);
                    System.out.println("***********************************");
                    System.out.println("Select Lowest Paid Employee of Each Department");
                    //first group by dept..with grouping return the max salary..at the end choose the max one
                    Comparator<Employee> empLowSalary = Comparator.comparing(Employee::getEmpSalary);
                    Map<String, Optional<Employee>> empLowSalaryCollect =
                            arrayList4.stream().collect(
                                    Collectors.groupingBy(
                                            Employee::getEmpDepartment,
                                            Collectors.reducing(BinaryOperator.minBy(empLowSalary))
                                    )
                            );
                    empLowSalaryCollect.entrySet().stream().forEach(System.out::println);

                    System.out.println("Employees Salary more than 50k");
                    List<Employee> filteredList = arrayList4.stream()
                            .filter(e -> e.getEmpSalary() > 50000)
                            .collect(Collectors.toList());

                    filteredList.forEach(System.out::println);
                    System.out.println("***********************************");
                    System.out.println("Average salary of all the people");

                    DoubleSummaryStatistics employeeSalaryStatistics =
                            arrayList4.stream().collect(Collectors.summarizingDouble(Employee::getEmpSalary));

                    System.out.println("Average Salary = " + employeeSalaryStatistics.getAverage());

                    System.out.println("Total Salary = " + employeeSalaryStatistics.getSum());
                    System.out.println("***********************************");
                    break;

                case 8:
                    System.out.println("Exiting...");
                    System.exit(0);
                    break;
                default:
                    break;
            }
        } while (choice != 0);

    }

    private static Employee getEmployee() {

        Scanner sc1 = new Scanner(System.in);
        Scanner sc2 = new Scanner(System.in);
        Scanner sc3 = new Scanner(System.in);
        boolean ageVal;
        boolean valAgeFlag = true;

        Employee employee = new Employee();

        System.out.println("Enter Employee Number: ");
        int eNo = sc1.nextInt();
        employee.setEmpId(eNo);

        System.out.println("Enter Employee Name: ");
        String eName = sc2.nextLine();
        employee.setEmpName(eName);

        do {
            try {
                System.out.println("Enter the Age : ");
                sc1 = new Scanner(System.in);
                int age = sc1.nextInt();
                employee.setEmpAge(age);
                boolean valAge = validate(employee, e -> e.getEmpAge() >= 21 && e.getEmpAge() <= 60);
                if (valAge) {
                    System.out.println("Valid Age and Employee record is saved");
                } else {
                    handleError("Enter Valid age (21 to 60)", msg -> {
                        System.out.println("Validation Error:");
                        System.out.println(msg);
                    });
                    sc1.next();

                }
            } catch (InputMismatchException e) {
                //when we input string for Int datatype..InputMismatchException is thrown
                System.out.println("Age should be in Numbers.");
                sc1.next();
                valAgeFlag = false;
            }

        } while (!valAgeFlag);

        boolean valSalaryFlag = true;
        do {
            try {
                System.out.println("Enter the Salary : ");
                Integer salary = sc3.nextInt();
                employee.setEmpSalary(salary);
                boolean valSalary = validate(employee, e -> e.getEmpSalary() > 0);
                if (valSalary) {
                    System.out.println("Employee Record Saved");
                } else {
                    handleError("Wage cannot be zero", msg -> {
                        System.out.println("Validation Error:");
                        System.out.println(msg);
                    });
                    sc3.next();

                }
            } catch (InputMismatchException e) {
                //when we input string for Int datatype..InputMismatchException is thrown
                System.out.println("Salary :InputMismatchException " + e.getMessage());
            }
        } while (!valSalaryFlag);

        System.out.println("Enter Employee Department: ");
        String eDepartment = sc2.nextLine();
        employee.setEmpDepartment(eDepartment);

        System.out.println("Enter Employee Designation: ");
        String eDesignation = sc2.nextLine();
        employee.setEmpDesignation(eDesignation);

        // validate Date of Joining
        boolean valDojStatus = true;
        do {
            try {
                System.out.println("Enter Date of joining (doj) in yyyy-MM-dd  format: ");
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");  // doubt - Rectified
                LocalDate doj = LocalDate.parse(sc2.next(), formatter);
                employee.setEmploymentDate(doj);
                System.out.println("Local Date" + doj);
                valDojStatus = true;
            } catch (DateTimeParseException e) {
                System.out.println("Invalid Date format, Enter date in dd-mm-yyyy  format");
                valDojStatus = false;
            }
        } while (!valDojStatus);
        return employee;

    }
    public static boolean validate(Employee emp, Predicate<Employee> validator) {
        return validator.test(emp); // executes lambda expression body
    }
    public static void handleError(String errorMessage, Consumer<String> consumer)
    {
        consumer.accept(errorMessage);
    }
}

