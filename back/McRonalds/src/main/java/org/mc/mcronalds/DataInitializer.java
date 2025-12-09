package org.mc.mcronalds;

import org.mc.mcronalds.model.MenuCategory;
import org.mc.mcronalds.model.User;
import org.mc.mcronalds.repository.MenuCategoryRepository;
import org.mc.mcronalds.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder; // Needed for password

import java.util.Arrays;
import java.util.List;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initData(MenuCategoryRepository categoryRepository, UserRepository userRepository,
            PasswordEncoder passwordEncoder) {
        return args -> {
            // 1. Init Categories
            List<String> categoryNames = Arrays.asList("Combos", "Hamburguesas", "Bebidas");
            for (String name : categoryNames) {
                if (categoryRepository.findByName(name).isEmpty()) {
                    MenuCategory category = new MenuCategory();
                    category.setName(name);
                    category.setDescription("Categoría de " + name);
                    categoryRepository.save(category);
                    System.out.println("Categoría creada: " + name);
                }
            }

            // 2. Init Guest User for Kiosk
            String guestUsername = "user@guest.com";
            if (userRepository.findByUsername(guestUsername).isEmpty()) {
                User guest = new User();
                guest.setUsername(guestUsername);
                guest.setPassword(passwordEncoder.encode("kiosk123")); // Password not really used by kiosk
                guest.setRole(org.mc.mcronalds.model.Role.USER);
                userRepository.save(guest);
                System.out.println("Usuario Invitado creado: " + guestUsername);
            }
        };
    }
}
