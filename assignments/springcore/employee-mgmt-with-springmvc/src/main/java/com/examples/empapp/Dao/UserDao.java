package com.examples.empapp.Dao;
import com.examples.empapp.model.User;
import com.mysql.cj.jdbc.MysqlDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import javax.sql.DataSource;
import java.sql.*;

public class UserDao extends MysqlDataSource {
    @Autowired
    DataSource datasource;
    Connection conn = null;
    PreparedStatement pstmt = null;
    ResultSet rs = null;

    public UserDao(DataSource datasource) {
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

    public boolean registerUser(User user) {
        try {
            System.out.println("Inside registerUser");
            conn = datasource.getConnection();
            System.out.println("conn resurn" + conn);
            String sql = "INSERT INTO new_usertable(name, username, password, email) " +
                    "VALUES (?,?,?,?)";

            System.out.println("Prepared sql - registerUser");
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, user.getName());
            pstmt.setString(2, user.getusername());
            pstmt.setString(3, user.getPassword());
            pstmt.setString(4, user.getEmail());
            System.out.println("setString registerUser");
            int rowsInserted = pstmt.executeUpdate();
            System.out.println("Execute registerUser");
            return rowsInserted > 0;
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            try {
                pstmt.close();
                closeConnection(conn);
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        return false;
    }

    public boolean authenticateRegisterUser(User user)  {
        try {
            conn = datasource.getConnection();
            String query = "SELECT username,password FROM new_usertable WHERE username = ? and  password = ? ";
            pstmt = conn.prepareStatement(query);
            pstmt.setString(1, user.getusername());
            pstmt.setString(2, user.getPassword());
            rs = pstmt.executeQuery();
            return rs.next();
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
        return false;
    }
}
