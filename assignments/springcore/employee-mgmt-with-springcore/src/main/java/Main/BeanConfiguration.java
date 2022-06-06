package Main;

import Dao.EmployeeDao;
import Service.EmployeeDaoImpl;
import Service.EmployeeService;
import Service.EmployeeServiceImpl;
import org.springframework.beans.factory.annotation.Autowire;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
public class BeanConfiguration {

    @Bean
    public EmployeeDao employeeDao()
    {
        EmployeeDaoImpl employeeDao = new EmployeeDaoImpl();
        return employeeDao;
    }

    @Bean
    public EmployeeService employeeService()
    {
        EmployeeServiceImpl bean = new EmployeeServiceImpl();
        bean.setEmployeeDao(employeeDao());
        return bean;
    }
}
