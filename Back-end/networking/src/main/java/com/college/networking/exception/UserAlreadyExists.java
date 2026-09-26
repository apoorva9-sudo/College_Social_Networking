package com.college.networking.exception;

public class UserAlreadyExists extends RuntimeException {
    public UserAlreadyExists(String mess){
        super(mess);
    }
}
