/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.course.back.services;

import com.course.back.model.Users;
import com.course.back.repositories.UsersRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

/**
 *
 * @author Admin
 */
@Service
public class UsersService {
  private final UsersRepository usersRepository;

  @Autowired
  public UsersService(UsersRepository usersRepository) {
    this.usersRepository = usersRepository;
  }  
  
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public List<Users> getAll() {
    return usersRepository.findAll();
  }
  
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public List<Users> editUser(int id) {
    Users user = usersRepository.findById(Long.valueOf(id)).stream().toList().get(0);
    return usersRepository.findAll();
  }
  
  public Users getUserByEmail(String email) {
    return usersRepository.findByEmail(email).stream().toList().get(0);
  }
  
  public Users getUserById(int id) {
    return usersRepository.findById(Long.valueOf(id)).stream().toList().get(0);
  }
  
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public void saveUser(Users user) {
    usersRepository.save(user);
  }
  
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public void deleteUser(int id) {
    Users user = usersRepository.findById(Long.valueOf(id)).stream().toList().get(0);
    usersRepository.delete(user);
  }
}
