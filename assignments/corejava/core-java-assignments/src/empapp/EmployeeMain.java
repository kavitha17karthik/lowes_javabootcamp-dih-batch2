package empapp;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.Scanner;
import java.util.Iterator;

class Employee{
    public String name;
    public int age;
    public String designation;
    public String emailid;
    public double salary;

    Employee(String name,int age,String designation,String emailid,double salary) {

        this.salary = salary;
        this.age = age;
        this.emailid = emailid;
        this.designation=designation;
        this.name=name;
    }
    public Employee()
    {

    }

}

public class EmployeeMain {
    static ArrayList<Employee> employeeList = new ArrayList<Employee>();

    public static void main(String[] args) {
        for (int i = 0; i < 7; i++) {
            addEmployees(employeeList);
        }
    }
    public static void addEmployees(ArrayList<Employee> employeeList) {

        String option;
        String name;
        String designation;
        String emailid;
        double salary;
        int age;
        boolean check=true;

        System.out.println("1. Enter Employee details");
        System.out.println("2. Show Employee details");
        System.out.println("3. Delete Employee details");
        System.out.println("4: Exit (OR) Quit");

        System.out.println("which of the above operation do you want to perform");
        Scanner sc1 = new Scanner(System.in);
        option = sc1.next();
        switch (option) {
            case "1":

                Scanner sc = new Scanner(System.in);
                System.out.println("********* Enter Employee Details*******");
                System.out.println("Enter Employee Name");
                name = sc.next();
                System.out.println("Enter Employee Age");
                age = sc.nextInt();
                System.out.println("Enter Employee Designation");
                designation = sc.next();
                System.out.println("Enter Employee EmailID");
                emailid = sc.next();
                System.out.println("Enter Employee Salary");
                salary = sc.nextInt();
                Employee employee = new Employee(name, age, designation, emailid, salary);
                employeeList.add(employee);
                break;
            case "2":

                for (Employee em : employeeList) {
                    System.out.format("%s       \t%s        \t %s       \t %s       \t      %s  \n", em.name, em.age, em.designation, em.emailid, em.salary);
                }
                break;
            case "3":
                System.out.println("Enter the employee Name ");
                Scanner put =new Scanner(System.in);
                String empName = put.next();
                System.out.println("do you want to delete  "+empName + "  from array (say yes or no)");
                Scanner del=new Scanner(System.in);
                String checkDel = del.next();
                if(checkDel.equals("yes")) {
                    Iterator<Employee> itr = employeeList.iterator();
                    while (itr.hasNext()) {
                        Employee index = itr.next();
                        System.out.println("name is: " + index.name);
                        if (index.name.equals(empName)) {
                            System.out.println("Name matches");
                            itr.remove();
                        }
                    }
                }
                break;
            case "4":
                System.out.println("Exiting from the program\n");
                break;
            default:
                System.out.println("Enter a proper value from 1 to 4\n");
                break;
        }
    }
}

