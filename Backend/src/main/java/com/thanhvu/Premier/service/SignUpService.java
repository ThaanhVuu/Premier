package com.thanhvu.Premier.service;

import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.thanhvu.Premier.dto.Request.UserRequest;
import com.thanhvu.Premier.entity.User;
import com.thanhvu.Premier.exceptions.AppException;
import com.thanhvu.Premier.exceptions.ErrorCode;
import com.thanhvu.Premier.mapper.UserMapper;
import com.thanhvu.Premier.repository.UserRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.HashSet;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class SignUpService {
    PasswordEncoder passwordEncoder;
    UserRepository userRepo;
    UserMapper userMapper;
    JavaMailSender sender;

    @Value("${jwt.signerKey}")
    @NonFinal
    String signerKey;

    @Value("${URL_frontend}")
            @NonFinal
    String urlConfirmToken;

    public User signUpRequest(UserRequest request) {
        if (userRepo.existsByUsername(request.getUsername()))
            throw new AppException(ErrorCode.ALREADY_EXISTS);

        User user = userMapper.toUser(request);
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        // tao link token
        String link = urlConfirmToken + "/login/confirm.html?token=" + generateSignUpToken(user);
        // gui token toi email (username la email), link nen dan toi mot trang web
        // confirm, web doc token va goi api confirm
        sendVerificationEmail(request.getUsername(), link, request.getName());
        return user;
    }

    // password trong token da duoc bam
    public String generateSignUpToken(User user) {
        try {
            JWSHeader header = new JWSHeader(JWSAlgorithm.HS512);

            JWTClaimsSet claimsSet = new JWTClaimsSet.Builder()
                    .subject(user.getUsername())
                    .issuer("PremierLeague")
                    .issueTime(new Date())
                    .expirationTime(new Date(Instant.now().plus(30, ChronoUnit.MINUTES).toEpochMilli()))
                    .claim("password", user.getPassword())
                    .claim("name", user.getName())
                    .build();

            Payload payload = new Payload(claimsSet.toJSONObject());

            JWSObject object = new JWSObject(header, payload);
            object.sign(new MACSigner(signerKey.getBytes()));
            return object.serialize();

        } catch (JOSEException ex) {
            throw new RuntimeException("Fail to generate signup token: ", ex);
        }
    }

    public void sendVerificationEmail(String to, String linkToken, String username) {
        try {
            String template = new ClassPathResource("templates/Mail.html").getFile().getPath();
            String content = Files.readString(Path.of(template), StandardCharsets.UTF_8);

            content = content.replace("{name}", username);
            content = content.replace("{verificationLink}", linkToken);

            MimeMessage message = sender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, StandardCharsets.UTF_8.name());
            helper.setTo(to);
            helper.setSubject("Account verification from PremierLeague");
            helper.setText(content, true); // true = gửi HTML
            helper.setFrom("thanhvu7623@email.com");

            sender.send(message);

        } catch (IOException | MessagingException e) {
            log.error("Error to mail {}: {}", to, e.getMessage(), e);
        }
    }

    public String confirmSignUp(String token) {
        try {
            // 1. Parse token
            JWSObject jwsObject = JWSObject.parse(token);

            // 2. Verify chữ ký
            boolean verified = jwsObject.verify(new MACVerifier(signerKey.getBytes()));
            if (!verified)
                return "Token không hợp lệ.";

            // 3. Parse claims
            JWTClaimsSet claims = JWTClaimsSet.parse(jwsObject.getPayload().toJSONObject());

            String username = claims.getSubject();
            String password = claims.getStringClaim("password");
            String name = claims.getStringClaim("name");
            HashSet<String> roles = new HashSet<>();
            roles.add("USER");

            User user = User.builder()
                    .username(username)
                    .password(password)
                    .name(name)
                    .roles(roles)
                    .build();
            userRepo.save(user);
            return "Tạo tài khoản thành công! Bạn có thể đăng nhập.";
        } catch (Exception e) {
            log.error("Xác thực thất bại: {}", e.getMessage(), e);
            return "Xác minh thất bại. Token có thể đã hết hạn hoặc bị sai.";
        }
    }
}
