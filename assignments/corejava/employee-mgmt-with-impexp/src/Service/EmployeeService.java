/*package Service;


import Model.Employee;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;

public interface EmployeeService {

   ArrayList<Employee> a1= new ArrayList<Employee>();

   public void importFileThread() throws IOException;

   public void exportFileThread() throws IOException;

}*/
package Service;
import Model.Employee;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;

        import java.util.ArrayList;
        import java.util.Collections;
        import java.util.Iterator;
        import java.util.LinkedList;
        import java.util.List;
        import java.util.concurrent.ConcurrentHashMap;
        import java.util.concurrent.CopyOnWriteArrayList;

        import java.util.*;
        import java.util.concurrent.ConcurrentHashMap;
        import java.util.concurrent.CopyOnWriteArrayList;
        import java.io.FileNotFoundException;
        import java.io.IOException;
        import java.util.ArrayList;

public interface EmployeeService {

    List<Employee> addEmployeeArrayList(Employee var1);

   List<Employee> readEmployeeArrayList();

   List<Employee> updateEmployeeArrayList(String var1, Integer var2);

   List<Employee> deleteEmployeeArrayList(String var1);

   public void importFileThread() throws IOException;

   public void exportFileThread() throws IOException;



}




