/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.course.back.services;

import com.course.back.model.Photo;
import com.course.back.repositories.PhotoRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Admin
 */
@Service
public class PhotoService {
  
  @Autowired
  PhotoRepository photoRepository;
  
  public void savePhoto(Photo photo) {
    photoRepository.save(photo);
  }
  
  public List<Photo> getAllPhotos() {
    return photoRepository.findAll();
  }
  
  public List<Photo> getFreePhotos() {
    return photoRepository.findByMaterialIsNull();
  }
  
  public Photo getById(int id) {
    return photoRepository.findById(id).stream().toList().get(0);
  }
  
  public void delete(Photo photo) {
    photoRepository.delete(photo);
  }
}
