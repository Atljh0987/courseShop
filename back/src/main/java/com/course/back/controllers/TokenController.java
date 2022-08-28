/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.course.back.controllers;

import com.course.back.model.Users;
import com.course.back.services.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Admin
 */
@RestController
@RequestMapping("/token")
public class TokenController {
  @Autowired
  TokenService tokenService;  
  
  @GetMapping("/{token}")
  public String hasToken(@PathVariable String token) {
    return tokenService.hasToken(token);
  }
  
  @PutMapping("/{token}")
  public void insertToken(@PathVariable String token, Users user) {
    tokenService.insert(token, user);
  }
}
