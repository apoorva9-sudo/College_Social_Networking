package com.college.networking.exception;

public class LoginException extends RuntimeException {
    public LoginException(String mess){
        super(mess);
    }
}