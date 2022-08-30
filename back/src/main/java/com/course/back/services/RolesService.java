/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.course.back.services;

import com.course.back.model.Roles;
import com.course.back.repositories.RolesRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

/**
 *
 * @author Admin
 */
@Service
public class RolesService {
  @Autowired
  RolesRepository rolesRepository;
  
  public Roles getRoleByName(String name) {
    return rolesRepository.findByName(name);
  }
  
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public List<Roles> getAll() {
    return rolesRepository.findAll();
  }
  
  public Roles getRoleById(int id) {
    return rolesRepository.findById(id).stream().toList().get(0);
  }
}
