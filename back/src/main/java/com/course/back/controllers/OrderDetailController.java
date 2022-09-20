/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.course.back.controllers;

import com.course.back.model.OrderDetail;
import com.course.back.services.OrderDetailService;
import com.nimbusds.jose.shaded.json.JSONObject;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Admin
 */
@RestController
@RequestMapping("/orderdetail")
public class OrderDetailController {
  @Autowired
  OrderDetailService orderDetailService;
  
  @GetMapping
  public String access() {
    return new JSONObject(Map.of("hasAccess", true)).toJSONString();
  }
  
  @GetMapping("/{id}")
  public List<OrderDetail> getByOrderId(@PathVariable int id) {
    return orderDetailService.getByOrderId(id);
  }
}
