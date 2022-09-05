/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.course.back.validator;

import com.course.back.model.Categories;
import com.course.back.model.SubCategories;
import com.course.back.model.Users;
import com.course.back.repositories.CategoriesRepository;
import com.course.back.repositories.SubCategoriesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

/**
 *
 * @author Admin
 */
@Component
public class SubCategoryValidator implements Validator {
  @Autowired
  SubCategoriesRepository subCategoriesRepository;

  @Override
  public boolean supports(Class<?> clazz) {
    return Users.class.equals(clazz);
  }

  @Override
  public void validate(Object target, Errors errors) {
    SubCategories subCategory = (SubCategories)target;
    var werwer = subCategoriesRepository.findByNameAndCategoryId(subCategory.getName(), subCategory.getCategory()).stream().toList();
    if(werwer.size() > 0) {
      errors.rejectValue("name", "", "Такая подкатегория в этой категории уже существует.");
    }
  }
}
