package com.examples.bankingapp.transaction.service;

import java.util.List;

import java.util.Optional;

import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import com.examples.bankingapp.transaction.model.Transaction;
import com.examples.bankingapp.transaction.repository.TransactionRepository;


@Service
public class TransactionService {

	@Autowired
	TransactionRepository transactionRepo;
	
	@Autowired
	KafkaTemplate<String, String> kafkaTemplate;	
	
	/**
	 * @param customer
	 * @return
	 */
	public Integer add(Transaction transaction) {
		transactionRepo.save(transaction);
		return transaction.getId();
	}

	public void update(Transaction transaction) {
		transactionRepo.save(transaction);
	}

	public Transaction get(Integer id) {
		Optional<Transaction> emp = transactionRepo.findById(id); 
		return  emp.isPresent() ? emp.get() : null;
	}

	public void delete(Integer id) {
		transactionRepo.deleteById(id);
	}

	public List<Transaction> list() {
		return transactionRepo.findAll();
	}
	
	public void deleteAll()
	{
		transactionRepo.deleteAll();
	}
	

	
	// Handler

		@KafkaListener(topics = "FUNDTRANSFER_CREATED", groupId = "transaction-service", clientIdPrefix = "trasaction-service")
		public void listenFundTransferCreated(ConsumerRecord<?, ?> cr) throws Exception {
			System.out.println(" Listener of Transaction service: " + cr.value());

			String msg = (String) cr.value();
			String[] tokens = msg.split(",");
			String sourceAccId = tokens[0];
			String targetAccId = tokens[1];
			String amount = tokens[2];
			String description = tokens[3];

			int nsourceAccId = Integer.parseInt(sourceAccId);
			int ntargetAccId = Integer.parseInt(targetAccId);
			double damount = Double.valueOf(amount);

			// Create debit transaction
			Transaction debitTransaction = new Transaction();
			debitTransaction.setAccountId(nsourceAccId);
			debitTransaction.setAmount(damount);
			debitTransaction.setDescription(description);
			debitTransaction.setType("debit");
			transactionRepo.save(debitTransaction);

			// Create credit transaction
			Transaction creditTransaction = new Transaction();
			creditTransaction.setAccountId(ntargetAccId);
			creditTransaction.setAmount(damount);
			creditTransaction.setDescription(description);
			creditTransaction.setType("credit");
			transactionRepo.save(creditTransaction);

		}
		
		// Rollback Handler

		@KafkaListener(topics = "ROLLBACK_CREATED", groupId = "transaction-rollback-service", clientIdPrefix = "trasaction-roll-service")
		public void listenRollbackFromAccount(ConsumerRecord<?, ?> rollcr) throws Exception {
			System.out.println("Roll Back Transaction " + rollcr.value());

			String msg = (String) rollcr.value();
			String[] tokens = msg.split(",");
			String sourceAccId = tokens[0];
			String targetAccId = tokens[1];
			String amount = tokens[2];
			String description = tokens[3];

			int nsourceAccId = Integer.parseInt(sourceAccId);
			int ntargetAccId = Integer.parseInt(targetAccId);
			double damount = Double.valueOf(amount);

			// Create rollback debit transaction
			Transaction debitTransaction = new Transaction();
			debitTransaction.setAccountId(nsourceAccId);
			debitTransaction.setAmount(damount);
			debitTransaction.setDescription(description);
			debitTransaction.setType("rollback-credit");
			transactionRepo.save(debitTransaction);

			// Create rollback credit transaction
			Transaction creditTransaction = new Transaction();
			creditTransaction.setAccountId(ntargetAccId);
			creditTransaction.setAmount(damount);
			creditTransaction.setDescription(description);
			creditTransaction.setType("rollback-debit");
			transactionRepo.save(creditTransaction);

		}
	
}
