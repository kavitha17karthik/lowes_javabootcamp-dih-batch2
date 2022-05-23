package com.lowes.empapp.Service;
import com.lowes.empapp.Model.Employee;
import com.lowes.empapp.Service.EmployeeService;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeMap;
import java.util.TreeSet;
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



