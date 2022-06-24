package com.examples.bankingapp.fundtransfer.service;



import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import com.examples.bankingapp.fundtransfer.model.FundTransfer;
import com.examples.bankingapp.fundtransfer.repository.FundTransferRepository;



@Service
public class FundTransferService {

	@Autowired
	FundTransferRepository orderRepo;
	
	@Autowired
	KafkaTemplate<String, String> kafkaTemplate;
	
	public Integer create(FundTransfer fundTransfer) {
		fundTransfer.setStatus("PEDNING");
		orderRepo.save(fundTransfer);
		System.out.println("------------------");
		System.out.println("Source Account :"+fundTransfer.getSourceAcctNo());
		System.out.println("Destination Account :" +fundTransfer.getDstnAcctNo());
		System.out.println("Amount :"+fundTransfer.getAmount());
		System.out.println("Trans Type :"+fundTransfer.getType());
		System.out.println("------------------");
		
		String msg = fundTransfer.getSourceAcctNo()+ "," + fundTransfer.getDstnAcctNo() + "," + String.valueOf(fundTransfer.getAmount()+","+ fundTransfer.getType());
		
		kafkaTemplate.send("FUNDTRANSFER_CREATED", msg);
		
		System.out.println("**** Create Fundtransfer(Service)");
		
		return fundTransfer.getId();
	}
	/*
	 * @KafkaListener(topics = "FUNDTRANSFER_APPROVED",
	 * groupId="fundtransfer-service") public void
	 * listenFundTransferApproval(ConsumerRecord<?, ?> cr) throws Exception {
	 * System.out.println("###################Order Approved Received: " +
	 * cr.value()); // Logic to update order with APPROVED status
	 * 
	 * @SuppressWarnings("removal") Integer approvedFundTransferId = new
	 * Integer(cr.value().toString());
	 * System.out.println("#############listenFundTransferApproval: "
	 * +approvedFundTransferId); FundTransfer fundTrans =
	 * orderRepo.findById(approvedFundTransferId).get();
	 * fundTrans.setStatus("APPROVED"); // Save Order orderRepo.save(fundTrans); }
	 * 
	 * @KafkaListener(topics = "FUNDTRANSFER_REJECTED",
	 * groupId="fundtransfer-service") public void
	 * listenFundTransferRejection(ConsumerRecord<?, ?> cr) throws Exception {
	 * System.out.println("###################Order Rejected Received: " +
	 * cr.value()); // Logic to update order with REJECTED status
	 * 
	 * @SuppressWarnings("removal") Integer rejectedFundTransferId = new
	 * Integer(cr.value().toString());
	 * System.out.println("###################Order Rejected Received: "
	 * +rejectedFundTransferId); FundTransfer order =
	 * orderRepo.findById(rejectedFundTransferId).get();
	 * order.setStatus("REJECTED"); // Save Order orderRepo.save(order); }
	 */
    
}
