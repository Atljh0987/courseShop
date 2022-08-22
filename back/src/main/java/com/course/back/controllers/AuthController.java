/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.course.back.controllers;

import com.course.back.model.Users;
import com.course.back.security.UsersDetails;
import com.course.back.services.RegistrationService;
import com.course.back.services.RolesService;
import com.course.back.validator.UsersValidator;
import java.util.Map;
import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Admin
 */
@RestController
@RequestMapping("/auth")
public class AuthController {  
  
  private PasswordEncoder passwordEncoder;
  private final RegistrationService registrationService;
  private final RolesService rolesService;
  private final UsersValidator usersValidator;

  @Autowired
  public AuthController(PasswordEncoder passwordEncoder, RegistrationService registrationService, RolesService rolesService, UsersValidator usersValidator) {
    this.passwordEncoder = passwordEncoder;
    this.registrationService = registrationService;
    this.rolesService = rolesService;
    this.usersValidator = usersValidator;
  }
  
  @GetMapping("/check")
  public String checkAuth(Authentication authentication) {
    if(authentication != null) {
      UsersDetails u = (UsersDetails)authentication.getPrincipal();
      return new JSONObject(Map.of("isAuth", true, "username", u.getUsername(), "role", u.getAuthorities().iterator().next().getAuthority())).toJSONString();
    } else {
      return new JSONObject(Map.of("isAuth", false,  "username", "", "role", "")).toJSONString();
    }
  }
  
  @PostMapping("/registration")
  public String performRegistration(@ModelAttribute Users user, @RequestParam String role, @RequestParam String password, BindingResult bindingResult) {
    user.setPassword(passwordEncoder.encode(password));
    user.addRole(rolesService.getRoleByName(role));
    
    usersValidator.validate(user, bindingResult);
    
    if(bindingResult.hasErrors())
      return new JSONObject(Map.of("successRegistration", false, "errors", bindingResult.getAllErrors())).toJSONString();
    
    
    registrationService.register(user);
    
    return new JSONObject(Map.of("successRegistration", true)).toJSONString();
  }
  
}
