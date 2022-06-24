package com.examples.bankingapp.account.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.examples.bankingapp.account.model.Account;

@Repository
public interface AccountRepository extends JpaRepository<Account, Integer> {

}
