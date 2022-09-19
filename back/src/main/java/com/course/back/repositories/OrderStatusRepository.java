/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.course.back.repositories;

import com.course.back.model.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Admin
 */
public interface OrderStatusRepository extends JpaRepository<OrderStatus, Long> {
  OrderStatus findByName(String name);
}
