/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.course.back.pojo;

import com.sun.istack.NotNull;
import java.util.List;
import lombok.Data;
import lombok.RequiredArgsConstructor;
/**
 *
 * @author Admin
 */
@Data
@RequiredArgsConstructor
public class MenuGroups {
//  private final String type = "group";
  private final Boolean selectable = true;
  @NotNull
  private String label;
  @NotNull
  private List<MenuSubgroups> children;
}
