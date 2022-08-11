/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.course.back.services;

import com.course.back.model.Test;
import com.course.back.repositories.TestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
/**
 *
 * @author Admin
 */
@Service
public class TestService {
  private final TestRepository testRepository;

  @Autowired
  public TestService(TestRepository testRepository) {
    this.testRepository = testRepository;
  }
  
  public void save(Test test) {
    testRepository.save(test);
  }
  
  public long getCount() {
    return testRepository.count();
  }
  
  public Test getById(int id) {
    return testRepository.getReferenceById(id);
  }
}
