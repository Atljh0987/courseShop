/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.course.back.services;

import com.course.back.model.Cart;
import com.course.back.repositories.CartRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Admin
 */
@Service
public class CartService {
  @Autowired
  CartRepository cartRepository;
  
  public Cart getById(int id) {
    return cartRepository.getReferenceById(Long.valueOf(id));
  }
  
  public List<Cart> getByUserId(int id) {
    return cartRepository.findByUserId(Long.valueOf(id));
  }
  
  public void add(Cart cart) {
    cartRepository.save(cart);
  }
  
  public void delete(Cart cart) {
    cartRepository.delete(cart);
  }
}
