/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.course.back.services;

import com.course.back.model.Categories;
import com.course.back.model.SubCategories;
import com.course.back.repositories.CategoriesRepository;
import com.course.back.repositories.SubCategoriesRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Admin
 */
@Service
public class CategoriesService {
  private final CategoriesRepository categoriesRepository;
  private final SubCategoriesRepository subCategoriesRepository;

  @Autowired
  public CategoriesService(CategoriesRepository categoriesRepository, SubCategoriesRepository subCategoriesRepository) {
    this.categoriesRepository = categoriesRepository;
    this.subCategoriesRepository = subCategoriesRepository;
  }
  
  public Categories getById(long id) {
    return categoriesRepository.getReferenceById(id);
  }  
  
  public List<Categories> getAll() {
    return categoriesRepository.findAll();
  }
}
