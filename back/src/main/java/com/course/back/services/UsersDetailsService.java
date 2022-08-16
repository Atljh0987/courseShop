/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.course.back.services;

import com.course.back.model.Users;
import com.course.back.repositories.UsersRepository;
import com.course.back.security.UsersDetails;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 *
 * @author Admin
 */
@Service
public class UsersDetailsService implements UserDetailsService {
  private final UsersRepository usersRepository;

  @Autowired
  public UsersDetailsService(UsersRepository usersRepository) {
    this.usersRepository = usersRepository;
  }  
  
  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    Optional<Users> user = usersRepository.findByUsername(username);
    
    if(user.isEmpty())
      throw new UsernameNotFoundException("User not found!");
    
    return new UsersDetails(user.get());
  }
  
  
}
