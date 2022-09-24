/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.course.back.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.List;
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
public class OrderStatus {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;
  
  private String name;    
  
  @JsonIgnore
  @OneToMany(mappedBy = "orderStatus")
  private List<UserOrder> order;
}
