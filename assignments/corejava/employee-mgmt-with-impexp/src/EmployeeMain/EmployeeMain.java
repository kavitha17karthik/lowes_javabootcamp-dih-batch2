
package EmployeeMain;
import Service.EmployeeServiceColImpl;
import Service.EmployeeService;
import Model.Employee;
import Util.InputUtil;

import java.util.List;
import java.util.Scanner;
import java.util.Set;
import java.util.concurrent.*;

abstract public class EmployeeMain implements Callable<Boolean>, EmployeeService {
    static Scanner scan;

    static {
        scan = new Scanner(System.in);
    }

    public EmployeeMain() {
    }

    public static void main(String[] args) throws ExecutionException, InterruptedException {
        boolean flag = false;

        EmployeeService empObject = new EmployeeServiceColImpl();

        ExecutorService executorService = Executors.newFixedThreadPool(2);

        do {
            System.out.println("Type 1 - Add Employee");
            System.out.println("Type 2 - Display All");
            System.out.println("Type 3 - Update Salary");
            System.out.println("Type 4 - Delete by ID");
            System.out.println("Type 5 - Import");
            System.out.println("Type 6 - Export");
            System.out.println("Type 7 - Exit");
            System.out.println("Enter Your Choice");
            Scanner sc = new Scanner(System.in);
            int choice = sc.nextInt();
            switch (choice) {
                case 1:
                    Employee emp = InputUtil.getEmployeeData();
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

                    Callable<Boolean> impThread = new Callable<Boolean>() {
                        @Override
                        public Boolean call() throws Exception {
                            System.out.println(Thread.currentThread()+"waiting for 3s");
                            //call importFileThread function here...
                            Thread.sleep(3000);
                            empObject.importFileThread( );
                            return true;
                        }
                    };
                   // System.out.println("creating and submitting thread");
                    Future<Boolean> impFuture = executorService.submit(impThread);
                    System.out.println("Array After Import : ");

                    System.out.println(Thread.currentThread().getName() + "Submitted..Invoked Import");
                    System.out.println(impFuture.get());
                    break;
                case 6:
                    Callable<Boolean> expThread = new Callable<Boolean>() {
                        @Override
                        public Boolean call() throws Exception {
                            System.out.println(Thread.currentThread()+"waiting for 3s");
                            //call importFileThread function here...
                            Thread.sleep(3000);
                            empObject.exportFileThread( );
                            return true;
                        }
                    };
                    System.out.println("creating and submitting thread");
                    Future<Boolean> expFuture = executorService.submit(expThread);
                    System.out.println(Thread.currentThread().getName() + "Submitted..Invoked Import");
                   // System.out.println(expFuture.get());

                    break;
                case 7:
                    executorService.shutdown();
                    System.exit(0);
                default:
                    flag = true;
            }
        } while(!flag);

    }
}


