package com.course.back;

import com.course.back.model.Test;
import com.course.back.services.TestService;
import java.sql.SQLException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BackApplication {
  
  public static void main(String[] args) throws SQLException {
    SpringApplication.run(BackApplication.class, args);
  }

}
