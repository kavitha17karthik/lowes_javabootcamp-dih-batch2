package com.examples.accservice.controller;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.examples.accservice.exception.AccountException;
import com.examples.accservice.model.Account;
import com.examples.accservice.model.ResponseMessage;
import com.examples.accservice.service.AccountService;

@RestController
@RequestMapping("/accounts")
public class AccountController {
	
	Logger logger = LoggerFactory.getLogger(AccountController.class); 

	@Autowired
	AccountService accService;

	// Create Account
	@PostMapping(consumes = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE }, produces = {
			MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE })
	public ResponseEntity<ResponseMessage> create(@RequestBody @Valid Account account, BindingResult errors) throws URISyntaxException, AccountException {
		
		if(errors.hasErrors()) {
			for(ObjectError error:errors.getAllErrors()) {
				logger.error("Validation Error: {} - {} ", error.getObjectName(), error.getDefaultMessage());
			}
			throw new AccountException("Validation Errors");
		}
		
		// Logic to add account
		Account accountCreated = accService.create(account);		
		
		// Build newly created Account resource URI
		// http://localhost:8080/spring-rest-labs/accounts/{id}
		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(accountCreated.getId()).toUri();
		ResponseMessage response = new ResponseMessage("Success", "Account Created Successfully");
		return ResponseEntity.created(location).body(response);
	}

	// List Accounts
	@GetMapping
	public List<Account> getAll() throws AccountException {
		return accService.list();
	}

	// Get Account
	@GetMapping(path = "/{id}", produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE })
	public Account get(@PathVariable int id) {
		return accService.get(id);
	}

	// Update Account
	@PutMapping("/{id}")
	public ResponseEntity<String> update(@PathVariable int id, @RequestBody Account account) {
		account.setId(id);
		Account updatedAcc = accService.update(id, account);
		return ResponseEntity.ok().body("Account updated successfully");
	}
	
	// Search Accounts
	@GetMapping("/search")
	public List<Account> search(@RequestParam String type) throws AccountException {
		return accService.search(type);
	}	

	// Delete Account
	@DeleteMapping("/{id}")
	public ResponseEntity<String> delete(@PathVariable int id) {
		accService.delete(id);
		return ResponseEntity.ok().body("Account deleted successfully");
	}
	
	@ExceptionHandler(AccountException.class)
	public ResponseEntity<ResponseMessage>  handleErrors(AccountException ex) {
		ResponseMessage response = new ResponseMessage("Failure", ex.getMessage());
		return ResponseEntity.internalServerError().body(response);
	}	

}
