package cl.duoc.levelup.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration; // Importante para CORS
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.http.HttpMethod;
import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private JwtFilter jwtFilter;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    // 1. Configuración de seguridad HTTP
    @Bean
public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
        .csrf(csrf -> csrf.disable()) // Deshabilitar CSRF para APIs
        .cors(cors -> cors.configurationSource(corsConfigurationSource())) // CORS para el frontend
        .authorizeHttpRequests(auth -> auth
            // Rutas públicas
            .requestMatchers("/api/v1/auth/**").permitAll()
            .requestMatchers("/v3/api-docs/**", "/swagger-ui/**", "/swagger-ui.html").permitAll()

            // ---------- PRODUCTOS ----------
            // Cualquiera puede ver el catálogo
            .requestMatchers(HttpMethod.GET, "/api/v1/productos/**").permitAll()
            // Solo ADMIN puede crear / editar / eliminar productos
            .requestMatchers(HttpMethod.POST, "/api/v1/productos/**").hasRole("ADMIN")
            .requestMatchers(HttpMethod.PUT, "/api/v1/productos/**").hasRole("ADMIN")
            .requestMatchers(HttpMethod.DELETE, "/api/v1/productos/**").hasRole("ADMIN")

            // ---------- ÓRDENES ----------
            // Crear orden (checkout): lo dejamos abierto para que funcione tu flujo actual
            // Si luego quieres obligar login, aquí puedes cambiar a .authenticated()
            .requestMatchers(HttpMethod.POST, "/api/v1/ordenes/**").permitAll()
            // Ver órdenes: solo ADMIN o VENDEDOR
            .requestMatchers(HttpMethod.GET, "/api/v1/ordenes/**").hasAnyRole("ADMIN", "VENDEDOR")

            // Cualquier otra ruta requiere estar autenticado
            .anyRequest().authenticated()
        )
        .sessionManagement(sess -> sess
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS) // JWT sin sesión
        )
        .authenticationProvider(authenticationProvider())
        .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

    return http.build();
}


    // 2. Encriptador de contraseñas
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // 3. Proveedor de autenticación (conecta BD y PasswordEncoder)
    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    // 4. Manejador de autenticación
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    // 5. Configuración CORS Global (Para que React no tenga problemas)
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:5173")); // Tu Frontend
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("Authorization", "Content-Type"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}