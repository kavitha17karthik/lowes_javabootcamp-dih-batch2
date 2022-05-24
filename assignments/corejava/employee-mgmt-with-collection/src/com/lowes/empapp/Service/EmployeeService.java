package com.lowes.empapp.Service;
import com.lowes.empapp.Model.Employee;
import com.lowes.empapp.Service.EmployeeService;
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

public interface EmployeeService {
    List<Employee> addEmployeeArrayList(Employee var1);

    List<Employee> readEmployeeArrayList();

    List<Employee> updateEmployeeArrayList(String var1, float var2);

    List<Employee> deleteEmployeeArrayList(String var1);

    List<Employee> addEmployeeLinkedList(Employee var1);

    List<Employee> readEmployeeLinkedList();

    List<Employee> updateEmployeeLinkedList(String var1, float var2);

    List<Employee> deleteEmployeeLinkedList(String var1);


}



