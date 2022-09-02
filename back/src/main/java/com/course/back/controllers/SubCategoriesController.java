/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.course.back.controllers;

import com.course.back.model.Categories;
import com.course.back.model.SubCategories;
import com.course.back.services.CategoriesService;
import com.course.back.services.SubCategoriesService;
import com.nimbusds.jose.shaded.json.JSONObject;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
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
@RequestMapping("/subcategory")
public class SubCategoriesController {
  @Autowired
  SubCategoriesService subCategoriesService;
          
  @Autowired
  CategoriesService categoriesService;
  
  @GetMapping("/all")
  public List<SubCategories> getAll() {
    return subCategoriesService.getAll();
  }
  
  @PutMapping("/edit")
  public String edit(@ModelAttribute SubCategories subCategories, @RequestHeader int category, BindingResult bindingResult) {
    Categories catetory = categoriesService.getById(category);
    subCategories.addCategory(catetory);
    try {
      subCategoriesService.save(subCategories);
      return new JSONObject(Map.of("successEdit", true, "message", "Категория успешно отредактирована")).toJSONString();
    } catch(Exception ex) {
      return new JSONObject(Map.of("successEdit", false, "message", ex.getMessage())).toJSONString();
    }
  }
  
  @PutMapping("/add")
  public String save(@ModelAttribute SubCategories subCategories, @RequestParam int category, BindingResult bindingResult) {
    Categories catetory = categoriesService.getById(category);
    subCategories.addCategory(catetory);
    try {
      subCategoriesService.save(subCategories);
      return new JSONObject(Map.of("successSave", true, "message", "Категория успешно добавлена")).toJSONString();
    } catch(Exception ex) {
      return new JSONObject(Map.of("successSave", false, "message", ex.getMessage())).toJSONString();
    }
  }
  
  @DeleteMapping("/delete")
  public String delete(@RequestHeader int id) {
    try {
      subCategoriesService.delete(id);
      return new JSONObject(Map.of("successDelete", true, "message", "Категория успешно удалена")).toJSONString();
    } catch(Exception ex) {
      return new JSONObject(Map.of("successDelete", false, "message", ex.getMessage())).toJSONString();
    }
  }
}
