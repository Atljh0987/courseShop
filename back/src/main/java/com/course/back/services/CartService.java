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
  
  public int sumCount(int id) {
    return cartRepository.sumCount(Long.valueOf(id));
  }
  
  public Cart getByUserIdAndMaterialId(int userId, int materialId) {
    return cartRepository.findByUserIdAndMaterialId(userId, materialId);
  }
  
  public void count(int id, int count) {
    Cart cart = cartRepository.findById(Long.valueOf(id)).stream().toList().get(0);
    if(cart.getMaterial().getCount() > count) {
      cart.setCount(count);      
    } else {
      cart.setCount(cart.getMaterial().getCount());
    }
    cartRepository.save(cart);
  }
  
  public void add(Cart cart) {
    Cart current = cartRepository.findByUserIdAndMaterialId(cart.getUser().getId(), cart.getMaterial().getId());
    if(current == null) {
      cart.setCount(1);
      cartRepository.save(cart);
    } else {
      if(current.getMaterial().getCount() > current.getCount())
        current.setCount(current.getCount() + 1);
      cartRepository.save(current);
    }
  }
  
  public void delete(Cart cart) {
    cartRepository.delete(cart);
  }
}
