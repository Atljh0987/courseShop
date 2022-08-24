/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.course.back.services;

import com.course.back.model.Users;
import com.course.back.repositories.UsersRepository;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 *
 * @author Admin
 */
@Service
public class RegistrationService {
  
  private final UsersRepository usersRepository;
  
  @Autowired
  PasswordEncoder passwordEncoder;

  @Autowired
  public RegistrationService(UsersRepository usersRepository) {
    this.usersRepository = usersRepository;
  }
  
  public int countUsersByName(String name) {
    return usersRepository.findByUsername(name).stream().toList().size();
  }
  
  public int countUsersByEmail(String email) {
    Users user = usersRepository.findByEmail(email);
    if(user != null)
      return 1;
    else
      return 0;
  }
  
  
  @Transactional
  public void register(Users users) {
    usersRepository.save(users);
  }
  
  @Transactional
  public void changePassword(String password, Users user) {
    user.setPassword(passwordEncoder.encode(password));
    usersRepository.save(user);
  }
}
