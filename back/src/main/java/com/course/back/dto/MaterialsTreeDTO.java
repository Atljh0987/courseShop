/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.course.back.dto;

import com.course.back.model.Categories;
import com.course.back.model.SubCategories;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 *
 * @author Admin
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MaterialsTreeDTO {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;
  
  @ManyToOne
  private CategoriesTreeDTO category;
  
  @ManyToOne
  private SubCategoriesTreeDTO subCategory;

//  public Long getCategory() {
//    return category.getId();
//  }
//
//  public Long getSubCategory() {
//    return subCategory.getId();
//  }
//  
//  public void addCaterory(Categories category) {
//    this.category = category;
//  }
//  
//  public void addSubCategory(SubCategories subCategory) {
//    this.subCategory = subCategory;
//  }
  
  private String name;
  
  private String description;
  
  private int price;
  
  private int count;  
}
