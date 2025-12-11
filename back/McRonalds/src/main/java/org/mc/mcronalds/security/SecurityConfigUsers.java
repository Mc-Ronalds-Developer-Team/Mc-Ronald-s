package org.mc.mcronalds.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.cors.CorsConfiguration; // IMPORTANTE
import org.springframework.web.cors.CorsConfigurationSource; // IMPORTANTE
import org.springframework.web.cors.UrlBasedCorsConfigurationSource; // IMPORTANTE
import java.util.List; // IMPORTANTE

@Configuration
public class SecurityConfigUsers {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain userSecurity(HttpSecurity http) throws Exception {
        http
                .securityMatcher("/api/**")
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/auth/login", "/api/auth/register").permitAll()
                        .requestMatchers(org.springframework.http.HttpMethod.GET, "/api/menu-items/**",
                                "/api/menu-categories/**")
                        .permitAll()
                        // Permitir MercadoPago y Creación de Ordenes (Kiosko Mode)
                        .requestMatchers("/api/mercadopago/**", "/api/orders/**").permitAll()
                        .anyRequest().authenticated())
                .httpBasic(org.springframework.security.config.Customizer.withDefaults()); // Enable Basic Auth

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        // Permitiendo cualquier origen para evitar problemas de CORS
        configuration.setAllowedOriginPatterns(List.of("*"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}