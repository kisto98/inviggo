package com.inviggo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {
    @GetMapping("/test-csrf")
    public String testCsrf() {
        return "CSRF is disabled - this should work without token";
    }
}
