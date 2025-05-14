package com.thanhvu.Premier;

import com.thanhvu.Premier.service.StandingService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.Date;

@SpringBootApplication
public class PremierApplication {

	public static void main(String[] args) {
		Date a = new Date();
		System.out.println(a);

		SpringApplication.run(PremierApplication.class, args);
	}
}
