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
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import lombok.Data;

/**
 *
 * @author Admin
 */
@Entity
@Data
public class OrderDetail {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;  
  
//  @JsonIgnore
  @ManyToOne(cascade=CascadeType.ALL)
  private Materials material;
  
  @JsonIgnore
  @ManyToOne(cascade=CascadeType.ALL)
  private UserOrder userOrder;
  
  private int count;
}
