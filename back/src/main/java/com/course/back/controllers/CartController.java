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
import org.springframework.web.bind.annotation.PathVariable;
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
      Cart c = cartService.getByUserIdAndMaterialId((int)cart.getUser().getId(), (int)cart.getMaterial().getId());
      if(c != null && c.getCount() >= c.getMaterial().getCount()) {
        return new JSONObject(Map.of("success", false, "message", "Вы добавили максимальное количество товара")).toJSONString();        
      } else {
        cartService.add(cart);
        return new JSONObject(Map.of("success", true, "message", "Добавлено успешно")).toJSONString();
      }
    } catch(Exception e) {
      return new JSONObject(Map.of("success", false, "message", e.getMessage())).toJSONString();
    }
  }
  
  @PutMapping("/count/{id}")
  public void count(@PathVariable int id, @RequestParam int count) {
    cartService.count(id, count);
  }
  
  @GetMapping("/count/all/{id}")
  public int countAll(@PathVariable int id) {
    return cartService.sumCount(id);
  }
  
  @DeleteMapping("/delete/{id}")
  public String delete(@PathVariable int id) {
    try {
      cartService.delete(cartService.getById(id));
      return new JSONObject(Map.of("success", true, "message", "Успешно удалено")).toJSONString();
    } catch(Exception e) {
      return new JSONObject(Map.of("success", false, "message", e.getMessage())).toJSONString();
    }
  }
}
