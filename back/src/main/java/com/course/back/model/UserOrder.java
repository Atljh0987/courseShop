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
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import lombok.Data;

/**
 *
 * @author Admin
 */
@Entity
@Data
public class UserOrder {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;
  
  @OneToMany(mappedBy = "userOrder", cascade=CascadeType.ALL)
  private List<OrderDetail> orderDetails;
  
  @JsonIgnore
  @ManyToOne(cascade=CascadeType.ALL)
  private Users user;
  
  @ManyToOne(cascade=CascadeType.ALL)
  private OrderStatus orderStatus;
}
