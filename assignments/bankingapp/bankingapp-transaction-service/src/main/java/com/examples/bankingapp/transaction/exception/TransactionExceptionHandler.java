package com.examples.bankingapp.transaction.exception;

import java.util.HashMap;

import java.util.Map;
import java.util.NoSuchElementException;

import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.context.request.WebRequest;

import com.examples.bankingapp.transaction.model.ResponseMessage;


@ControllerAdvice
public class TransactionExceptionHandler {

	@ExceptionHandler(Exception.class)
	private ResponseEntity<ResponseMessage> handleGenericException(Exception ex)
	{
		System.out.println("Error Message: " + ex.getMessage());
		
		ResponseMessage response = new ResponseMessage();
		response.setId(-1);
		response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.name());
		response.setStatusCode(HttpStatus.INTERNAL_SERVER_ERROR.value());
		response.setMessage(ex.getMessage());
		return ResponseEntity.badRequest().body(response);
		
	}
	 // Arguments in the Transaction - Validation
    @org.springframework.web.bind.annotation.ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, String> handleInvalidArgument(MethodArgumentNotValidException e) {
        Map<String, String> errorMap = new HashMap<>();

        e.getBindingResult().getFieldErrors().forEach(error -> {
            errorMap.put(error.getField(), error.getDefaultMessage());
        });
        return errorMap;
    }

    @org.springframework.web.bind.annotation.ExceptionHandler(NoSuchElementException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ResponseEntity<ResponseMessage> handleInvalidArgument(NoSuchElementException e) {
        // Map<String,String> errorMap=new HashMap<>();

        ResponseMessage resMsg = new ResponseMessage();
        return new ResponseEntity<ResponseMessage>(resMsg, HttpStatus.INTERNAL_SERVER_ERROR);

    }
    
   
}

