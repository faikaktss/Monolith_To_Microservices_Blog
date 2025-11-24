
package com.faik.demo2.exception;

public class ResorceNotFoundException  extends RuntimeException{
    
    public ResorceNotFoundException(String message){
        super(message);
    }

    public ResorceNotFoundException(String message ,Throwable cause){
        super(message,cause);
    }
}