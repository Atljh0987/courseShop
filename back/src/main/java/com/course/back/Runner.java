/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.course.back;

import com.course.back.model.Test;
import com.course.back.services.CategoriesService;
import com.course.back.services.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Admin
 */
@RestController
public class Runner {
  
//  @Autowired
//  TestService testService;
  
//  @Autowired
//  CategoriesService categoriesService;
//  
//  @GetMapping("/category/{id}")
//  public String test(@PathVariable int id) {
//    return categoriesService.getById(id).getName();
//  }
}
