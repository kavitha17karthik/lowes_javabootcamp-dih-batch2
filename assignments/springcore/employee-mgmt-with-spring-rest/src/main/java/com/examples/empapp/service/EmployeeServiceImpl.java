package com.examples.empapp.service;


import com.mysql.cj.util.StringUtils;
import java.util.ArrayList;
import java.util.List;
import java.util.function.Predicate;

import com.examples.empapp.Dao.EmployeeDaoImpl;
import com.examples.empapp.model.Employee;
import com.examples.empapp.exception.EmployeeCheckValidationException;
import com.examples.empapp.exception.EmployeeNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    public EmployeeDaoImpl employeeDao;

    @Override
    public Employee create(Employee employee) {
        return employeeDao.create(checkEmployeeData(employee));
    }

    @Override
    public Employee update(Employee employee) throws EmployeeNotFoundException {
        Employee update=null;
        Employee found = employeeDao.get(employee.getId());
        if ((found != null) || (found.getId() == employee.getId())) {
            update = employeeDao.update(employee);

        } else {
            // employees.put(employee.getId(), employee);
            throw new EmployeeNotFoundException("Employee with id: " + employee.getId() + " not found.");
        }
        return update;
    }

    @Override
    public int delete(int empId)  {
        Employee found = employeeDao.get(empId);
        if (found != null) {
            employeeDao.delete(empId);
        }
        else {
            throw new EmployeeNotFoundException("Employee with id: " + empId + " not found.");
        }
        return 0;
    }

    @Override
    public List<Employee> showAll() {
        return new ArrayList<>(employeeDao.showAll());
    }

    @Override
    public Employee get(int empId) {
        return employeeDao.get(empId);
    }
    public Employee checkEmployeeData(Employee employee)
    {
        List<String> errors = new ArrayList<>();
        if(StringUtils.isNullOrEmpty(employee.getName())) {
            System.out.println("Name field cannot be empty/null");
            errors.add("Name field cannot be empty/null");
        }
        if (employee.getAge() <= 0 || StringUtils.isNullOrEmpty(String.valueOf(employee.getAge()))) {
            errors.add("Age should not be Null/Empty");
        }

        // validate age
        if (!validate(employee, (emp) -> emp.getAge() >= 21 && emp.getAge() <= 60)) {
            errors.add("Enter age > 20 and < 60 : ");
        }

        if (StringUtils.isNullOrEmpty(employee.getDesignation())) {
            errors.add("Designation should not be empty/null");
        }
        if (StringUtils.isNullOrEmpty(employee.getDepartment())) {
            errors.add("Department should not be empty/null");
        }
        if (StringUtils.isNullOrEmpty(employee.getCountry())) {
            errors.add("Country should not be empty/null");
        }

        if (!errors.isEmpty()) {
            throw new EmployeeCheckValidationException(errors);
        }
        return employee;
    }

    public boolean validate(Employee emp, Predicate<Employee> condition) {
        return condition.test(emp);
    }
}



