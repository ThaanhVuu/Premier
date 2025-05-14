package com.thanhvu.Premier.config;

import com.thanhvu.Premier.entity.Role;
import com.thanhvu.Premier.entity.User;
import com.thanhvu.Premier.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.HashSet;

@Slf4j
@Configuration
@RequiredArgsConstructor
public class InitAdmin {
    private  final PasswordEncoder encoder;

    @Bean
    ApplicationRunner applicationRunner(UserRepository userRepository){
        HashSet<String> roles = new HashSet<>();
        roles.add(Role.ADMIN.name());

        return args -> {
            if(userRepository.findByUsername("admin").isEmpty()){
                User user = User.builder()
                        .username("admin")
                        .password(encoder.encode("admin"))
                        .roles(roles)
                        .build();
                userRepository.save(user);
            }
        };
    }


}
