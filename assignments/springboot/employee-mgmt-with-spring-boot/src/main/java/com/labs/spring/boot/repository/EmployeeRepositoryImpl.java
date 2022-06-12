package com.labs.spring.boot.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.labs.spring.boot.model.Employee;

public interface EmployeeRepositoryImpl extends JpaRepository<Employee, Integer>{

}
