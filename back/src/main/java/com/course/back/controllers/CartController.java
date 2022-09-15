/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.course.back.controllers;

import com.course.back.model.Cart;
import com.course.back.services.CartService;
import com.course.back.services.UsersService;
import com.nimbusds.jose.shaded.json.JSONObject;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Admin
 */
@RestController
@RequestMapping("/cart")
public class CartController {
  @Autowired
  CartService cartService;
  
  @Autowired
  UsersService usersService;
  
  @GetMapping
  public String access() {
    return new JSONObject(Map.of("hasAccess", true)).toJSONString();
  }
  
  @PostMapping("/user")
  public List<Cart> getCartByUserID(@RequestHeader int userId) {    
    return cartService.getByUserId(userId);
  }
  
  @PutMapping("/add")
  public String add(@ModelAttribute Cart cart) {
    try {
      cartService.add(cart);
      return new JSONObject(Map.of("success", true, "message", "Добавлено успешно")).toJSONString();
    } catch(Exception e) {
      return new JSONObject(Map.of("success", false, "message", e.getMessage())).toJSONString();
    }
  }
  
  @DeleteMapping("/delete/{id}")
  public String delete(@RequestParam int id) {
    try {
      cartService.add(cartService.getById(id));
      return new JSONObject(Map.of("success", true, "message", "Успешно удалено")).toJSONString();
    } catch(Exception e) {
      return new JSONObject(Map.of("success", false, "message", e.getMessage())).toJSONString();
    }
  }
}
