package com.examples.accservice.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.examples.accservice.model.Account;

public interface AccountRepository extends JpaRepository<Account, Integer>{
	
	public List<Account> findByType(String type);
	
	public List<Account> findByTypeAndOwner(String type, String owner);
	
	@Query("Select a FROM Account a WHERE type=:accType")
	public List<Account> findByAccountType(String accType);
	
	@Query("Select a FROM Account a WHERE type=:accType AND balance > :balance")
	public List<Account> findByAccountTypeAndBalance(String accType, double balance);

}
