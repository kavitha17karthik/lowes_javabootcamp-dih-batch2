package com.examples.empapp.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpSession;

import com.examples.empapp.service.UserFunction;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.bind.support.SessionStatus;
import org.springframework.web.servlet.ModelAndView;

import com.examples.empapp.exception.LoginException;
import com.examples.empapp.model.User;

/**
 * Handles requests for the application login page.
 */
@Controller
@SessionAttributes("username")
public class LoginController {

	@Autowired
	public UserFunction userFunction;
	private static final Logger logger = LoggerFactory.getLogger(LoginController.class);
	
	@RequestMapping(value = "/login", method = RequestMethod.GET)	
	public ModelAndView login(Model model) {

		return new ModelAndView("login", "command", new User());
	}
	
	@RequestMapping(value = "/authenticate", method = RequestMethod.POST)
	@ExceptionHandler(LoginException.class)
	public ModelAndView authenticate(@ModelAttribute User user, Model model, HttpSession session) {

		if(userFunction.authenticateRegisterUser(user))
		{
			logger.info("Authentication success");

			model.addAttribute("username", user.getusername());
			return new ModelAndView("redirect:/employee/list");
		}
		else
		{
			logger.info("Authentication failed");
			throw new LoginException("Invalid User or Password");
		}
		
	}
	
	public List<User> getUsers()
	{
		List<User> users = new ArrayList<User>();
		users.add(new User("admin","admin@123"));
		users.add(new User("manager", "manager@123"));
		users.add(new User("user", "user@123"));
		return users;
	}
	
	
	@RequestMapping(value = "/logout", method = RequestMethod.GET)
	public String logout(HttpSession session, SessionStatus sessionStatus)
	{		
		sessionStatus.setComplete();
		return "redirect:/";
	}
}