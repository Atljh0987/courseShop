/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.course.back.controllers;

import com.course.back.model.Users;
import com.course.back.services.EmailService;
import com.course.back.services.TokenService;
import com.course.back.services.UsersService;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Admin
 */
@RestController
@RequestMapping("/email")
public class EmailController {
  @Autowired
  EmailService emailService;
  
  @Autowired
  UsersService usersService;
  
  @Autowired
  TokenService tokenService;
  
  @GetMapping(value = "/send/{user-email}")
  public @ResponseBody ResponseEntity sendSimpleEmail(@PathVariable("user-email") String email) {

      try {
          emailService.sendSimpleEmail(email, "Welcome", "This is a welcome email for your!!");
      } catch (MailException mailException) {
        System.out.println(mailException);
          return new ResponseEntity<>("Unable to send email", HttpStatus.INTERNAL_SERVER_ERROR);
      }

      return new ResponseEntity<>("Please check your inbox", HttpStatus.OK);
  }
  
  @PostMapping("/token/{email}")
  public void sendMail(@PathVariable String email) {
    Users user = usersService.getUserByEmail(email);
    String uuid = UUID.randomUUID().toString();
    tokenService.insert(uuid, user);    
    try {
      emailService.sendSimpleEmail(user.getEmail(), "Подтверждение почты", "Ваша ссылка для подтверждения почты: http://localhost:3000/token/" + uuid);
    } catch (MailException mailException) {
      throw mailException;
    }    
  }  
}
