
import java.util.Scanner;
class Emp
{
    String name;
    int age;
    double salary;
    String designation;
    Scanner sc =  new Scanner(System.in);
    public void create()
    {
        System.out.println("Enter name:");
        this.name = sc.next();
        System.out.println("Enter age: ");
        this.age = sc.nextInt();
        System.out.println("Enter salary: ");
        this.salary = sc.nextDouble();
        System.out.println("Enter designation:");
        this.designation = sc.next();
    }
    public void display()
    {
        System.out.println(" name " + name + "\n age " + age + "\n salary " + salary + "\n Designation " + designation + "\n");
    }
    public void raisedSalary()
    {
        this.salary = salary + 1000;
        System.out.println("salary rised");
    }
}
public class EmployeeArray {
    public static void main(String[] args)
    {
        Scanner sc = new Scanner(System.in);
        Emp[] e = null;
        boolean r = false;
        do{
            System.out.println("1.Create \n 2. Display \n 3.Rise Salary \n 4.Exit");
            int ch=sc.nextInt();
            if(ch==4)
                break;
            switch(ch)
            {
                case 1:
                    System.out.println("Enter no of employees to be created:");
                    int size =sc.nextInt();
                    e=new Emp[size];
                    for(int k=0;k<e.length;k++)
                        e[k] = new Emp();
                    for(int j=0;j<e.length;j++)
                        e[j].create();
                    r=true;
                    break;
                case 2:
                    if(r)
                        for(int j=0;j<e.length;j++)
                            e[j].display();
                    else
                        System.out.println("No records\n");
                    break;
                case 3:
                    if(r)
                        for(int j=0;j<e.length;j++)
                            e[j].raisedSalary();
                    else
                        System.out.println("No records \n");
                    break;
                case 4:
                    System.out.println("No records");
            }
        }while(true);
        sc.close();

    }
}

/*
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



*/

/*
package empapp;
import java.util.Iterator;
import java.io.Console;
import java.util.Scanner;
import java.util.Iterator;

class Employee {
    public String name;
    public int age;
    public String designation;
    public String emailid;
    public double salary;

    public Employee(String name, int age, String designation, String emailid, double salary) {

        this.salary = salary;
        this.age = age;
        this.emailid = emailid;
        this.designation = designation;
        this.name = name;
    }


}
public class EmployeeMain  {
    // static ArrayList<Employee> employeeList = new ArrayList<Employee>();
        public static Employee emp[] = new Employee[10];
        public static int i;

    public static void main(String[] args) {

        int choice;
       // Scanner sc = new Scanner(System.in);

       for ( i =0; i < 10; i++) {
           System.out.println("1:add employee");
           System.out.println("2:show employee");
           System.out.println("enter choice");
           Scanner sc1 = new Scanner(System.in);
           choice = sc1.nextInt();
           System.out.println("choice is"+choice);
           switch (choice) {
               case 1:
                   System.out.println("inside case 1");
                   System.out.println("i value is "+i);
                   addEmployee(emp[i]);

                   break;
               case 2:
                   System.out.println("show details");
                   for (int j = 0; j < i; j++) {
                       System.out.println("Name        Age         Designation     Salary      EmailID");
                       System.out.println(emp[j].name + "       " + emp[j].age + "      " + emp[j].designation + "      " + emp[j].salary + "       " + emp[j].emailid);
                       //emp[j].showEmployee();
                   }
                   break;
               default:
                   System.out.println("default");
                   break;

           }
       }

        }

    public void addEmployee(Employee e[])
    {
        System.out.println("inside addemployee");
         String name;
         int age;
         String designation;
         String emailid;
         double salary;
        Scanner sc = new Scanner(System.in);

        System.out.println("enter name");
        name = sc.next();
        e[i].name=name;

        System.out.println("enter age");
        age =  sc.nextInt();
        e[i].age=age;
        System.out.println("enter designation");
        designation= sc.next();
        e[i].designation=designation;
        System.out.println("enter salary");
        salary =  sc.nextInt();
        e[i].salary=salary;
        System.out.println("enter emailid");
        emailid= sc.next();
        e[i].emailid=emailid;



    }
    }

*//*



*/
