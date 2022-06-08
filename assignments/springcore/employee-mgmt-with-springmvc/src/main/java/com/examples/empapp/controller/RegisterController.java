package com.examples.empapp.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.examples.empapp.service.UserFunction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import com.examples.empapp.model.User;

/**
 * Handles requests for the application login page.
 */
@Controller
public class RegisterController {

    @Autowired
    public UserFunction userFunction;
    @RequestMapping(value = "/register", method = RequestMethod.GET)
    public ModelAndView register(Model model) {

        return new ModelAndView("register", "command", new User());

    }

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public ModelAndView addUser(HttpServletRequest request, HttpServletResponse response,
                                @ModelAttribute("user") User user) {

        userFunction.registerUser(user);
       return new ModelAndView("registerationDone", "name", user.getName());
    }

  }