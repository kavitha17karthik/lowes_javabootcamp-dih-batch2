package com.examples.bankingapp.account.service;

import static org.assertj.core.api.Assertions.assertThat;

import static org.junit.jupiter.api.Assertions.assertEquals;

import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import com.examples.bankingapp.account.model.Account;
import com.examples.bankingapp.account.repository.AccountRepository;

@SpringBootTest
public class AccountServiceTests {


	 @Autowired private AccountService accountService;

	 @MockBean private AccountRepository accountRepo;

	 @BeforeAll public static void init() {

	 System.out.println("Test data initialization at class level..");

	 }

	 @AfterAll public static void tearDown() { }

	 private static List<Account> accounts = new ArrayList<>();

	 @BeforeEach public void setup() {


	 Account acct1 = new Account(); acct1.setId(1); acct1.setName("Kavitha");
	 acct1.setStatus("active"); acct1.setAccType("Saving");
	 acct1.setStatus("Active"); acct1.setOpenDate("2022-01-09");
	 accounts.add(acct1);

	 Account acct2 = new Account(); acct2.setId(2); acct2.setName("Rajesh");
	 acct2.setStatus("blocked"); acct2.setAccType("Saving");
	 acct2.setStatus("Active"); acct2.setOpenDate("2021-03-09");
	 accounts.add(acct2); }

	 @AfterEach public void cleanup() { // accountService.clear();
	 accounts.clear(); }

	 @Test public void shouldCreateProductWhenPassingMandatoryDetails() { Account
	 account = new Account(); account.setId(3); account.setName("Jhansi");
	 account.setAccType("Current");
	 Mockito.when(accountRepo.save(account)).thenReturn(account);
	 assertThat(accountService.createAccount(account)).isEqualTo(account);

	 }

	 @Test public void shouldShowErrorWhenNotPassingMandatoryDetails() { Account
	 account = new Account(); try { accountService.createAccount(account); } catch
	 (Exception e) { assertEquals("Account Id mandatory", e.getMessage()); } }



	 @Test public void shouldReturnAllAccountsWhenDontSpecifyAccountId() {
	 Mockito.when(accountRepo.findAll()).thenReturn(accounts); assertEquals(2,
	 accountService.getAccounts().getId()); }


	 @Test public void shouldDeleteProductWhenPassingValidProductId() {
	 Mockito.when(accountRepo.findById(2)).thenReturn(Optional.of(accounts.get(1))
	 ); accountService.deleteAccount(2); }




	 @Test public void shouldReturnAccountsForGivenAccountId() {
	 Mockito.when(accountRepo.findById(2)).thenReturn(Optional.of(accounts.get(1))
	 ); assertNotNull(accountService.getAccount(2));
	 assertEquals(2,accountService.getAccount(2).getId()); }


}
