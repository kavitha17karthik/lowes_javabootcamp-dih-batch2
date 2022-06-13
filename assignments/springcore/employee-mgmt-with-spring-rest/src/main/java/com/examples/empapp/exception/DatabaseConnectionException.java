package com.examples.empapp.exception;

public class DatabaseConnectionException extends RuntimeException {
    public DatabaseConnectionException(String message) {
        super(message);
    }
    public DatabaseConnectionException(String message, Throwable cause) {
        super(message,cause);
    }
}
