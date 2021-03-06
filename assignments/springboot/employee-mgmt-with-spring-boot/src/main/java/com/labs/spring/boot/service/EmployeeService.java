package com.labs.spring.boot.service;

import java.util.List;

import java.util.NoSuchElementException;

import org.hibernate.exception.JDBCConnectionException;

import com.labs.spring.boot.exception.CannotCreateTransactionException;
import com.labs.spring.boot.exception.EmployeeNotFoundException;
import com.labs.spring.boot.model.Employee;

public interface EmployeeService {

    public Employee create(Employee emp) throws CannotCreateTransactionException;
    public Employee update(int empId,Employee var1) throws Exception;
    public Employee get(int id) throws EmployeeNotFoundException;
    public void delete(int var1);
    public  List<Employee> showAll() throws Exception;

}
