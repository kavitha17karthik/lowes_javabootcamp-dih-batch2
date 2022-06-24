package com.examples.bankingapp.account.controller;

import org.json.JSONException;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;


import com.examples.bankingapp.account.model.Account;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import static org.assertj.core.api.Assertions.assertThat;

import org.springframework.boot.test.context.SpringBootTest;
import com.examples.bankingapp.account.AccountServiceMain;
@RunWith(SpringRunner.class)
@SpringBootTest(classes = AccountServiceMain.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class AccountServiceIntegrationTest {


	 @LocalServerPort private int port;

	 @Autowired private TestRestTemplate testRestTemplate;

	 HttpHeaders headers = new HttpHeaders();

	  @Test public void shouldGetAccountIntegrationTest() throws JSONException,
	  JsonProcessingException {

	  Account account = new Account(); account.setAccType("Savings");
	  account.setBalance(9300); account.setId(1); account.setName("Kavitha");
	  account.setOpenDate("2000-01-01"); account.setStatus("Active");


	  String URIToCreateTicket = "/account";

	  HttpEntity<Account> entity = new HttpEntity<Account>(account, headers);
	  ResponseEntity<String> response =
	  testRestTemplate.exchange(createURLWithPort(URIToCreateTicket),
	  HttpMethod.POST, entity, String.class);

	  //String responseInJson = response.getBody();
	  assertThat(response.getBody()).isEqualTo("Account is Created successfully");

	  //Below method is also working


	  HttpEntity<String> entity = new HttpEntity<String>(null, headers);

	  ResponseEntity<String> response = restTemplate.exchange(
	  createURLWithPort("/"), HttpMethod.GET, entity, String.class);

	  String expected = "{id:1,name:Kalyani,accType:Savings}";

	  JSONAssert.assertEquals(expected, response.getBody(), true);

	  }

	  @Test public void testGetAccountById() throws Exception {

	  Account gAccount = new Account(); gAccount.setAccType("Savings");
	  gAccount.setBalance(9300); gAccount.setId(1); gAccount.setName("Kavitha");
	  gAccount.setOpenDate("2000-01-01"); gAccount.setStatus("Active");

	  String URIToCreateTicket = "/account";

	  String inputInJson = this.mapToJson(gAccount);

	  HttpEntity<Account> entity = new HttpEntity<Account>(gAccount, headers);

	  testRestTemplate.exchange( createURLWithPort(URIToCreateTicket),
	  HttpMethod.POST, entity, String.class);
	  System.out.println("GetAccountbyID: GetAccount"+ URIToCreateTicket);

	  String URIToGetTicket = "/account/1"; String bodyJsonResponse =
	  testRestTemplate.getForObject(createURLWithPort(URIToGetTicket),
	  String.class); System.out.println("GetAccountbyID:GetAccount: Again"+
	  URIToCreateTicket); assertThat(bodyJsonResponse).isEqualTo(inputInJson);

	  }

	  private String mapToJson(Object object) throws JsonProcessingException {
	  ObjectMapper objectMapper = new ObjectMapper(); return
	  objectMapper.writeValueAsString(object); }

	  private String createURLWithPort(String uri) { return "http://localhost:" +
	  port + uri; }


}
