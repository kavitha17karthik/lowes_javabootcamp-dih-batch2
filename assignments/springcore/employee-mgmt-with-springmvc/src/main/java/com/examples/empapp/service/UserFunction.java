package com.examples.empapp.service;
import com.examples.empapp.Dao.UserDao;
import com.examples.empapp.model.User;
import org.springframework.beans.factory.annotation.Autowired;

public class UserFunction {
    @Autowired
    public UserDao userDao;
    // Register User Add
    public void registerUser(User user) {
        System.out.println();
        userDao.registerUser(user);
    }
    public boolean authenticateRegisterUser(User user) {
        return userDao.authenticateRegisterUser(user);
    }
}
