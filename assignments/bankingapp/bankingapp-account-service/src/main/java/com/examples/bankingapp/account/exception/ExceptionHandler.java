package com.examples.bankingapp.account.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.context.request.WebRequest;

import java.util.HashMap;
import java.util.Map;
import java.util.NoSuchElementException;

public class ExceptionHandler {

    // Arguments in the Employee - Validation
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

        ResponseMessage resMsg = new ResponseMessage(e.getMessage());
        return new ResponseEntity<ResponseMessage>(resMsg, HttpStatus.INTERNAL_SERVER_ERROR);

    }
    
   	// Other General Exception
   	@SuppressWarnings("unchecked")
   	@org.springframework.web.bind.annotation.ExceptionHandler(Exception.class)
   	public ResponseEntity<?> handleGlobalException(Exception empException, WebRequest request) {
   		
   		System.out.println(empException.getMessage());
   		ResponseMessage resMsg = new ResponseMessage(empException.getMessage(), request.getDescription(false));
   		return new ResponseEntity(resMsg, HttpStatus.INTERNAL_SERVER_ERROR);

   	}
}
