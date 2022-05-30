package Service;

import java.io.File;
import java.io.FileNotFoundException;
import java.sql.*;
import java.util.*;
//package com.leapfrog.Project3.dao.impl;

import Dao.EmployeeDao;
import Model.Employee;
import Util.DbConnection;

import javax.sql.rowset.RowSetFactory;
import javax.sql.rowset.RowSetProvider;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
//first
public class EmployeeDAOImpl implements EmployeeDao{
    private DbConnection conn = new DbConnection();

    public EmployeeDAOImpl() {
    }
//insertdata code here

    public int insert(Employee emp) throws ClassNotFoundException, SQLException {
        System.out.println("Connecting to database...");

        String sql = "INSERT into employeeinformation(EmployeeID,Name,Age,Salary,Designation,Department) VALUES(?,?,?,?,?,?)";
        Class.forName("com.mysql.cj.jdbc.Driver");
        this.conn.open();
        PreparedStatement stmt = this.conn.initStatement(sql);

        stmt.setInt(1, emp.getEmpId());
        stmt.setString(2, emp.getEmpName());
        stmt.setInt(3, emp.getEmpAge());
        stmt.setDouble(4, emp.getEmpSalary());
        stmt.setString(5, emp.getEmpDesignation());
        stmt.setString(6, emp.getEmpDepartment());
        int result = this.conn.executeUpdate();

        return result;
    }


    public void updateEmployeeDesignationById(String newDesignation, Integer employeeId) throws ClassNotFoundException, SQLException {

        String sql = "UPDATE employeeinformation set Designation=? WHERE EmployeeID=?;";
        Class.forName("com.mysql.cj.jdbc.Driver");
        this.conn.open();
        PreparedStatement stmt = this.conn.initStatement(sql);
        System.out.println("Update statement...");

        stmt.setString(1, newDesignation);
        stmt.setInt(2,employeeId);

        System.out.println("execute update");
        int result = this.conn.executeUpdate();

    }
    public int update(Employee emp) throws ClassNotFoundException, SQLException {
        String sql = "UPDATE employeeinformation set first_name=?,last_name=?,email=? WHERE id=?";
        Class.forName("com.mysql.cj.jdbc.Driver");
        this.conn.open();
        PreparedStatement stmt = this.conn.initStatement(sql);
        stmt.setInt(1, emp.getEmpId());
        stmt.setString(2, emp.getEmpName());
        stmt.setInt(3, emp.getEmpAge());
        stmt.setDouble(4, emp.getEmpSalary());
        stmt.setString(5, emp.getEmpDesignation());
        stmt.setString(6, emp.getEmpDepartment());
        int result = stmt.executeUpdate();
        if (result > 0) {
            System.out.println("update successful");
        }

      //  this.conn.close();
        return result;
    }
  /*  public int update(Employee emp) throws ClassNotFoundException, SQLException {
        String sql = "UPDATE employeeinfo set first_name=?,last_name=?,email=? WHERE id=?";
        Class.forName("com.mysql.cj.jdbc.Driver");
        this.conn.open();
        PreparedStatement stmt = this.conn.initStatement(sql);
        stmt.setString(1, emp.getfName());
        stmt.setString(2, emp.getlName());
        stmt.setString(3, emp.getEmail());
        stmt.setInt(4, emp.getId());
        int result = stmt.executeUpdate();
        if (result > 0) {
            System.out.println("update successful");
        }

        this.conn.close();
        return result;
    }*/

    public int delete(int id) throws ClassNotFoundException, SQLException {
        String sql = "DELETE FROM employeeinformation WHERE EmployeeID=?";
        Class.forName("com.mysql.cj.jdbc.Driver");
        this.conn.open();
        PreparedStatement stmt = this.conn.initStatement(sql);
        stmt.setInt(1, id);
        int result = stmt.executeUpdate();
        if (result > 0) {
            System.out.println("delete successful");
        }
        return result;
    }

    public List<Employee> showAll() throws ClassNotFoundException, SQLException {
        List<Employee> empList = new ArrayList();
        String sql = "SELECT * FROM employeeinformation";
        Class.forName("com.mysql.cj.jdbc.Driver");
        this.conn.open();
        this.conn.initStatement(sql);
        ResultSet rs = this.conn.executeQuery();

        while(rs.next()) {
            new Employee();
            Employee emp = new Employee();
            emp.setEmpId(rs.getInt("EmployeeID"));
            emp.setEmpName((rs.getString("Name")));
            emp.setEmpAge(rs.getInt("Age"));
            emp.setEmpSalary(rs.getDouble("Salary"));
            emp.setEmpDesignation(rs.getString("Designation"));
            emp.setEmpDepartment(rs.getString("Department"));
            empList.add(emp);
        }
        return empList;
    }

  }
