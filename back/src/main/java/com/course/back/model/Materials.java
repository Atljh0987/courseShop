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
  @ManyToOne
  private Categories category;
  
  @Getter(AccessLevel.NONE)
  @ManyToOne
  private SubCategories subCategory;

  public String getCategory() {
    return category.getName();
  }

  public String getSubCategory() {
    return subCategory.getName();
  }
  
  private String name;
  
  private String description;
  
  private int price;
  
  private int count;  
}