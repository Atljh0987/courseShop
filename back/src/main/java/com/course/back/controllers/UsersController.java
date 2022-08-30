/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.course.back.controllers;

import com.course.back.model.Users;
import com.course.back.services.RolesService;
import com.course.back.services.UsersService;
import com.nimbusds.jose.shaded.json.JSONObject;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
    
  @GetMapping("/all")
  public List<Users> getAll() {
    return usersService.getAll();
  }
  
  @PutMapping("/edit")
  public String editUser(
          @RequestParam String username,
          @RequestParam int id,
          @RequestParam String email,
          @RequestParam int role,
          @RequestParam int confirmed          
  ) {
    Users user = usersService.getUserById(id);
    user.setEmail(email);
    user.setConfirmed(confirmed);
    user.setUsername(username);
    user.addRole(rolesService.getRoleById(role));
    
    try {
      usersService.saveUser(user);
      return new JSONObject(Map.of("successEdit", true, "message", "Пользователь успешно отредактирован")).toJSONString();
    } catch(Exception ex) {
      return new JSONObject(Map.of("successEdit", false, "message", ex.getMessage())).toJSONString();
    }
   
  }
}
