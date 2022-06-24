package com.examples.bankingapp.account.controller;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.examples.bankingapp.account.exception.ResponseMessage;
import com.examples.bankingapp.account.model.Account;
import com.examples.bankingapp.account.service.AccountService;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
public class AccountServiceControllerTests {
	
		 

	 @LocalServerPort int randomServerPort;

	 @Autowired TestRestTemplate restTemp;


	 @MockBean
	 AccountService accountService;

	  @Autowired private MockMvc mockmvc;

	  private static List<Account> accounts = new ArrayList<>();

	  @BeforeEach public void setup() { // Initialize Test data Account acct1 = new
	  Account(); acct1.setId(1); acct1.setName("Kavitha");
	  acct1.setStatus("active"); acct1.setAccType("Saving");
	  acct1.setStatus("Active"); acct1.setOpenDate("2022-01-09");
	  accounts.add(acct1); //accountService.createAccount(acct1); Account acct2 =
	  new Account(); acct2.setId(2); acct2.setName("Rajesh");
	  acct2.setStatus("blocked"); acct2.setAccType("Saving");
	  acct2.setStatus("Closed"); acct2.setOpenDate("2021-03-09");
	  accounts.add(acct2); //accountService.createAccount(acct2); Account acct3 =
	  new Account(); acct3.setId(3); acct3.setName("Arunkarthik");
	  acct3.setStatus("active"); acct3.setAccType("Saving");
	  acct3.setStatus("Blocked"); acct3.setOpenDate("2010-07-09");
	  accounts.add(acct3); //accountService.createAccount(acct3); }

	  @AfterEach public void cleanup() { accounts.clear(); }

	  //Testing - CreateAccount // @SuppressWarnings({ "rawtypes", "unchecked" })

	  @Test public void shouldCreateAccountNotPassingMandatoryFields() throws
	  URISyntaxException { System.out.println("Good");


	  String reqBody =
	  "{\"id\":\"1\",\"name\":\"\",\"accType\":\"Savings\",\"status\":\"active\"}";

	  // Step 1: Create Request HttpHeaders headers = new HttpHeaders();
	  headers.setContentType(MediaType.APPLICATION_JSON);

	  RequestEntity request = new RequestEntity(reqBody,
	  headers,HttpMethod.POST,new URI("/"));


	  // Response:{"status":"Failure: No proper method arguments","errors":["name
	  // cannot be blank"]} // Step 2: Send Request to Endpoint // Step 3: Receive
	  the Response ResponseEntity<ResponseMessage> response =
	  restTemp.exchange(request, ResponseMessage.class);

	  ResponseMessage responseMsg = response.getBody(); assertEquals("400",
	  responseMsg.getStatus()); // assertEquals("name cannot be blank",
	  responseMsg.getErrors().get(0));

	  }


	  @Test public void shouldCreateAccount() throws Exception {

	  MockHttpServletRequest request = new MockHttpServletRequest();
	  RequestContextHolder.setRequestAttributes(new
	  ServletRequestAttributes(request));

	  Account acct3 = new Account(); acct3.setId(3); acct3.setName("Suman");
	  acct3.setStatus("active"); acct3.setAccType("Saving");
	  acct3.setStatus("Active"); acct3.setOpenDate("1999-01-09");
	  when(accountService.createAccount(acct3)).thenReturn(acct3);

	  Account responseEntity = accountService.createAccount(acct3);
	  assertEquals(3,responseEntity.getId()); }


		  @Test public void shouldReturnAllAccountsWhenDontSpecifyAccountId() {

		  Mockito.when(accountService.getAccounts()).thenReturn(Optional.of(accounts));
		  System.out.println("good"); assertEquals(3,
		  accountService.getAccounts().getId()); }

  }
