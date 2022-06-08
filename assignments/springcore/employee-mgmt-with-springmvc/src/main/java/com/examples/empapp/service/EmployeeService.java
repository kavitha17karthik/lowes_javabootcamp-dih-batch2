package com.examples.empapp.service;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import com.examples.empapp.Dao.EmployeeDao;
import com.examples.empapp.model.Employee;
import org.springframework.beans.factory.annotation.Autowired;

public class EmployeeService {
	@Autowired
	public EmployeeDao employeeDao;
	private static Map<String, Employee> employees = new LinkedHashMap<String, Employee>();

	public void add(Employee employee)   {

		employee.setId(UUID.randomUUID().toString());
		employees.put(employee.getId(), employee);
		employeeDao.insert(employee);
	}
	
	public void update(Employee employee)   {
		
		employees.put(employee.getId(), employee);
		employeeDao.update(employee);
	}
	
	public Employee get(String empId)   {
		return employeeDao.get(empId);
	}

	public void delete(String empId)   {
		employeeDao.delete(empId);
	}

	public List<Employee> list()
	{
		return new ArrayList<>(employeeDao.showAll());
	}

}
