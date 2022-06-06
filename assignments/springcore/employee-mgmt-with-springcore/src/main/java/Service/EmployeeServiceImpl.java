package Service;

import Dao.EmployeeDao;
import Model.Employee;

import java.io.BufferedReader;
import java.io.FileReader;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.List;

public class EmployeeServiceImpl implements EmployeeService{

    private EmployeeDao employeeDao;

    public EmployeeDao getEmployeeDao()
    {
        return employeeDao;
    }

    public void setEmployeeDao(EmployeeDao employeeDao)
    {
        this.employeeDao = employeeDao;
    }

    public EmployeeServiceImpl() {
    }

    @Override
    public int insert(Employee var1) throws ClassNotFoundException, SQLException {
        return employeeDao.insert(var1);

    }

    @Override
    public int update(Employee var1) throws ClassNotFoundException, SQLException {
        return employeeDao.update(var1);
    }

    @Override
    public int updateEmployeeDesignationById(String eDesignation, int eId) throws SQLException, ClassNotFoundException {
        return employeeDao.updateEmployeeDesignationById(eDesignation,eId);
    }
    @Override
    public int delete(int var1) throws ClassNotFoundException, SQLException {
        return employeeDao.delete(var1);
    }

    @Override
    public List<Employee> showAll() throws ClassNotFoundException, SQLException {
        return employeeDao.showAll();
    }

    @Override
    public Employee getEmployee(long employeeId) {
        return null;
    }

}
