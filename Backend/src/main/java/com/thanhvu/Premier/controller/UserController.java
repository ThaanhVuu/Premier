package com.thanhvu.Premier.controller;
import com.thanhvu.Premier.dto.Request.UserRequest;
import com.thanhvu.Premier.dto.Response.APIResponse;
import com.thanhvu.Premier.entity.User;
import com.thanhvu.Premier.service.UserService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserController {
    UserService userService;
    @PostMapping
    APIResponse<User> createUser(@RequestBody UserRequest request) {
        User user = userService.createUser(request);
        user.setPassword("******");
        return APIResponse.<User>builder()
                .code(200)
                .info("Create user successful!")
                .result(user)
                .build();
    }


    @GetMapping
    APIResponse<List<User>> getUsers(){
        return APIResponse.<List<User>>builder()
                .code(200)
                .info("Get all users successful!")
                .result(userService.getUsers())
                .build();
    }

    @PutMapping("{id}")
    APIResponse<?> updateUser(@PathVariable int id, @RequestBody UserRequest request){
        User user = userService.updateUser(id, request);
        user.setPassword("******");
        return APIResponse.<User>builder()
                .code(200)
                .info("Update user successful!")
                .result(user)
                .build();
    }

    @DeleteMapping("{id}")
    APIResponse<?> deleteUser(@PathVariable int id){
        return APIResponse.builder()
                .code(200)
                .info("Delete user successful!")
                .result(userService.deleteUser(id))
                .build();
    }

    @GetMapping("{id}")
    APIResponse<?> getUserByID(@PathVariable int id){
        return APIResponse.builder()
                .code(200)
                .info("get user by id: " + id)
                .result(userService.getUserById(id))
                .build();
    }

    @GetMapping("/myinfo")
    APIResponse<?> getMyInfo(){
        return APIResponse.builder()
                .code(200)
                .result(userService.getMyInfo())
                .build();
    }
}