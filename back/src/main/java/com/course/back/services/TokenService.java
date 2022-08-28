/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.course.back.services;

import com.course.back.model.Token;
import com.course.back.model.Users;
import com.course.back.repositories.TokenRepository;
import com.course.back.repositories.UsersRepository;
import com.nimbusds.jose.shaded.json.JSONObject;
import java.time.Duration;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Admin
 */
@Service
public class TokenService {
  @Autowired
  TokenRepository tokenRepository;
  
  @Autowired
  UsersRepository usersRepository;
  
  public void insert(String token, Users user) {
    Token tk = new Token();
    tk.setToken(token);
    tk.setUserId(user.getId());
    tokenRepository.save(tk);
  }
  
  public String hasToken(String token) {
    Token tk = tokenRepository.findByToken(token);
    
    if(tk != null) {
      if(Duration.between(LocalDateTime.now(), LocalDateTime.ofInstant(tk.getCreated(), ZoneOffset.UTC)).toDays() < Long.valueOf(1)) {
        var user = usersRepository.findById(tk.getUserId()).stream().toList().get(0);
        user.setConfirmed(1);
        usersRepository.save(user);
        return new JSONObject(Map.of("successToken", true, "message", "Почта успешно подтверждена")).toJSONString();
      } else {
        return new JSONObject(Map.of("successToken", false, "message", "Срок действия ссылки истек, запросите новую")).toJSONString();
      }     
    } else {
      return new JSONObject(Map.of("successToken", false, "message", "Неверная ссылка. Запросите ссылку повторно.")).toJSONString();
    }
  } 
}
