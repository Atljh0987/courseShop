/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.course.back.controllers;

import com.course.back.model.Cart;
import com.course.back.model.OrderDetail;
import com.course.back.model.UserOrder;
import com.course.back.services.CartService;
import com.course.back.services.OrderDetailService;
import com.course.back.services.OrderStatusService;
import com.course.back.services.UserOrderService;
import com.course.back.services.UsersService;
import com.nimbusds.jose.shaded.json.JSONObject;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Admin
 */
@RestController
@RequestMapping("/orders")
public class UserOrderController {
  @Autowired
  UserOrderService userOrderService;

  @Autowired
  CartService cartService;
  
  @Autowired
  OrderStatusService orderStatusService;
  
  @Autowired
  UsersService usersService;
  
  @Autowired
  OrderDetailService orderDetailService;
  
  @GetMapping
  public String access() {
    return new JSONObject(Map.of("hasAccess", true)).toJSONString();
  }
  
  @PostMapping("/get/{id}")
  public Optional<UserOrder> getById(@PathVariable int id) {
    return userOrderService.findByUserId(Long.valueOf(id));
  }
  
  @PostMapping("/create")
  public String createOrder(@RequestParam int userId) {
    
    try {
      UserOrder order = new UserOrder();
      order.setOrderStatus(orderStatusService.getOrderStatusByName("Создан"));
      order.setUser(usersService.getUserById(userId));    

      List<Cart> cart = cartService.getByUserId(userId);

      List<OrderDetail> orderDetails = cart.stream().map(e -> {
        OrderDetail orderDetail = new OrderDetail();
        orderDetail.setMaterial(e.getMaterial());
        orderDetail.setUserOrder(order);
        orderDetail.setCount(e.getCount());
        return orderDetail;
      }).toList();
      
      orderDetailService.addAll(orderDetails);
      cartService.deleteAll(cart);
      
      return new JSONObject(Map.of("success", true, "message", "Заказ успешно оформлен")).toJSONString();
    } catch(Exception err) {
      return new JSONObject(Map.of("success", false, "message", err.getMessage())).toJSONString();
    }
  }
}
