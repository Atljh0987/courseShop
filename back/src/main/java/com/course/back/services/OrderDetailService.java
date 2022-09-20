/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.course.back.services;

import com.course.back.model.OrderDetail;
import com.course.back.repositories.OrderDetailRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Admin
 */
@Service
public class OrderDetailService {
  @Autowired
  OrderDetailRepository orderDetailRepository;
  
  public void addAll(List<OrderDetail> orderDetails) {
    orderDetailRepository.saveAll(orderDetails);
  }
  
  public List<OrderDetail> getByOrderId(int id) {
    return orderDetailRepository.findByUserOrderId(Long.valueOf(id));
  }
}
