package com.thanhvu.Premier.controller;

import com.nimbusds.jose.JOSEException;
import com.thanhvu.Premier.dto.Request.IntrospectRequest;
import com.thanhvu.Premier.dto.Request.UserRequest;
import com.thanhvu.Premier.dto.Response.APIResponse;
import com.thanhvu.Premier.entity.User;
import com.thanhvu.Premier.service.AuthenticationService;
import com.thanhvu.Premier.service.SignUpService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("api/auth")
public class AuthenticationController {
    AuthenticationService authService;
    SignUpService signUpService;

    @PostMapping("/token")
    APIResponse<?> authenticated(@RequestBody UserRequest request){
        return APIResponse.<String>builder()
                .code(200)
                .info("Login successful!")
                .result(authService.authenticate(request))
                .build();
    }

    @PostMapping("/introspect")
    APIResponse<?> introspect(@RequestBody IntrospectRequest request) throws JOSEException, ParseException {
        return APIResponse.<Boolean>builder()
                .code(200)
                .info("Verify token successful!")
                .result(authService.introspect(request))
                .build();
    }

    //dang ki tai khoan
    @PostMapping("/signup")
    APIResponse<?> signUp(@RequestBody UserRequest request){
        User user = signUpService.signUpRequest(request);
        user.setPassword("******");
        return APIResponse.builder()
                .code(200)
                .info("Sign up successful, please verify your account via email: " + user.getUsername())
                .result(user.getUsername())
                .build();
    }

    @GetMapping("/confirm")
    public APIResponse<?> confirm(@RequestParam String token){
        return APIResponse.builder()
                .code(200)
                .info(signUpService.confirmSignUp(token))
                .build();
    }

}
