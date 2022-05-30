package Util;

import java.sql.*;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class DbConnection {
    private Connection conn = null;
    PreparedStatement stmt = null;

    public DbConnection() {
    }

    public void open() throws ClassNotFoundException, SQLException {
        Class.forName("com.mysql.cj.jdbc.Driver");
        this.conn = DriverManager.getConnection("jdbc:mysql://localhost/jdbctraining", "training", "training");
    }

    public PreparedStatement initStatement(String sql) throws SQLException {
        this.stmt = this.conn.prepareStatement(sql);
        return this.stmt;
    }

    public int executeUpdate() throws SQLException {
        return this.stmt.executeUpdate();
    }
    public void commit() throws SQLException {
         this.conn.commit();
    }
    public ResultSet executeQuery() throws SQLException {
        return this.stmt.executeQuery();
    }

    public void close() throws SQLException {
        if (this.conn != null && !this.conn.isClosed()) {
            this.conn.close();
            this.conn = null;
        }

    }
}
