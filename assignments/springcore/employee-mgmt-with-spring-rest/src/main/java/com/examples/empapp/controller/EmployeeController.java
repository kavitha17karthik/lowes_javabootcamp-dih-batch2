package com.examples.empapp.controller;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.logging.Logger;

import com.examples.empapp.response.ResponseMessage;
import com.examples.empapp.service.EmployeeService;
import com.examples.empapp.model.Employee;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;


/**
 * Employee management.
 */

@RestController
@RequestMapping("/employee")
public class EmployeeController {

	//Logger logger = (Logger) LoggerFactory.getLogger(EmployeeController.class);

	@Autowired
	public EmployeeService service;

	//Create Employee
	@PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE},
			produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE})
	public ResponseEntity<ResponseMessage> create(@RequestBody Employee emp) throws URISyntaxException {
		Employee empCreate= service.create(emp);
		URI location = ServletUriComponentsBuilder.fromCurrentRequest().build().toUri();
		ResponseMessage response = new ResponseMessage("Success","Employee record Created");
		return ResponseEntity.created(location).body(response);
	}

	// Get employee
	@GetMapping(path = "/{empId}", produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE})
	public Employee get(@PathVariable int empId) {
		return service.get(empId);
	}


	//SHOW ALL EMPLOYEE DETAILS
	@GetMapping(produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE})
	public List<Employee> showAll() throws Exception {
		return service.showAll();
	}

	@RequestMapping(method = RequestMethod.PUT, path = "/{id}", produces = {MediaType.APPLICATION_JSON_VALUE,MediaType.APPLICATION_JSON_VALUE})
	public ResponseEntity<ResponseMessage> update(@PathVariable("id") int empId, @RequestBody Employee emp) throws Exception {
		emp.setId(empId);
		Employee updateEmp = service.update(emp);
		URI location = ServletUriComponentsBuilder.fromCurrentRequest().build().toUri();
		ResponseMessage response = new ResponseMessage("Success", "Employee updated successfully");
		return ResponseEntity.created(location).body(response);
	}

	@RequestMapping(method = RequestMethod.DELETE, path = "/{id}",produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE})
	public ResponseEntity<ResponseMessage> delete(@PathVariable("id") int empId)  {
		service.delete(empId);
		ResponseMessage response = new ResponseMessage("Success", "Employee deleted successfully");
		return ResponseEntity.ok().body(response);
	}

}
