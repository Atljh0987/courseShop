/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.course.back.controllers;

import com.course.back.model.Photo;
import com.course.back.services.MaterialsService;
import com.course.back.services.PhotoService;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.List;
import java.util.UUID;
import javax.servlet.ServletContext;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author Admin
 */
@RestController
@RequestMapping("/photo")
public class PhotoController {
  @Autowired
  ServletContext context;
  
  @Autowired
  PhotoService photoService;
  
  @Autowired
  MaterialsService materialsService;
  
  final String uploadsDir = System.getProperty("user.dir") + "\\src\\main\\resources\\public\\";
  
  @PostMapping("/upload")
  public void uploadPhoto(@RequestParam("file") MultipartFile file, ModelMap modelMap) throws IOException {
    String extension = FilenameUtils.getExtension(file.getOriginalFilename());
    UUID filename = UUID.randomUUID();
    String fullFileName = filename + "." + extension;
    try {
      Photo photo = new Photo();
      photo.setImage(fullFileName);
      
      photoService.savePhoto(photo);
      String filePath = uploadsDir + fullFileName;
      File dest = new File(filePath);
      file.transferTo(dest);
    } catch (Exception err) {
      System.out.println(err);
    }
    
  }
  
  @GetMapping("/{fileName}")
  public HttpEntity<byte[]> getArticleImage(@PathVariable String fileName) throws IOException {
    byte[] image = Files.readAllBytes(new File(uploadsDir + fileName).toPath());

    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.IMAGE_JPEG);
    headers.setContentLength(image.length);

    return new HttpEntity<byte[]>(image, headers);
  }
  
  @GetMapping("/freePhoto")
  public List<Photo> getFreePhoto() {
    return photoService.getFreePhotos();
  }
  
  @DeleteMapping("/delete/{id}")
  public void deletePhoto(@PathVariable int id) {
    Photo photo = photoService.getById(id);
    photoService.delete(photo);
    File file = new File(uploadsDir + photo.getImage());
    file.delete();
  }
}
