package com.labs.spring.boot.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.labs.spring.boot.exception.EmployeeNotFoundException;
import com.labs.spring.boot.model.Employee;
import com.labs.spring.boot.repository.EmployeeRepository;

@Service
public class EmployeeServiceImpl implements EmployeeService {

	@Autowired
	EmployeeRepository emprepo;

	Logger logger = LoggerFactory.getLogger(EmployeeServiceImpl.class);

	@Override
	public Employee create(Employee employee) {
		return emprepo.save(employee);
	}

	@Override
	public Employee update(int empId, Employee employee) {
		return emprepo.save(employee);
	}

	@Override
	public void delete(int empId) {
		emprepo.deleteById(empId);
		
	}

	@Override
	public List<Employee> showAll() throws Exception {
		return emprepo.findAll();
	}

	@Override
	public Employee get(int empId) throws EmployeeNotFoundException {
		
		return emprepo.findById(empId).orElseThrow(() -> new EmployeeNotFoundException("EmployeeID" + empId+" Not found in database"));
		 

		/*
		  Employee emp = emprepo.findById(empId);
		  
		  if(emp!=null) { logger.info("EmployeeServiceImpl(GetId) - Employee found  ");
		  return emp; } else {
		  logger.info("EmployeeServiceImpl(GetId) - Employee Not Found "); throw new
		  EmployeeNotFoundException("Employee with"+ empId
		  +"not found in the Database"); }
		 */
			
	}

}
