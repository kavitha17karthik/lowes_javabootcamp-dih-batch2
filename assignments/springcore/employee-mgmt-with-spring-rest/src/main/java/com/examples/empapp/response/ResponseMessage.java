package com.examples.empapp.response;

import org.springframework.http.HttpStatus;

import java.util.List;

public class ResponseMessage {
    String status;
    String message;
    List<String> inputErr;
    public ResponseMessage()
    {

    }
    public ResponseMessage(String status, String message) {
        super();
        this.status = status;
        this.message = message;
    }
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }
    public String getMessage() {
        return message;
    }
    public void setMessage(String message) {
        this.message = message;
    }
    public ResponseMessage(String status, List<String> errors) {
        this.status = status;
        this.inputErr = errors;
    }
    public List<String> getErrors() {
        return inputErr;
    }
    public void setErrors(List<String> err) {
        this.inputErr = err;
    }

}
