/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.course.back.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import lombok.Data;

/**
 *
 * @author Admin
 */
@Entity
@Data
public class Categories {  
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;
  
  private String name;
  
  @JsonIgnore
  @OneToMany(cascade = CascadeType.ALL, mappedBy = "category")
  private List<SubCategories> subCategories;
}
