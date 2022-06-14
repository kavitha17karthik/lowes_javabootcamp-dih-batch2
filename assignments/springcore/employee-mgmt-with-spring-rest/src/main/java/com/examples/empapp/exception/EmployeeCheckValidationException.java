package com.examples.empapp.exception;

import java.util.List;

public class EmployeeCheckValidationException extends RuntimeException {
    private List<String> inputErr;

    public EmployeeCheckValidationException(String message) {
        super(message);
    }


    public EmployeeCheckValidationException(List<String> err) {
        this.inputErr = err;
    }

    public List<String> getErrors() {
        return inputErr;
    }
}
