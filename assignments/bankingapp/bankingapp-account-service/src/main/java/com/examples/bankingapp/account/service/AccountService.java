package com.examples.bankingapp.account.service;


import java.util.Collection;

import java.util.List;
import java.util.Optional;

import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;

import com.examples.bankingapp.account.exception.AccountNotFoundException;
import com.examples.bankingapp.account.model.Account;
import com.examples.bankingapp.account.repository.AccountRepository;

@Service
public class AccountService {


    @Autowired
    AccountRepository accountRepo;


	@Autowired
	KafkaTemplate<String, String> kafkaTemplate;
	
    public List<Account> getAccounts() {
    	System.out.println("Inside Service getAccounts");
        return accountRepo.findAll();
    }

    public Account createAccount(Account account) {
        if(account.getId() == 0) {
        	throw new RuntimeException("Account Id mandatory");           
        }
        return accountRepo.save(account);
       // return 1;
    }

    public void updateAccount(int id, Account account) {
    	account.setId(id);
        accountRepo.save(account);
    }

    public Account get(int id) throws AccountNotFoundException {
	
	return accountRepo.findById(id).orElseThrow(() -> new AccountNotFoundException("EmployeeID" + id +" Not found in database"));
    }
    
    public void clear() {
    	accountRepo.deleteAll();    	
    }

	public void deleteAccount(int id) {
	
    	accountRepo.delete(accountRepo.findById(id).get());
		
	}
		
			//@KafkaListener(topics = "FUNDTRANSFER_CREATED", groupId="account-service")
	@KafkaListener(topics = "FUNDTRANSFER_CREATED", groupId = "account-service")
		    public void listenFundTransferCreated(ConsumerRecord<?, ?> cr) throws Exception {
				
		        System.out.println("Listener of Account Service : " + cr.value());    
		       
		        String msg = (String) cr.value();
		        String[] tokens = msg.split(",");
		        String sourceAccId = tokens[0];
		        String targetAccId = tokens[1];
		        String amount = tokens[2];
		        String description = tokens[3];
		        
		        
		        int nsourceAccId = Integer.parseInt(sourceAccId);
		        int ntargetAccId = Integer.parseInt(targetAccId);
		        double damount = Double.valueOf(amount);
		        
		        //accountRepo.delete(accountRepo.findById(id).get());
		        Account accByTgtId = accountRepo.findById(ntargetAccId).get();
		        
		        if("active".equals(accByTgtId.getStatus()) ) {
		        //  debit amount from source account balance	        
			        Account accBySrcId = accountRepo.findById(nsourceAccId).get();
			        double srcBalance = accBySrcId.getBalance()-damount;
			        accBySrcId.setBalance(srcBalance);			        
			        accountRepo.save(accBySrcId);     
			        
			     // credit amount from target account balance
			        accByTgtId.setBalance(accByTgtId.getBalance()+damount);
			        accountRepo.save(accByTgtId);	        	
		        }  else {	    
		        	System.out.println("Listener of Account Service : Rollback Created" );
		        	kafkaTemplate.send("ROLLBACK_CREATED",msg);
		        }
		      
		    }
}