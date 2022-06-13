package com.examples.empapp.exception;

import java.util.List;

public class EmployeeCheckValidationException extends RuntimeException {
    private List<String> errors;

    public EmployeeCheckValidationException(String message) {
        super(message);
    }


    public EmployeeCheckValidationException(List<String> errors) {
        this.errors = errors;
    }

    public List<String> getErrors() {
        return errors;
    }
}
