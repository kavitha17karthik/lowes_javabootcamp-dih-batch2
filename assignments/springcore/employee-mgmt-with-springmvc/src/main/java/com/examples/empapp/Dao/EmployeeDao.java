package com.examples.empapp.Dao;

import org.springframework.beans.factory.annotation.Autowired;
import javax.sql.DataSource;
import com.examples.empapp.model.Employee;
import java.sql.*;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

public class EmployeeDao {
    @Autowired
    DataSource datasource;
    Connection conn =null;
    Statement st = null;
    PreparedStatement pstmt = null;
    ResultSet rs = null;

    public EmployeeDao(DataSource datasource) {
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

    public boolean insert(Employee emp) {

        try
        {
            conn = datasource.getConnection();
            String sql = "INSERT into employeeinfo(name,age,gender,skills,contractor,designation,department,address,country) VALUES(?,?,?,?,?,?,?,?,?)";

            System.out.println("Connecting to database...");
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, emp.getName());
            pstmt.setInt(2, emp.getAge());
            pstmt.setString(3, emp.getGender());
            List<String> skills = emp.getSkills();
            String skillsList = skills.stream()
                    .collect(Collectors.joining(","));

            pstmt.setString(4, skillsList);

            pstmt.setString(5, String.valueOf(emp.isContractor()));


            pstmt.setString(6, emp.getDesignation());
            pstmt.setString(7, emp.getDepartment());
            pstmt.setString(8, emp.getAddress());
            pstmt.setString(9, emp.getCountry());

            int result = pstmt.executeUpdate();

        }catch(Exception e){
            e.printStackTrace();
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
        return false;
    }
    public boolean update(Employee emp) {
        try
        {
            conn = datasource.getConnection();

            String sql = "UPDATE employeeinfo SET id = ? , name = ? , age = ? , gender = ? , skills = ? ,contractor = ? , designation = ? , department = ? , address = ? , country = ?  WHERE id = ?";

            pstmt = conn.prepareStatement(sql);

            pstmt.setString(1, emp.getId());
            pstmt.setString(2, emp.getName());
            pstmt.setInt(3, emp.getAge());
            pstmt.setString(4, emp.getGender());
            List<String> skills = emp.getSkills();
            String skillsList = skills.stream()
                    .collect(Collectors.joining(","));

            pstmt.setString(5, skillsList);
            pstmt.setString(6, String.valueOf(emp.isContractor()));

            pstmt.setString(7, emp.getDesignation());
            pstmt.setString(8, emp.getDepartment());
            pstmt.setString(9, emp.getAddress());
            pstmt.setString(10, emp.getCountry());
            pstmt.setString(11, emp.getId());

            System.out.println(emp.getId());
            System.out.println(emp.getName());
            System.out.println(emp.getAge());
            System.out.println(emp.getGender());
            System.out.println(emp.getDesignation());
            System.out.println(emp.getDepartment());
            System.out.println(emp.getAddress());
            System.out.println(emp.getCountry());


            int result = pstmt.executeUpdate();

            System.out.println("Update:UpdateEmployee"+result);
            if (result > 0) {
                System.out.println("update successful");
            }
        }catch(Exception e)
        {
            e.printStackTrace();
        }finally{
            try
            {
                pstmt.close();
                closeConnection(conn);
            }catch(SQLException e){
                e.printStackTrace();
            }
        }
        return false;
    }


    public boolean delete(String empId) {
        try {
            conn = datasource.getConnection();
            String sql = "delete from employeeinfo WHERE id=?";
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, empId);
            int result = pstmt.executeUpdate();
            if (result > 0) {
                System.out.println("delete successful");
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                pstmt.close();
                closeConnection(conn);
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        return true;
    }

    //DATE
    public List<Employee> showAll(){
        List<Employee> empList = new ArrayList<>();
        try
        {
            conn = datasource.getConnection();
            st = conn.createStatement();
            String sql = "SELECT * FROM employeeinfo";
            ResultSet rs = st.executeQuery(sql);

            while(rs.next()) {
                Employee emp = new Employee();
                emp.setId(rs.getString("id"));
                emp.setName(rs.getString("name"));
                emp.setAge(rs.getInt("age"));
                emp.setGender(rs.getString("gender"));
                emp.setSkills(Collections.singletonList(rs.getString("skills")));
                emp.setContractor(rs.getBoolean("contractor"));
                emp.setDesignation(rs.getString("designation"));
                emp.setDepartment(rs.getString("department"));
                emp.setAddress(rs.getString("address"));
                emp.setCountry(rs.getString("country"));
                empList.add(emp);

            }
        }catch(SQLException e) {
            e.printStackTrace();
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
            }
        }
        return empList;
    }

    public Employee get(String empId) {
        Employee emp = null;
        try {
            conn = datasource.getConnection();
            String query = "SELECT * FROM employeeinfo WHERE id = ? ";
            pstmt = conn.prepareStatement(query);
            pstmt.setString(1, empId);

            rs = pstmt.executeQuery();
            System.out.println("Query executed Successfully: " + query);
            while (rs.next()) {
                emp = new Employee();
                emp.setId(rs.getString("id"));
                emp.setName(rs.getString("name"));
                emp.setAge(rs.getInt("age"));
                emp.setGender(rs.getString("gender"));
                emp.setSkills(Collections.singletonList(rs.getString("skills")));
                emp.setContractor(rs.getBoolean("contractor"));
                emp.setDesignation(rs.getString("designation"));
                emp.setDepartment(rs.getString("department"));
                emp.setAddress(rs.getString("address"));
                emp.setCountry(rs.getString("country"));
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                rs.close();
                pstmt.close();
                closeConnection(conn);
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        return emp;
    }
}
