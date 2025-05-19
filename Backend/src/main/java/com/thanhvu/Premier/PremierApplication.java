package com.thanhvu.Premier;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.Date;

import java.io.File;


@SpringBootApplication
public class PremierApplication {

	public static void main(String[] args) {
		Date a = new Date();
		System.out.println(a);
		System.out.println("DB path = " + new File("app.db").getAbsolutePath());
		SpringApplication.run(PremierApplication.class, args);
	}
}
