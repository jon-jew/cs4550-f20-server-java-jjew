package com.example.cs4550f20serverjavajjew.models;

public class User {
    private long id;
    private String username;
    private String firstName;
    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public String getFirstName() {
        return firstName;
    }
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
    public User(long id, String username, String firstName) {
        super();
        this.id = id;
        this.username = username;
        this.firstName = firstName;
    }
    public User() {
        super();
    }
}
