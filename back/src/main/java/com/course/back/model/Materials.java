/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.course.back.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

/**
 *
 * @author Admin
 */
@Entity
@Data
public class Materials {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;
  
  @Getter(AccessLevel.NONE)
  @Setter(AccessLevel.NONE)
  @ManyToOne
  private Categories category;
  
  @Getter(AccessLevel.NONE)
  @Setter(AccessLevel.NONE)
  @ManyToOne
  private SubCategories subCategory;

  public Long getCategory() {
    return category.getId();
  }

  public Long getSubCategory() {
    return subCategory.getId();
  }
  
  public void addCaterory(Categories category) {
    this.category = category;
  }
  
  public void addSubCategory(SubCategories subCategory) {
    this.subCategory = subCategory;
  }
  
  private String name;
  
  private String description;
  
  private int price;
  
  private int count;  
}