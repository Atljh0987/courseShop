/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.course.back.controllers;

import com.course.back.dto.CategoriesDTO;
import com.course.back.services.CategoriesService;
import java.util.List;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
  
  @GetMapping("/{id}")
  public String getCategoryById(@PathVariable long id) {
    return categoriesService.getById(id).getName();
  }
  
  @GetMapping("/all")
  public List<CategoriesDTO> getCategoriesAll() {
    return categoriesService.getAll().stream().map(e -> modelMapper.map(e, CategoriesDTO.class)).toList();
  }
}
