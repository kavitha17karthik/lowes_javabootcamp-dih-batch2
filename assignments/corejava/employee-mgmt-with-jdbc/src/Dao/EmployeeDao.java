package Dao;

import Model.Employee;
import java.sql.SQLException;
import java.util.List;

public interface EmployeeDao {
    int insert(Employee var1) throws ClassNotFoundException, SQLException;

    int update(Employee var1) throws ClassNotFoundException, SQLException;

    int delete(int var1) throws ClassNotFoundException, SQLException;

    List<Employee> showAll() throws ClassNotFoundException, SQLException;

}
