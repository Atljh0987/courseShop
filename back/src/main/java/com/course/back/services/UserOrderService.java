/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.course.back.services;

import com.course.back.model.OrderStatus;
import com.course.back.model.UserOrder;
import com.course.back.repositories.UserOrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Admin
 */
@Service
public class UserOrderService {
  
  @Autowired
  UserOrderRepository userOrderRepository;
  
  public Long create(UserOrder order) {
    userOrderRepository.save(order);
    
    return order.getId();
  }
  
  public void changeStatus(int id, OrderStatus orderStatus) {
    UserOrder order = userOrderRepository.findById(Long.valueOf(id)).stream().toList().get(0);
    order.setOrderStatus(orderStatus);
    
    userOrderRepository.save(order);
  }
  
}
