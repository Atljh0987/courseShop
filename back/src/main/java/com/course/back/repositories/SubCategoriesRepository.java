/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.course.back.repositories;

import com.course.back.model.SubCategories;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Admin
 */
public interface SubCategoriesRepository extends JpaRepository<SubCategories, Long> {
  Optional<SubCategories> findByCategoryId(Long id);  
  Optional<SubCategories> findByNameAndCategoryId(String name, Long id);
}