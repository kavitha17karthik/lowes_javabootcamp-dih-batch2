package com.examples.empapp.model;

public class User {
	
	private String username;
	private String password;
	private String name;
	private String email;

	public User()
	{

	}
	public User(String username, String password)
	{
		this.username = username;
		this.password = password;
	}
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getusername() {
		return username;
	}
	public void setusername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}	

}
