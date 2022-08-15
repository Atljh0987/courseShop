/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.course.back.services;

import com.course.back.model.Materials;
import com.course.back.repositories.MaterialsRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
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
}
