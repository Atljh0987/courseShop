/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.course.back.services;

import com.course.back.model.Materials;
import com.course.back.model.SubCategories;
import com.course.back.repositories.MaterialsRepository;
import com.course.back.repositories.SubCategoriesRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

/**
 *
 * @author Admin
 */
@Service
public class MaterialsService {
  
  private final MaterialsRepository materialsRepository;
  
  @Autowired
  public MaterialsService(MaterialsRepository materialsRepository) {
    this.materialsRepository = materialsRepository;
  }
  
  public List<Materials> getAll() {
    return materialsRepository.findAll();
  }
  
  public List<Materials> getByCategory(Long id) {
    return materialsRepository.findByCategoryId(id);
  }
  
  public List<Materials> getBySubCategory(Long id) {
    return materialsRepository.findBySubCategoryId(id);
  }
  
  @Autowired
  SubCategoriesRepository subCategoriesRepository;
  
  public Materials getById(int id) {
    return materialsRepository.findById(Long.valueOf(id)).stream().toList().get(0);
  }
  
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public void add(Materials material) {
    materialsRepository.save(material);
  }
  
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public void delete(int id) {
    materialsRepository.delete(getById(id));
  }
}
