/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.course.back.controllers;

import com.course.back.dto.CategoriesDTO;
import com.course.back.model.Categories;
import com.course.back.services.CategoriesService;
import com.course.back.validator.CategoryValidator;
import com.nimbusds.jose.shaded.json.JSONObject;
import java.util.List;
import java.util.Map;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Admin
 */
@RestController
@RequestMapping("/category")
public class CategoriesController {
  @Autowired
  CategoriesService categoriesService;
  
  @Autowired
  ModelMapper modelMapper;
  
  @Autowired
  CategoryValidator categoryValidator;
  
  @GetMapping("/{id}")
  public String getCategoryById(@PathVariable long id) {
    return categoriesService.getById(id).getName();
  }
  
  @GetMapping("/all")
  public List<CategoriesDTO> getCategoriesAll() {
    return categoriesService.getAll().stream().map(e -> modelMapper.map(e, CategoriesDTO.class)).toList();
  }
  
  @PutMapping("/edit")
  public String editCategory(@ModelAttribute Categories categories,
          BindingResult bindingResult) {    
    
    categoryValidator.validate(categories, bindingResult);
    
    if(bindingResult.hasErrors())
      return new JSONObject(Map.of("successEdit", false, "message", bindingResult.getAllErrors())).toJSONString();
    
    try {
      categoriesService.addCategory(categories);
      return new JSONObject(Map.of("successEdit", true, "message", "Категория успешно отредактирована")).toJSONString();
    } catch(Exception ex) {
      return new JSONObject(Map.of("successEdit", false, "message", ex.getMessage())).toJSONString();
    }
  }
  
  @PutMapping("/add")
  public String addCategory(@ModelAttribute Categories categories,
          BindingResult bindingResult) {    
    
    categoryValidator.validate(categories, bindingResult);
    
    if(bindingResult.hasErrors())
      return new JSONObject(Map.of("successAdd", false, "message", bindingResult.getAllErrors())).toJSONString();
    
    try {
      categoriesService.addCategory(categories);
      return new JSONObject(Map.of("successAdd", true, "message", "Категория успешно добавлена")).toJSONString();
    } catch(Exception ex) {
      return new JSONObject(Map.of("successAdd", false, "message", ex.getMessage())).toJSONString();
    }
  }
  
  @DeleteMapping("/delete")
  public String deleteCategory(@RequestHeader int id) {
    try {
      categoriesService.deleteCategory(id);
      return new JSONObject(Map.of("successDelete", true, "message", "Категория успешно удалена")).toJSONString();
    } catch(Exception ex) {
      return new JSONObject(Map.of("successDelete", false, "message", ex.getMessage())).toJSONString();
    }
  }
}