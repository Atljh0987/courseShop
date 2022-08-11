package com.course.back.model;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Table;
import javax.persistence.Column;
import javax.persistence.GenerationType;
import lombok.Data;
import org.springframework.data.annotation.Id;

/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

/**
 *
 * @author Admin
 */
@Entity
@Table(name="test")
@Data
public class Test {
  @Id
  @Column(name = "id")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @javax.persistence.Id
  private int id;
  
  @Column(name = "name")
  private String name;
  
}
