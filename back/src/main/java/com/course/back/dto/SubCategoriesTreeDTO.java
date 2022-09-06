/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.course.back.dto;

import com.course.back.model.Categories;
import com.course.back.model.Materials;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.List;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
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
public class SubCategoriesTreeDTO {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;
  
  private String name;
  
  @ManyToOne
  private CategoriesDTO category;
  
  @OneToMany(mappedBy = "subCategory")
  private List<MaterialsTreeDTO> materials;
}
