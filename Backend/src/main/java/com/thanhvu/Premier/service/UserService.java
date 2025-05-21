package com.thanhvu.Premier.service;

import com.thanhvu.Premier.dto.Request.UserRequest;
import com.thanhvu.Premier.entity.Role;
import com.thanhvu.Premier.entity.User;
import com.thanhvu.Premier.exceptions.AppException;
import com.thanhvu.Premier.exceptions.ErrorCode;
import com.thanhvu.Premier.mapper.UserMapper;
import com.thanhvu.Premier.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserService {
    UserRepository userRepository;
    PasswordEncoder passwordEncoder;
    UserMapper userMapper;

    @PreAuthorize("hasRole('ADMIN')")
    public User createUser(UserRequest userRequest){
        if (userRepository.existsByUsername(userRequest.getUsername()))
            throw new AppException(ErrorCode.ALREADY_EXISTS);

        User user = User.builder()
                .username(userRequest.getUsername())
                .password(passwordEncoder.encode(userRequest.getPassword()))
                .role(Role.USER)
                .name(userRequest.getName())
                .build();
        return userRepository.save(user);

    }

    @PreAuthorize("hasRole('ADMIN')")
    public List<User> getUsers(){
        log.info("In method get user");

        var authentication = SecurityContextHolder.getContext().getAuthentication();
        log.info(authentication.getName());
        authentication.getAuthorities().forEach(grantedAuthority -> log.info(grantedAuthority.getAuthority()));

        List<User> list = userRepository.findAll();
        return list;
    }

    public User getMyInfo(){
        var context = SecurityContextHolder.getContext();
        var name = context.getAuthentication().getName();

        return userRepository.findByUsername(name)
                .orElseThrow(() -> new AppException(ErrorCode.NOT_FOUND));
    }

    @PostAuthorize("returnObject.username == authentication.name")
    public User getUserById(int id){
        if(!userRepository.existsById(id)){
            throw new AppException(ErrorCode.NOT_FOUND);
        }
        return userRepository.getUsersByUserId(id);
    }

    @PreAuthorize("hasRole('ADMIN')")
    public User updateUser(int id, UserRequest request){
        User user = getUserById(id);
        userMapper.updateUserFromRequest(request, user);
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        return userRepository.save(user);
    }

    @PreAuthorize("hasRole('ADMIN')")
    public String deleteUser(int id){
        if(!userRepository.existsById(id))
            throw new AppException(ErrorCode.NOT_FOUND);
        userRepository.deleteById(id);
        return "Delete user with id = " + id + " successful!";
    }
}
