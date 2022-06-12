package com.examples.accservice.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examples.accservice.exception.AccountException;
import com.examples.accservice.model.Account;
import com.examples.accservice.repository.AccountRepository;


@Service
public class AccountServiceImpl implements AccountService {
	
	@Autowired
	AccountRepository repo;

//	Map<Integer, Account> accounts = new HashMap<>();

	@Override
	public Account create(Account account) throws AccountException {
//		account.setId(accounts.size() + 1);
//		if (accounts.size() > 2) {
//			throw new AccountException("Account creation failed.");
//		}
//		accounts.put(account.getId(), account);
//		return account;
		return repo.save(account);
	}

	@Override
	public List<Account> list() throws AccountException {
//		if (accounts.size() > 1) {
//			throw new AccountException("Account Listing failed.");
//		}
//		return new ArrayList<Account>(accounts.values());
		return repo.findAll();
	}

	@Override
	public Account get(int id) {
//		return accounts.get(id);
		return repo.findById(id).get();
	}

	@Override
	public Account update(int id, Account account) {
//		accounts.put(id, account);
//		return account;
		return repo.save(account);
	}

	@Override
	public void delete(int id) {
//		accounts.remove(id);
		repo.deleteById(id);
	}

}
