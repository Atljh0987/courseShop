/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.course.back.controllers;

import com.course.back.model.Cart;
import com.course.back.model.UserOrder;
import com.course.back.services.CartService;
import com.course.back.services.UserOrderService;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Admin
 */
@RestController
@RequestMapping("/order")
public class UserOrderController {
  @Autowired
  UserOrderService userOrderService;

  @Autowired
  CartService cartService;
  
  @PostMapping("/create")
  public String createOrder(@RequestParam List<Integer> cart) {
    UserOrder order = new UserOrder();
    int orderId = userOrderService.create(order).intValue();
    List<Cart> carts = new ArrayList<Cart>();    
    for(Integer cartId : cart) {
      carts.add(cartService.getById(cartId));
    }
    
    
    
    return "Ok";
    
  }
}
