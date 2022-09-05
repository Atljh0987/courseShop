/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.course.back.validator;

import com.course.back.model.Users;
import com.course.back.services.RegistrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import com.course.back.model.Materials;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import com.course.back.model.Materials;
import com.course.back.services.CategoriesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

/**
 *
 * @author Admin
 */
@Component
public class MaterialsValidator implements Validator {
  
  @Autowired
  CategoriesService categoriesService;

  @Override
  public boolean supports(Class<?> clazz) {
    return Materials.class.equals(clazz);
  }

  @Override
  public void validate(Object target, Errors errors) {
    Materials material = (Materials)target;    
    
    if(categoriesService.containsSubcategory(material.getCategory(), material.getSubCategory())) {
      errors.rejectValue("category", "", "В этой категории такой подкатегории нет");
    }
    
  }
  
}
