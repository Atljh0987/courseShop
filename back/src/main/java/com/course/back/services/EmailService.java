/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.course.back.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

/**
 *
 * @author Admin
 */
@Service
public class EmailService {

 @Autowired
 public JavaMailSender emailSender;
 
 @Value("${spring.mail.self.username}")
  private String sendUser;

  public void sendSimpleEmail(String toAddress, String subject, String message) {
   
  SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
  simpleMailMessage.setFrom(sendUser);
  simpleMailMessage.setTo(toAddress);
  simpleMailMessage.setSubject(subject);
  simpleMailMessage.setText(message);
  emailSender.send(simpleMailMessage);
 }
}
