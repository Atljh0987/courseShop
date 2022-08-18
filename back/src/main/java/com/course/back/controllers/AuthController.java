/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.course.back.controllers;

import com.course.back.security.UsersDetails;
import java.util.Map;
import net.minidev.json.JSONObject;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Admin
 */
@RestController
@RequestMapping("/auth")
public class AuthController {
  
  @GetMapping("/check")
  public String checkAuth(Authentication authentication) {
    if(authentication != null) {
      UsersDetails u = (UsersDetails)authentication.getPrincipal();
      return new JSONObject(Map.of("isAuth", true, "username", u.getUsername(), "role", u.getAuthorities().iterator().next().getAuthority())).toJSONString();
    } else {
      return new JSONObject(Map.of("isAuth", false,  "username", "", "role", "")).toJSONString();
    }
  }
  
}
