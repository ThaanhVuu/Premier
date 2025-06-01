package com.thanhvu.Premier.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity @Table(name = "audit_log")
@AllArgsConstructor @NoArgsConstructor @Data
@Builder
public class Logger {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;
    String tableName;
    String operation;
    @Column(columnDefinition = "TEXT")
    String changedData;
    String changedAt;
    String changedBy;
}
