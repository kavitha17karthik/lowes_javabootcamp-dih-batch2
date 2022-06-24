package com.examples.bankingapp.account.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.slf4j.Logger;


import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.MediaType;

import com.examples.bankingapp.account.exception.AccountNotFoundException;
import com.examples.bankingapp.account.model.Account;
import com.examples.bankingapp.account.service.AccountService;
import org.springframework.web.bind.annotation.RequestMethod;


@RestController
@RequestMapping("/account")
public class AccountServiceController {

   private static Logger log = LoggerFactory.getLogger(AccountServiceController.class);
   
   @Autowired
   AccountService accountService;
   
	
	 @DeleteMapping("/{id}")
	 public ResponseEntity<String>
	 delete(@PathVariable("id") int id) {
		 accountService.deleteAccount(id);
		 return new ResponseEntity<>("Account is Deleted Successfully", HttpStatus.OK); 
		}
	
	  
   @PutMapping("/{id}")
   public ResponseEntity<Object> updateAccount(@PathVariable("id") int id, @RequestBody @Valid Account account) { 
 
	   accountService.updateAccount(id, account);
	   
      return new ResponseEntity<>("Account is updated successsfully", HttpStatus.OK);
   }
   
   @PostMapping
   public ResponseEntity<Object> createAccount(HttpServletRequest requestHeader,@RequestBody @Valid Account account) throws RuntimeException {
	   
	  Account accnt = accountService.createAccount(account);
	  if(accnt!=null)
		  return new ResponseEntity<>("Account is Created successfully", HttpStatus.CREATED);  
	  
	  else
		  return new ResponseEntity<>("Account Creation failed", HttpStatus.OK);
			  	  
      //return new ResponseEntity<>("Account is created successfully", HttpStatus.CREATED);
   }
	      
	/*
	 * @GetMapping public ResponseEntity<Object> getAccounts() throws
	 * InterruptedException {
	 * System.out.println("Received request to list accounts..."); List<Account>
	 * getAllAcct = accountService.getAccounts(); return new
	 * ResponseEntity<>("Got All the account Details", HttpStatus.OK); // return new
	 * ResponseEntity<>(accountService.getAccounts(), HttpStatus.OK); }
	 */
   @GetMapping
	public  ResponseEntity<List<Account>> getAccounts() throws Exception {
		System.out.println("Showing All Account Details");
		return ResponseEntity.ok(accountService.getAccounts());
	}
   
   @GetMapping(path = "/{id}", produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE})
	public ResponseEntity<Account> get(@PathVariable int id) throws AccountNotFoundException{
			return ResponseEntity.ok(accountService.get(id));
		
	}
   
 }
