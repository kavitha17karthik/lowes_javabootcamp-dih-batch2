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

    List<Employee> updateEmployeeArrayList(String var1, Integer var2);

    List<Employee> deleteEmployeeArrayList(String var1);
/*

    List<Employee> addEmployeeLinkedList(Employee var1);

    List<Employee> readEmployeeLinkedList();

    List<Employee> updateEmployeeLinkedList(String var1, Integer var2);

    List<Employee> deleteEmployeeLinkedList(String var1);

    Set<Employee> addEmployeeHashSet(Employee var1);

    Set<Employee> readEmployeeHashSet();

    Set<Employee> updateEmployeeHashSet(String var1, Integer var2);

    Set<Employee> deleteEmployeeHashSet(String var1);

    Set<Employee> addEmployeeLinkedHashSet(Employee var1);

    Set<Employee> readEmployeeLinkedHashSet();

    Set<Employee> updateEmployeeLinkedHashSet(String var1, Integer var2);

    Set<Employee> deleteEmployeeLinkedHashSet(String var1);

    Set<Employee> addEmployeeTreeSet(Employee var1);

    Set<Employee> readEmployeeTreeSet();

    Set<Employee> updateEmployeeTreeSet(String var1, Integer var2);

    Set<Employee> deleteEmployeeTreeSet(String var1);
*/


}



