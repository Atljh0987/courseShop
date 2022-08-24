/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.course.back.repositories;

import com.course.back.model.Users;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Admin
 */
public interface UsersRepository extends JpaRepository<Users, Long> {
  Optional<Users> findByUsername(String username);
  Users findByEmail(String email);
}
