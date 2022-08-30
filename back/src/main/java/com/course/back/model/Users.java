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
public class Users { 
  
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;
  
  private String username;
  
  private String email;
  
  private String password;
  
  @Getter(AccessLevel.NONE)
  @Setter(AccessLevel.NONE)
  @ManyToOne
  private Roles role;

  public void addRole(Roles role) {
    this.role = role;
  }

  public int getRole() {
    return role.getId();
  }
  
  public String getRoleName() {
    return role.getName();
  }
  
  private int confirmed;
}
