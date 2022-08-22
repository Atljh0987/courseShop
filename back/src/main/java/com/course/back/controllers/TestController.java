/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.course.back.controllers;

import com.course.back.model.Roles;
import com.course.back.security.UsersDetails;
import com.course.back.services.RolesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Admin
 */
@RestController
@RequestMapping("/test")
public class TestController {
  @Autowired
  RolesService rolesService;
    
//  @GetMapping
//  public Roles test(String name) {
//    return rolesService.getRoleByName(name);
//  }
  
  @GetMapping("/auth")
  public String auth(Authentication authentication) {
    UsersDetails u = (UsersDetails)authentication.getPrincipal();
//    User u = (User) authentication.getPrincipal();
    return u.getAuthorities().iterator().next().getAuthority();
  }
  
  @GetMapping("/login")
  public void login(Authentication authentication) {
    System.out.println("123");
  }
}
