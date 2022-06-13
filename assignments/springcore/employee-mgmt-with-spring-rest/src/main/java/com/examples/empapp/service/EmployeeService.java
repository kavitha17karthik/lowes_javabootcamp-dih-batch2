package com.examples.empapp.service;
import com.examples.empapp.exception.EmployeeNotFoundException;
import com.examples.empapp.model.Employee;
import java.util.List;

public interface EmployeeService {
   // public Employee insert(Employee var1) throws Exception;

    public Employee create(Employee emp);
    public Employee update(Employee var1) ;
    public int delete(int var1);
    public  List<Employee> showAll() ;
    public Employee get(int empId) throws EmployeeNotFoundException;
}
