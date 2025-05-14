package com.thanhvu.Premier.entity;

import com.thanhvu.Premier.validator.UsernameConstraint;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Set;

@Entity
@Data @Table(name = "users")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int userId;
    @Column(nullable = false, unique = true) @UsernameConstraint(min = 1)
    String username;
    @Column(nullable = false)
    String password;
    String name;
    Set<String> roles;
}
