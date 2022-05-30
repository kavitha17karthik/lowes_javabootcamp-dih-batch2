package Employee;

import Service.EmployeeDAOImpl;
import Model.Employee;
import Dao.EmployeeDao;
import Util.DbConnection;
import Dao.EmployeeDao;

import java.io.*;
import java.math.BigDecimal;
import java.sql.SQLException;
import java.util.*;
import java.sql.*;
import java.util.Date;

//second
public abstract class EmployeeMain {
    static Scanner scan;
    static final String JDBC_DRIVER = "com.mysql.cj.jdbc.Driver";
    static final String DB_URL = "jdbc:mysql://localhost:3306/jdbctraining";

    // Database credentials
    static final String USER = "training";
    static final String PASS = "training";

    static {
        scan = new Scanner(System.in);
    }

    public EmployeeMain() {
    }
static EmployeeDAOImpl employeeDao = new EmployeeDAOImpl();
    public static void main(String[] args) throws SQLException, ClassNotFoundException, FileNotFoundException {
        int choice = 0;


        do {
            System.out.println("Type 1 - Add Employee");
            System.out.println("Type 2 - Display All");
            System.out.println("Type 3 - Update Employee by Specific Field");
            System.out.println("Type 4 - Delete by ID");
            System.out.println("Type 5 - Import");
            System.out.println("Type 6 - Export");
            System.out.println("Type 7 - Exit");
            System.out.println("Enter Your Choice");
            Scanner sc = new Scanner(System.in);
            Scanner sc1 = new Scanner(System.in);
            choice = sc.nextInt();
            switch (choice) {
                case 1:
                    System.out.println("Adding Employee....");
                    Employee employee = getEmployee();
                    employeeDao.insert(employee);
                    break;

                case 2:
                    System.out.println("Getting All Employee Information....");
                    List<Employee> empList = employeeDao.showAll();
                    for (Employee e : empList) {
                        System.out.println(e);
                    }
                    break;

                case 3:
                    System.out.println("Update which Employees Designation/Department to be modified");
                    int eId = sc.nextInt();
                    String eDesignation = sc1.nextLine();//.dept..designation
                    employeeDao.updateEmployeeDesignationById(eDesignation, eId);
                    break;

                case 4:
                    System.out.println("Enter EmployeeID of a person whose record needs to be deleted");
                    int delEmp = sc.nextInt();
                    employeeDao.delete(delEmp);
                    System.out.println("Employee ID " + delEmp + " is deleted");
                    break;

                case 5:

                    int count=0;
                    try
                    {
                       readFileInfo();
                       count++;

                    }catch(Exception e){
                        System.out.println("Exception: ReadFileInfo"+e.getMessage());
                    }
                    System.out.println("count is" +count);
                    System.out.println("Import");
                    break;
                case 6:
                    System.out.println("Export");
                    break;
                case 7:
                    System.out.println("Exiting...");
                    System.exit(0);
                    break;
                default:
                    break;
            }
        } while (choice != 0);
    }
    public static void readFileInfo() throws IOException, SQLException, ClassNotFoundException {
        System.out.println("Import");
       Employee employee = new Employee();
        String name="",design=null,dept=null;
        int age=0,id=0;
        double salary=0.0;
        BufferedReader in = new BufferedReader(new FileReader("src/emp_data.txt"), 16*1024);
        String readLine = null;

        while ((readLine = in.readLine()) != null) {
            Employee emp = new Employee();
            String employeeInfo[] = readLine.split(",");
            System.out.println(employeeInfo[0]);
            System.out.println(employeeInfo[1]);
            System.out.println(employeeInfo[2]);
            emp.setEmpId(Integer.parseInt(employeeInfo[0]));
            emp.setEmpName(employeeInfo[1]);
            emp.setEmpAge(Integer.parseInt(employeeInfo[2]));
            emp.setEmpSalary(Double.parseDouble(employeeInfo[3]));
            emp.setEmpDepartment(employeeInfo[4]);
            emp.setEmpDesignation(employeeInfo[5]);
            insertdata(emp);
        }
    }

    public static int insertdata(Employee emp) throws ClassNotFoundException, SQLException {
        Connection con = null;
        DbConnection conn = new DbConnection();
        Statement stat = null;
        ResultSet resSet=null;
        // Insertion with Statement
        System.out.println("id"+emp.getEmpId());
        System.out.println("Name"+emp.getEmpName());
        System.out.println("age"+emp.getEmpName());

        String sql = "INSERT into employeeinformation(EmployeeID,Name,Age,Salary,Designation,Department) VALUES(?,?,?,?,?,?)";
        Class.forName("com.mysql.cj.jdbc.Driver");
        con = DriverManager.getConnection("jdbc:mysql://localhost:3306/jdbctraining", "training", "training");
        conn.open();
        PreparedStatement preSt = conn.initStatement(sql);
        preSt.setInt(1, emp.getEmpId());
        preSt.setString(2, emp.getEmpName());
        preSt.setInt(3, emp.getEmpAge());
        preSt.setDouble(4, emp.getEmpSalary());
        preSt.setString(5, emp.getEmpDesignation());
        preSt.setString(6, emp.getEmpDepartment());
    int insertCount = preSt.executeUpdate();
        System.out.println("Employee inserted " + insertCount);
        return insertCount;
    }
    private static Employee getEmployee() {

        Scanner sc1 = new Scanner(System.in);
        Scanner sc2 = new Scanner(System.in);
        Scanner sc3 = new Scanner(System.in);
        int eAge;

        Employee employee = new Employee();

        System.out.println("Enter Employee Number: ");
        int eNo = sc1.nextInt();

        System.out.println("Enter Employee Name: ");
        String eName = sc2.nextLine();

        System.out.println("Enter Employee Age: ");
        eAge = sc1.nextInt();

            System.out.println("Enter Employee Salary: ");
            double eSalary = sc3.nextDouble();

            System.out.println("Enter Employee Department: ");
            String eDepartment = sc2.nextLine();

            System.out.println("Enter Employee Designation: ");
            String eDesignation = sc2.nextLine();

            employee.setEmpId(eNo);
            employee.setEmpName(eName);
            employee.setEmpAge(eAge);
            employee.setEmpSalary(eSalary);
            employee.setEmpDepartment(eDepartment);
            employee.setEmpDesignation(eDesignation);
            return employee;

    }
}


