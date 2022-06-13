package com.labs.spring.boot.exception;

import java.sql.SQLException;

import java.util.HashMap;
import java.util.Map;
import java.util.NoSuchElementException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;
import org.springframework.transaction.CannotCreateTransactionException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import com.labs.spring.boot.controller.EmployeeController;

@RestControllerAdvice
public class ExceptionMessageHandler {

	Logger expLogger = LoggerFactory.getLogger(EmployeeController.class);

	// EmployeeNotfound exception handler -Update and Get
	@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR) // 500
	@ExceptionHandler(EmployeeNotFoundException.class)
	public Map<String, String> handleEmployeeRelatedException(EmployeeNotFoundException e) {
		Map<String, String> errorMap = new HashMap<>();
		errorMap.put("errorMessage:", e.getMessage());
		expLogger.info("EmployeeNotFoundException");
		return errorMap;
	}

	// Other General Exception
	@SuppressWarnings("unchecked")
	@ExceptionHandler(Exception.class)
	public ResponseEntity<?> handleGlobalException(Exception empException, WebRequest request) {
		expLogger.info("NoSuchElementException - GlobalExceptionHandler");
		System.out.println(empException.getMessage());
		ResponseMessage resMsg = new ResponseMessage(empException.getMessage(), request.getDescription(false));
		return new ResponseEntity(resMsg, HttpStatus.INTERNAL_SERVER_ERROR);

	}

	//  Validation -Employee model variables validation
	@ExceptionHandler(MethodArgumentNotValidException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	public Map<String, String> handleInvalidArgument(MethodArgumentNotValidException e) {
		Map<String, String> errorMap = new HashMap<>();
		e.getBindingResult().getFieldErrors().forEach(error -> {
			errorMap.put(error.getField(), error.getDefaultMessage());
		});
		return errorMap;
	}

	@ExceptionHandler(NoSuchElementException.class)
	@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
	public ResponseEntity handleInvalidArgument(NoSuchElementException e) {
		ResponseMessage resMsg = new ResponseMessage(e.getMessage());
		return new ResponseEntity(resMsg, HttpStatus.INTERNAL_SERVER_ERROR);

	}
	//Database failure exception		
	  @ExceptionHandler(CannotCreateTransactionException.class) 
	  public ResponseEntity<ResponseMessage> handleDatabaseConnectionErrors(CannotCreateTransactionException e) {
	 // ResponseMessage response = new ResponseMessage("Database Connection Error", "Message: " + e.getCause());
	  ResponseMessage response = new ResponseMessage("Database Error", "Failed to Connect to Database");
	  return ResponseEntity.internalServerError().body(response); 
	  }  

}
