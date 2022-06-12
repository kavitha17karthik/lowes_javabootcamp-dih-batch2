package com.labs.spring.boot.exception;

import org.springframework.http.HttpStatus;

public class ResponseMessage {
	
	   	String status;
	    String message;
	    int code;

	    public ResponseMessage()
	    {

	    }
	    public ResponseMessage(String status, String message) {
	        super();
	        this.status = status;
	        this.message = message;
	    }

	    public ResponseMessage(int value, String string) {
			// TODO Auto-generated constructor stub
	    	 super();
		        this.code = value;
		        this.message = string;
		}
	    
	    public ResponseMessage(String  string) {
			// TODO Auto-generated constructor stub
	    	 super();
		     this.message = string;
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
	    public static ResponseMessage responseMessageEntityNoArg() {
	        return new ResponseMessage(HttpStatus.NOT_FOUND.getReasonPhrase());
	    }

	    public static ResponseMessage responseMessageEntity() {
	        return new ResponseMessage(HttpStatus.OK.value(),"OK");
	    }

	    public static ResponseMessage responseMessageError() {
	        return new ResponseMessage(HttpStatus.NO_CONTENT.value(), "Body must not null");
	    }

}
