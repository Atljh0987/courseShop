/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.course.back.config;

import com.course.back.services.UsersDetailsService;
import com.nimbusds.jose.shaded.json.JSONObject;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

/**
 *
 * @author Admin
 */
@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfiguration {
  private final UsersDetailsService usersDetailsService;
  
  @Autowired
  public SecurityConfiguration(UsersDetailsService usersDetailsService) {
    this.usersDetailsService = usersDetailsService;
  } 
  
  @Bean
  public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
    return authenticationConfiguration.getAuthenticationManager();
  }
  
  @Bean
  public PasswordEncoder passwordEncoder() {
      return new BCryptPasswordEncoder();
  }   

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http.csrf().disable().authorizeRequests()            
            .antMatchers("/admin").hasRole("ADMIN")
            .antMatchers("/orders", "/cart").authenticated()
            .anyRequest().permitAll()
            .and()
            .formLogin().loginProcessingUrl("/process_login")
            .failureHandler((req, res, auth) -> res.getWriter().write(new JSONObject(Map.of("success", false)).toJSONString()))
            .successHandler((req, res, auth) -> res.getWriter().write(new JSONObject(Map.of("success", true)).toJSONString()))
            .and()
            .logout()
            .logoutUrl("/logout")
            .logoutSuccessHandler((req, res, auth) -> res.getWriter().write(new JSONObject(Map.of("success", true)).toJSONString()))
            .and()
            .exceptionHandling()
            .authenticationEntryPoint((req, res, auth) -> res.getWriter().write(new JSONObject(Map.of("hasAccess", false, "error", auth.getMessage())).toJSONString()))
            .accessDeniedHandler((req, res, auth) -> res.getWriter().write(new JSONObject(Map.of("hasAccess", false, "error", auth.getMessage())).toJSONString()));
            
//            .exceptionHandling().authenticationEntryPoint(new Http403ForbiddenEntryPoint());
    return http.build();
  }
    
//    @Bean
//    public WebSecurityCustomizer webSecurityCustomizer() throws Exception {
//      return (web) -> web.ignoring().antMatchers("/category/**", "/users/**", "/materials/**");
//    } 


}