/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.course.back.services;

import com.course.back.model.SubCategories;
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
public class SubCategoriesService {
  @Autowired
  SubCategoriesRepository subCategoriesRepository;
  
  public SubCategories getById(int id) {
    return subCategoriesRepository.findById(Long.valueOf(id)).stream().toList().get(0);
  }
  
  public List<SubCategories> getAll() {
    return subCategoriesRepository.findAll();
  }
  
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public void save(SubCategories subCategory) {
    subCategoriesRepository.save(subCategory);
  }
  
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public void delete(int id) {
    subCategoriesRepository.delete(getById(id));
  }
}
