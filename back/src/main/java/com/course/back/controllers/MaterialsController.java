/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.course.back.controllers;

import com.course.back.model.Materials;
import com.course.back.services.MaterialsToSiteService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Admin
 */
@RestController
@RequestMapping("/materials")
public class MaterialsController {
  @Autowired
  MaterialsToSiteService materialsToSiteService;
  
  @GetMapping("/all")
  public List<Materials> getAll() {
    return materialsToSiteService.getAll();
  }
}
