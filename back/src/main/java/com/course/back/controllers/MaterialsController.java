/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.course.back.controllers;

import com.course.back.model.Categories;
import com.course.back.model.Materials;
import com.course.back.services.CategoriesService;
import com.course.back.services.MaterialsService;
import java.util.List;
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
@RequestMapping("/materials")
public class MaterialsController {
//  @Autowired
//  MaterialsToSiteService materialsToSiteService;
  @Autowired
  CategoriesService categoriesService;
  
  @Autowired
  MaterialsService materialsService;
  
  @GetMapping("/groupsSubgroups")
  public List<Categories> getAllGroupsSubgrouops() {
    return categoriesService.getAll();
  }
  
  @GetMapping("/all")
  public List<Materials> getAllMaterials() {
    return materialsService.getAll();
  }
  
  @GetMapping("/category/{id}")
  public List<Materials> getByCategory(@PathVariable Long id) {
    return materialsService.getByCategory(id);
  }
  
  @GetMapping("/subcategory/{id}")
  public List<Materials> getBySubCategory(@PathVariable Long id) {
    return materialsService.getBySubCategory(id);
  }
}
