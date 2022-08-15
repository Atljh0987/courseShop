/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.course.back.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.List;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import lombok.AccessLevel;
import lombok.Data;
import lombok.Getter;

/**
 *
 * @author Admin
 */
@Entity
@Data
public class SubCategories {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;
  
  private String name;
  
  @Getter(AccessLevel.NONE)
  @ManyToOne
  private Categories category;
  
  @JsonIgnore
  @OneToMany(mappedBy = "subCategory")
  private List<Materials> materials;

  public String getCategory() {
    return category.getName();
  }
}
