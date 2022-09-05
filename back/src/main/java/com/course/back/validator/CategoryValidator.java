/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.course.back.validator;

import com.course.back.model.Categories;
import com.course.back.model.Users;
import com.course.back.repositories.CategoriesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

/**
 *
 * @author Admin
 */
@Component
public class CategoryValidator implements Validator {
  @Autowired
  CategoriesRepository categoroiesRepository;

  @Override
  public boolean supports(Class<?> clazz) {
    return Users.class.equals(clazz);
  }

  @Override
  public void validate(Object target, Errors errors) {
    Categories category = (Categories)target;
    var werwer = categoroiesRepository.findByName(category.getName()).stream().toList();
    if(werwer.size() > 0) {
      errors.rejectValue("name", "", "Такая категория уже существует.");
    }
  }
}
