package Employee;

import Model.Employee;
import Service.EmployeeDaoImpl;
import Util.DbConnection;

import java.io.*;
//import java.math.BigDecimal;
import java.sql.SQLException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.*;
import java.sql.*;

//DATE
import java.util.function.BinaryOperator;
import java.util.function.Consumer;
import java.util.function.Predicate;
import java.util.stream.Collectors;


public abstract class EmployeeMain {
    static Scanner scan;

    static {
        scan = new Scanner(System.in);
    }

    public EmployeeMain() {
    }

}


