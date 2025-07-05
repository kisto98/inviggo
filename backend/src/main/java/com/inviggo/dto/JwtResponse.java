package com.inviggo.dto;

public class JwtResponse {
    private String token;
    private String type = "Bearer";
    private Long id;
    private String username;
    private String phone;

    public JwtResponse(String token, Long id, String username, String phone) {
        this.token = token;
        this.id = id;
        this.username = username;
        this.phone = phone;
    }

    // Getters
    public String getToken() {
        return token;
    }

    public String getType() {
        return type;
    }

    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getPhone() {
        return phone;
    }
}