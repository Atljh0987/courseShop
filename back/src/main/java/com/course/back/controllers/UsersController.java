/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.course.back.controllers;

import com.course.back.model.Users;
import com.course.back.services.RegistrationService;
import com.course.back.services.RolesService;
import com.course.back.services.UsersService;
import com.course.back.validator.EditUserValidator;
import com.course.back.validator.UsersValidator;
import com.nimbusds.jose.shaded.json.JSONObject;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Admin
 */
@RestController
@RequestMapping("/users")
public class UsersController {  
  @Autowired
  UsersService usersService;  
  
  @Autowired
  RolesService rolesService;
  
  @Autowired
  EditUserValidator editUserValidator;
  
  @Autowired
  UsersValidator usersValidator;
  
  @Autowired
  RegistrationService registrationService;
  
  @Autowired
  PasswordEncoder passwordEncoder;
    
  @GetMapping("/all")
  public List<Users> getAll() {
    return usersService.getAll();
  }
  
  @PutMapping("/edit")
  public String editUser(
          @ModelAttribute Users user, 
          @RequestParam int role,
          BindingResult bindingResult
  ) {
    user.addRole(rolesService.getRoleById(role));
    editUserValidator.validate(user, bindingResult);
    
    if(bindingResult.hasErrors())
      return new net.minidev.json.JSONObject(Map.of("successEdit", false, "message", bindingResult.getAllErrors())).toJSONString();
    
    try {
      usersService.saveUser(user);
      return new JSONObject(Map.of("successEdit", true, "message", "Пользователь успешно отредактирован")).toJSONString();
    } catch(Exception ex) {
      return new JSONObject(Map.of("successEdit", false, "message", ex.getMessage())).toJSONString();
    }
  }
  
  @PutMapping("/add")
  public String addUser(@ModelAttribute Users user, 
          @RequestParam String role,
          BindingResult bindingResult
  ) {
    user.setPassword(passwordEncoder.encode("Welcome"));
    user.addRole(rolesService.getRoleByName(role));
    
    usersValidator.validate(user, bindingResult);
    
    if(bindingResult.hasErrors())
      return new net.minidev.json.JSONObject(Map.of("successRegistration", false, "message", bindingResult.getAllErrors())).toJSONString();
    
    try {
      usersService.saveUser(user);      
      return new net.minidev.json.JSONObject(Map.of("successRegistration", true, "message", "Пользователь успешно зарегистрирован")).toJSONString();
    } catch(Exception e) {
      return new net.minidev.json.JSONObject(Map.of("successRegistration", false, "message", e.getMessage())).toJSONString();
    }
  }
  
  @DeleteMapping("/delete")
  public String deleteUser(@RequestHeader int id) {
    try {
      usersService.deleteUser(id);
      return new net.minidev.json.JSONObject(Map.of("successDelete", true, "message", "Пользователь успешно удален")).toJSONString();
    } catch(Exception e) {
      return new net.minidev.json.JSONObject(Map.of("successDelete", false, "message", e.getMessage())).toJSONString();
    }
  }
}
