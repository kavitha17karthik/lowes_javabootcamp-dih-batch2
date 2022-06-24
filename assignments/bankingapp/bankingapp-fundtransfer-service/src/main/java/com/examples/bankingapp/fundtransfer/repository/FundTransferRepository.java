package com.examples.bankingapp.fundtransfer.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.examples.bankingapp.fundtransfer.model.FundTransfer;


public interface FundTransferRepository extends JpaRepository<FundTransfer, Integer> {

}
