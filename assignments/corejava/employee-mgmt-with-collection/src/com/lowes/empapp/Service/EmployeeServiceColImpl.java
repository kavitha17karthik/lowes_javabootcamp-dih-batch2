package com.lowes.empapp.Service;

import com.lowes.empapp.Model.Employee;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArrayList;

public class EmployeeServiceColImpl implements com.lowes.empapp.Service.EmployeeService {
    List<Employee> arrayList = new CopyOnWriteArrayList();
    List<Employee> linkedList = new LinkedList();

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

    public List<Employee> updateEmployeeArrayList(String mId, float salary) {
        Iterator var4 = this.arrayList.iterator();

        while(var4.hasNext()) {
            Employee emp = (Employee)var4.next();
            if (emp.getmId().equals(mId)) {
                Employee newTempEmp = new Employee();
                int position = this.arrayList.indexOf(emp);
                newTempEmp.setmId(mId);
                newTempEmp.setEmployeeName(emp.getEmployeeName());
                newTempEmp.setSalary(emp.getSalary());
                newTempEmp.setDesignation(emp.getDesignation());
                this.arrayList.set(position, newTempEmp);
            }
        }

        return this.arrayList;
    }

    public List<Employee> deleteEmployeeArrayList(String mId) {
        List<Employee> linkedList1 = new LinkedList();
        Iterator var4 = this.arrayList.iterator();

        while(var4.hasNext()) {
            Employee emp = (Employee)var4.next();
            if (!emp.getmId().equals(mId)) {
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

    public List<Employee> updateEmployeeLinkedList(String mId, float salary) {
        Iterator var4 = this.linkedList.iterator();

        while(var4.hasNext()) {
            Employee emp = (Employee)var4.next();
            if (emp.getmId().equals(mId)) {
                Employee newTempEmp = new Employee();
                int position = this.linkedList.indexOf(emp);
                System.out.println("updateEmployeeLinkedList"+ position);
                newTempEmp.setmId(mId);
                newTempEmp.setEmployeeName(emp.getEmployeeName());
                newTempEmp.setSalary(salary);
                newTempEmp.setDesignation(emp.getDesignation());
                System.out.println("Inserted at"+ position);
                this.linkedList.set(position, newTempEmp);
            }
        }
        return this.linkedList;
    }

    public List<Employee> deleteEmployeeLinkedList(String mId) {
        Iterator var3 = this.linkedList.iterator();

        while(var3.hasNext()) {
            Employee emp = (Employee)var3.next();
            if (emp.getmId().equals(mId)) {
                int position = this.linkedList.indexOf(emp);
                this.linkedList.remove(position);
            }
        }
        return this.linkedList;
    }

}


