package com.examples.accservice.service;

import java.util.List;

import com.examples.accservice.exception.AccountException;
import com.examples.accservice.model.Account;


public interface AccountService {
	
	public Account create(Account account) throws AccountException;
	public List<Account> list() throws AccountException;
	public Account get(int id);
	public Account update(int id, Account account);
	public void delete(int id);
	public List<Account> search(String type);

}
