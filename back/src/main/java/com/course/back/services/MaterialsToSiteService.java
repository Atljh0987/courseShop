/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.course.back.services;

import com.course.back.model.Categories;
import com.course.back.model.Materials;
import com.course.back.pojo.MenuGroups;
import com.course.back.pojo.MenuSubgroups;
import com.course.back.repositories.CategoriesRepository;
import com.course.back.repositories.MaterialsRepository;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Service;

/**
 *
 * @author Admin
 */
@Service
public class MaterialsToSiteService {
  private final MaterialsRepository materialsRepository;
  private final CategoriesRepository categoriesRepository;

  public MaterialsToSiteService(MaterialsRepository materialsRepository, CategoriesRepository categoriesRepository) {
    this.materialsRepository = materialsRepository;
    this.categoriesRepository = categoriesRepository;
  }
  
  public List<MenuGroups> getAllForMenu() {
    List<Categories> categorises = categoriesRepository.findAll();
    List<MenuGroups> resultMenuGroups = new ArrayList<>();
    
    for(Categories e : categorises) {
      List<MenuSubgroups> subgroups = 
              e.getSubCategories().stream().map(e2 -> new MenuSubgroups(e2.getName(), "subgroup " + Long.toString(e2.getId()))).toList();
      resultMenuGroups.add(new MenuGroups(e.getName(), subgroups));      
    }
    
    return resultMenuGroups;
  }
  
  public List<Materials> getAllMaterials() {
    return materialsRepository.findAll();
  }
}
