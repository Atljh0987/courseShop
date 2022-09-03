/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.course.back.validator;

import com.course.back.model.Users;
import com.course.back.repositories.UsersRepository;
import com.course.back.services.RegistrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

/**
 *
 * @author Admin
 */
@Component
public class EditUserValidator implements Validator {
  
  @Autowired
  UsersRepository usersRepository;
  
  private final RegistrationService registrationService;

  @Autowired
  public EditUserValidator(RegistrationService registrationService) {
    this.registrationService = registrationService;
  }

  @Override
  public boolean supports(Class<?> clazz) {
    return Users.class.equals(clazz);
  }

  @Override
  public void validate(Object target, Errors errors) {
    Users user = (Users)target;
    
    if(usersRepository.findByEmail(user.getEmail()).stream().toList().size() > 1) {
      errors.rejectValue("email", "", "Такой email уже существует");
    }
    
    if(usersRepository.findByUsername(user.getUsername()).stream().toList().size() > 1) {
      errors.rejectValue("username", "", "Такое имя пользователя уже существует");
    }
    
    
  }
  
}
