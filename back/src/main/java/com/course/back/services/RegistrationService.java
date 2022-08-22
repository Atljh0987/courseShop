/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.course.back.services;

import com.course.back.model.Users;
import com.course.back.repositories.UsersRepository;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Admin
 */
@Service
public class RegistrationService {
  
  private final UsersRepository usersRepository;

  @Autowired
  public RegistrationService(UsersRepository usersRepository) {
    this.usersRepository = usersRepository;
  }
  
  public int countUsersByName(String name) {
    return usersRepository.findByUsername(name).stream().toList().size();
  }
  
  public int countUsersByEmail(String email) {
    return usersRepository.findByEmail(email).stream().toList().size();
  }
  
  
  @Transactional
  public void register(Users users) {
    usersRepository.save(users);
  }
}
