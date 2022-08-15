/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.course.back.repositories;

import com.course.back.model.Materials;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Admin
 */
public interface MaterialsRepository extends JpaRepository<Materials, Long> {
  
  List<Materials> findByCategoryId(Long id);
  
  List<Materials> findBySubCategoryId(Long id);
  
}
