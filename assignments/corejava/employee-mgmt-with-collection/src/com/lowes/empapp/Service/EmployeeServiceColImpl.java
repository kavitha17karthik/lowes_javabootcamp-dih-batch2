package com.lowes.empapp.Service;

import com.lowes.empapp.Model.Employee;

import java.net.SocketOption;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArrayList;

public class EmployeeServiceColImpl implements com.lowes.empapp.Service.EmployeeService {
    List<Employee> arrayList = new CopyOnWriteArrayList();
    List<Employee> linkedList = new LinkedList();
    Set<Employee> hashSet = new HashSet();
    Set<Employee> linkedHashSet = new LinkedHashSet();
    Set<Employee> treeSet = new TreeSet();

    static int i = 0;
    static int j = 0;
    static int k = 0;

    public EmployeeServiceColImpl() {
    }

    public List<Employee> addEmployeeArrayList(Employee employee) {
        this.arrayList.add(employee);
        return this.arrayList;
    }

    public List<Employee> readEmployeeArrayList() {
        Collections.sort(this.arrayList);
        return this.arrayList;
    }

    public List<Employee> updateEmployeeArrayList(String empId, Integer salary) {
        Iterator var4 = this.arrayList.iterator();

        while(var4.hasNext()) {
            Employee emp = (Employee)var4.next();
            if (emp.getEmpId().equals(empId)) {
                Employee newTempEmp = new Employee();
                int position = this.arrayList.indexOf(emp);
                newTempEmp.setEmpId(empId);
                newTempEmp.setEmployeeName(emp.getEmployeeName());
                newTempEmp.setSalary(salary);
                newTempEmp.setDesignation(emp.getDesignation());
                this.arrayList.set(position, newTempEmp);
            }
            else{
                System.out.println("ArrayList is Empty..");

            }
        }

        return this.arrayList;
    }

    public List<Employee> deleteEmployeeArrayList(String empId) {
        List<Employee> linkedList1 = new LinkedList();
        Iterator var4 = this.arrayList.iterator();

        while(var4.hasNext()) {
            Employee emp = (Employee)var4.next();
            if (!emp.getEmpId().equals(empId)) {
                linkedList1.add(emp);
            }
        }
        ArrayList<Employee> arrayList2 = new ArrayList(linkedList1);
        return arrayList2;
    }

    public List<Employee> addEmployeeLinkedList(Employee employee) {
        this.linkedList.add(employee);
        return this.linkedList;
    }
    public List<Employee> readEmployeeLinkedList() {
        Collections.sort(this.linkedList);
        return this.linkedList;
    }

    public List<Employee> updateEmployeeLinkedList(String empId, Integer salary) {
        Iterator var4 = this.linkedList.iterator();

        while(var4.hasNext()) {
            Employee emp = (Employee)var4.next();
            if (emp.getEmpId().equals(empId)) {
                Employee newTempEmp = new Employee();
                int position = this.linkedList.indexOf(emp);
                System.out.println("UpdateEmployeeLinkedList"+ position);
                newTempEmp.setEmpId(empId);
                newTempEmp.setEmployeeName(emp.getEmployeeName());
                newTempEmp.setSalary(salary);
                newTempEmp.setDesignation(emp.getDesignation());
                System.out.println("Inserted at"+ position);
                this.linkedList.set(position, newTempEmp);
            }
            else {
                System.out.println("Employee ID "+ empId +" is not a Employee of this Organization");
            }
        }
        return this.linkedList;
    }

    public List<Employee> deleteEmployeeLinkedList(String empId) {
        Iterator var3 = this.linkedList.iterator();

        while(var3.hasNext()) {
            Employee emp = (Employee)var3.next();
            if (emp.getEmpId().equals(empId)) {
                int position = this.linkedList.indexOf(emp);
                this.linkedList.remove(position);
            }
        }
        return this.linkedList;
    }

    public Set<Employee> addEmployeeHashSet(Employee employee) {
        this.hashSet.add(employee);
        return this.hashSet;
    }

    public Set<Employee> readEmployeeHashSet() {
         return this.hashSet;
    }

    public Set<Employee> updateEmployeeHashSet(String empId, Integer salary) {
        LinkedList<Employee> linked = new LinkedList(this.hashSet);
       Iterator var5 = linked.iterator();
        //Iterator var5 = this.hashSet.iterator();

        while(var5.hasNext()) {
            Employee emp = (Employee)var5.next();
            if (emp.getEmpId().equals(empId)) {
                Employee newTempEmp = new Employee();
                int position = linked.indexOf(emp);
                newTempEmp.setEmpId(empId);
                newTempEmp.setEmployeeName(emp.getEmployeeName());
                newTempEmp.setSalary(salary);
                newTempEmp.setDesignation(emp.getDesignation());
                linked.set(position, newTempEmp);
            }
            else {
                System.out.println("Employee ID "+ empId +" is not a Employee of this Organization");
            }
        }

        this.hashSet = new HashSet(linked);
        return this.hashSet;
    }

    public Set<Employee> deleteEmployeeHashSet(String empId) {
        LinkedList<Employee> linked1 = new LinkedList(this.hashSet);
        Iterator var4 = linked1.iterator();

        while(var4.hasNext()) {
            Employee emp = (Employee)var4.next();
            if (emp.getEmpId().equals(empId)) {
                int position = linked1.indexOf(emp);
                linked1.remove(position);
            }
        }
        this.hashSet = new HashSet(linked1);
        return this.hashSet;
    }

    public Set<Employee> addEmployeeLinkedHashSet(Employee employee) {
        this.linkedHashSet.add(employee);
        return this.linkedHashSet;
    }

    public Set<Employee> readEmployeeLinkedHashSet() {

        return this.linkedHashSet;
    }

    public Set<Employee> updateEmployeeLinkedHashSet(String empId, Integer salary) {
        List<Employee> linked = new LinkedList(this.linkedHashSet);
        Iterator var5 = linked.iterator();

        while(var5.hasNext()) {
            Employee emp = (Employee)var5.next();
            if (emp.getEmpId().equals(empId)) {
                Employee newTempEmp = new Employee();
                int position = linked.indexOf(emp);
                newTempEmp.setEmpId(empId);
                newTempEmp.setEmployeeName(emp.getEmployeeName());
                newTempEmp.setSalary(salary);
                newTempEmp.setDesignation(emp.getDesignation());
                linked.set(position, newTempEmp);
            }
            else
            {
                System.out.println("Employee ID "+ empId +" is not a Employee of this Organization");
            }
        }
        this.linkedHashSet = new LinkedHashSet(linked);
        return this.linkedHashSet;
    }

    public Set<Employee> deleteEmployeeLinkedHashSet(String empId) {
        List<Employee> linked = new LinkedList(this.linkedHashSet);
        List<Employee> arrlinked = new ArrayList();
        Iterator var5 = linked.iterator();

        while(var5.hasNext()) {
            Employee emp = (Employee)var5.next();
            if (!emp.getEmpId().equals(empId)) {
                arrlinked.add(emp);
            }
        }
        this.linkedHashSet = new LinkedHashSet(arrlinked);
        return this.linkedHashSet;
    }

    public Set<Employee> addEmployeeTreeSet(Employee employee) {
        this.treeSet.add(employee);
        return this.treeSet;
    }

    public Set<Employee> readEmployeeTreeSet() {
        return this.treeSet;
    }

    public Set<Employee> updateEmployeeTreeSet(String empId, Integer salary) {
        List<Employee> linked = new LinkedList(this.treeSet);
        Iterator var5 = linked.iterator();

        while(var5.hasNext()) {
            Employee emp = (Employee)var5.next();
            if (emp.getEmpId().equals(empId)) {
                Employee newTempEmp = new Employee();
                int position = linked.indexOf(emp);
                newTempEmp.setEmpId(empId);
                newTempEmp.setEmployeeName(emp.getEmployeeName());
                newTempEmp.setSalary(salary);
                newTempEmp.setDesignation(emp.getDesignation());
                linked.set(position, newTempEmp);
            }
            else {
                System.out.println("Employee ID "+ empId +" is not a Employee of this Organization");
            }
        }

        this.treeSet = new TreeSet(linked);
        return this.treeSet;
    }

    public Set<Employee> deleteEmployeeTreeSet(String empId) {
        List<Employee> linked = new LinkedList(this.treeSet);
        List<Employee> linked1 = new LinkedList();
        Iterator var5 = linked.iterator();

        while(var5.hasNext()) {
            Employee emp = (Employee)var5.next();
            if (!emp.getEmpId().equals(empId)) {
                linked1.add(emp);
            }
        }
        this.treeSet = new TreeSet(linked1);
        return this.treeSet;
    }

}


