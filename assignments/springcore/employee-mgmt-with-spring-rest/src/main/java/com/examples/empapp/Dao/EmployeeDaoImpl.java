package com.examples.empapp.Dao;

import com.examples.empapp.exception.DatabaseConnectionException;
import com.examples.empapp.exception.EmployeeNotFoundException;
import com.examples.empapp.model.Employee;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.*;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;


@Repository
public class EmployeeDaoImpl implements EmployeeDao{

   Logger logger = LoggerFactory.getLogger(EmployeeDaoImpl.class);

    @Autowired
    DataSource datasource;
    Connection conn =null;
    Statement st = null;
    PreparedStatement pstmt = null;
    ResultSet rs = null;

    public void EmployeeDao(DataSource datasource) {
        this.datasource = datasource;
    }

    public void closeConnection(Connection connection) {
        if (connection != null) {
            try {
                connection.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }

   @Override
    public Employee create(Employee emp) {
        try
        {
            conn = datasource.getConnection();
            String sql = "INSERT into employee(name,age,designation,department,country) VALUES(?,?,?,?,?)";

            System.out.println("Connecting to database...");
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, emp.getName());
            pstmt.setInt(2, emp.getAge());
            pstmt.setString(3, emp.getDesignation());
            pstmt.setString(4, emp.getDepartment());
            pstmt.setString(5, emp.getCountry());
            int result = pstmt.executeUpdate();

        }catch(SQLException e){
            logger.error("Create Employee - Error : ",e);
            e.printStackTrace();
            throw new DatabaseConnectionException("Database Error, Check Database Connection",e);
        } finally
        {
            try
            {
                pstmt.close();
                closeConnection(conn);
            }catch(SQLException e){
                e.printStackTrace();
            }
        }
        return emp;
    }

    @Override
    public Employee update(Employee employee) {
        int result = 0;
        try
        {
            conn = datasource.getConnection();

            String sql = "UPDATE employee SET id = ? , name = ? , age = ? ,  designation = ? , department = ?, country = ?  WHERE id = ?";

            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, employee.getId());
            pstmt.setString(2, employee.getName());
            pstmt.setInt(3, employee.getAge());
            pstmt.setString(4, employee.getDesignation());
            pstmt.setString(5, employee.getDepartment());
            pstmt.setString(6, employee.getCountry());
            pstmt.setInt(7, employee.getId());
            result = pstmt.executeUpdate();

            if (result > 0) {
                logger.info("Employee - Updated successful");
            }else {
                throw new EmployeeNotFoundException("Employee Not Found in the Database");
            }
        }catch(SQLException e)
        {
            logger.error("Employee - Update: Error",e);
            e.printStackTrace();
            throw new DatabaseConnectionException("Database Error, Check Database Connection",e);
        }finally{
            try
            {
                pstmt.close();
                closeConnection(conn);
            }catch(SQLException e){
                e.printStackTrace();
                logger.error("Employee - Update: Error",e);
            }
        }
        return employee;
    }

    @Override
    public int delete(int empId) {
        try {
            conn = datasource.getConnection();
            String sql = "delete from employee WHERE id=?";
            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, empId);
            int result = pstmt.executeUpdate();
            if (result > 0) {
                logger.info("delete successful");
            } else {
                throw new EmployeeNotFoundException("Employee Not Found in the Database");
            }
        } catch (SQLException e) {
            logger.error("Logging SQLException ", e);
            throw new DatabaseConnectionException("Database Error, Check Database Connection", e);
        }  finally {
            try {
                pstmt.close();
                closeConnection(conn);
            } catch (SQLException e) {
                e.printStackTrace();
                logger.error("Error:delete Employee",e);
            }
        }
        return 0;
    }
    //DATE
    @Override
    public List<Employee> showAll(){
        List<Employee> empList = new ArrayList<>();
        try
        {
            conn = datasource.getConnection();
            st = conn.createStatement();
            String sql = "SELECT * FROM employee";
            ResultSet rs = st.executeQuery(sql);

            while(rs.next()) {
                Employee emp = new Employee();
                emp.setId(rs.getInt("id"));
                emp.setName(rs.getString("name"));
                emp.setAge(rs.getInt("age"));
                emp.setDesignation(rs.getString("designation"));
                emp.setDepartment(rs.getString("department"));
                emp.setCountry(rs.getString("country"));
                empList.add(emp);
            }
            if (empList.isEmpty()) {
                throw new EmployeeNotFoundException("Employee Not Found in the Database");
            }
        }catch(SQLException e) {
            e.printStackTrace();
            logger.error("Logging SQLException ", e);
            throw new DatabaseConnectionException("Database Error, Check Database Connection", e);
        }finally{
            try{
                if (rs != null) {
                    rs.close();
                }
                if(st!=null){
                    st.close();
                }
                closeConnection(conn);
            }catch(SQLException e){
                e.printStackTrace();
                logger.error("Error:ShowAll Employee",e);
            }
        }
        return empList;
    }
    @Override
    public Employee get(int empId) throws EmployeeNotFoundException {
        Employee emp = null;
        try {
            conn = datasource.getConnection();
            String query = "SELECT * FROM employee WHERE id = ? ";
            pstmt = conn.prepareStatement(query);
            pstmt.setInt(1, empId);

            rs = pstmt.executeQuery();

            while (rs.next()) {
                emp = new Employee();
                emp.setId(rs.getInt("id"));
                emp.setName(rs.getString("name"));
                emp.setAge(rs.getInt("age"));
                emp.setDesignation(rs.getString("designation"));
                emp.setDepartment(rs.getString("department"));
                emp.setCountry(rs.getString("country"));
            }
            if (emp == null) {
                throw new EmployeeNotFoundException("Employee Not Found in the Database");
            }
        } catch (SQLException e) {
            logger.error("Error:Get Employee",e);
            e.printStackTrace();
            throw new DatabaseConnectionException("Database Error, Check Database Connection", e);
        } finally {
            try {
                rs.close();
                pstmt.close();
                closeConnection(conn);
            } catch (SQLException e) {
                e.printStackTrace();
                logger.error("Error:Get Employee",e);
            }
        }
        return emp;
    }
}
