/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.course.back.repositories;

import com.course.back.model.Cart;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

/**
 *
 * @author Admin
 */
public interface CartRepository extends JpaRepository<Cart, Long> {
  List<Cart> findByUserId(long id);
  
  Cart findByUserIdAndMaterialId(long userId, long materialId);
  
  @Query("select coalesce(sum(c.count), 0) from Cart c join Users u on c.user = u.id where u.id = ?1")
  int sumCount(long id);
}
