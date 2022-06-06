package Util;

import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Properties;

public class DbConnection {

    private static final String DB_DRIVE_CLASS = "db_driver";
    private static final String DB_USERNAME="db_user";
    private static final String DB_PASSWORD = "db_pass";
    private static final String DB_URL = "db_jdbc";
    private Connection conn = null;
    private static  Properties prop=null;
    PreparedStatement stmt = null;

    public DbConnection() {
    }

    public void open() throws ClassNotFoundException, SQLException {
        try
        {

            prop=new Properties();
            prop.load(new FileInputStream("src/main/resources/datasource.properties"));
            Class.forName(prop.getProperty(DB_DRIVE_CLASS));
            conn=DriverManager.getConnection(prop.getProperty(DB_URL),prop.getProperty(DB_USERNAME),prop.getProperty(DB_PASSWORD));
        }catch(IOException | SQLException e)
        {
            e.printStackTrace();
        }

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
