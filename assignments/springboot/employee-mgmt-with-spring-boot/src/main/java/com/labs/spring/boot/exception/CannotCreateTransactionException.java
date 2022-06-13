package com.labs.spring.boot.exception;

public class CannotCreateTransactionException extends Exception{
	public CannotCreateTransactionException(String message) {
        super(message);
    }

}
