/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.course.back.pojo;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;

/**
 *
 * @author Admin
 */
@Data
@AllArgsConstructor(access = AccessLevel.PUBLIC)
public class MenuSubgroups {
  private String label;
  private String key;
}
