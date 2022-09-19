/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.course.back.services;

import com.course.back.model.OrderStatus;
import com.course.back.repositories.OrderStatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Admin
 */
@Service
public class OrderStatusService {
  
  @Autowired
  OrderStatusRepository orderStatusRepository;
  
  public OrderStatus getOrderStatusByName(String name) {
    return orderStatusRepository.findByName(name);
  }
}
