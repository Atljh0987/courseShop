/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.course.back.controllers;

import com.course.back.model.Categories;
import com.course.back.model.Materials;
import com.course.back.services.CategoriesService;
import com.course.back.services.MaterialsService;
import com.course.back.services.SubCategoriesService;
import com.nimbusds.jose.shaded.json.JSONObject;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Admin
 */
@RestController
@RequestMapping("/material")
public class MaterialsController {
//  @Autowired
//  MaterialsToSiteService materialsToSiteService;
  @Autowired
  CategoriesService categoriesService;

  @Autowired
  SubCategoriesService subCategoriesService;
  
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
  
  @PutMapping("/edit")
  public String edit(@ModelAttribute Materials materials, @RequestParam int category, @RequestParam int subcategory, BindingResult bindingResult) {
    materials.addCaterory(categoriesService.getById(category));
    materials.addSubCategory(subCategoriesService.getById(subcategory));
    try {
      materialsService.add(materials);
      return new JSONObject(Map.of("successEdit", true, "message", "Товар успешно отредактирован")).toJSONString();
    } catch(Exception ex) {
      return new JSONObject(Map.of("successEdit", false, "message", ex.getMessage())).toJSONString();
    }
  }
  
  @PutMapping("/add")
  public String save(@ModelAttribute Materials materials, @RequestParam int category, @RequestParam int subcategory, BindingResult bindingResult) {
    materials.addCaterory(categoriesService.getById(category));
    materials.addSubCategory(subCategoriesService.getById(subcategory));
    try {
      materialsService.add(materials);
      return new JSONObject(Map.of("successSave", true, "message", "Товар успешно добавлен")).toJSONString();
    } catch(Exception ex) {
      return new JSONObject(Map.of("successSave", false, "message", ex.getMessage())).toJSONString();
    }
  }
  
  @DeleteMapping("/delete")
  public String delete(@RequestHeader int id) {
    try {
      materialsService.delete(id);
      return new JSONObject(Map.of("successDelete", true, "message", "Товар успешно удален")).toJSONString();
    } catch(Exception ex) {
      return new JSONObject(Map.of("successDelete", false, "message", ex.getMessage())).toJSONString();
    }
  }
}
