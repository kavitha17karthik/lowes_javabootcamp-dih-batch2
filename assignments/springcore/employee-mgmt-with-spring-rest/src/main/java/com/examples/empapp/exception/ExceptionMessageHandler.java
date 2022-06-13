package com.examples.empapp.exception;

import com.examples.empapp.response.ResponseMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class ExceptionMessageHandler {

    Logger expLogger = LoggerFactory.getLogger(ExceptionMessageHandler.class);

    @ExceptionHandler(EmployeeNotFoundException.class)
    public ResponseEntity<ResponseMessage> handleErrors(EmployeeNotFoundException e) {
        ResponseMessage response = new ResponseMessage("Failure", e.getMessage());
        return ResponseEntity.internalServerError().body(response);
    }

    @ExceptionHandler(EmployeeCheckValidationException.class)
    public ResponseEntity<ResponseMessage> handleInputErrors(EmployeeCheckValidationException e) {
        ResponseMessage response = new ResponseMessage("Failure Input", e.getErrors());
        return ResponseEntity.internalServerError().body(response);
    }

    @ExceptionHandler(DatabaseConnectionException.class)
    public ResponseEntity<ResponseMessage> handleDatabaseErrors(DatabaseConnectionException e) {
        ResponseMessage response = new ResponseMessage("Failure db", e.getMessage());
        return ResponseEntity.internalServerError().body(response);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ResponseMessage> handleGenericErrors(Exception ex) {
        ResponseMessage response = new ResponseMessage("Failure exception", ex.getMessage());
        return ResponseEntity.internalServerError().body(response);
    }
}
