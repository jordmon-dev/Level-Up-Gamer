package cl.duoc.levelup.controller;

import cl.duoc.levelup.dto.LoginDto;
import cl.duoc.levelup.dto.RegistroDto;
import cl.duoc.levelup.model.Usuario;
import cl.duoc.levelup.repository.UsuarioRepository;
import cl.duoc.levelup.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtils jwtUtils;

    // Endpoint para Registrarse
    @PostMapping("/register")
    public ResponseEntity<?> registrar(@RequestBody RegistroDto registroDto) {
        if (usuarioRepository.findByEmail(registroDto.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("El email ya está registrado.");
        }

        Usuario usuario = new Usuario();
        usuario.setNombre(registroDto.getNombre());
        usuario.setApellidos(registroDto.getApellidos());
        usuario.setEmail(registroDto.getEmail());
        // Encriptamos la contraseña antes de guardarla
        usuario.setPassword(passwordEncoder.encode(registroDto.getPassword()));
        usuario.setDireccion(registroDto.getDireccion());
        usuario.setRegion(registroDto.getRegion());
        usuario.setComuna(registroDto.getComuna());
        usuario.setRol("CLIENTE"); // Por defecto todos son usuarios normales

        usuarioRepository.save(usuario);

        return ResponseEntity.status(HttpStatus.CREATED).body("Usuario registrado con éxito");
    }

    // Endpoint para Login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDto loginDto) {
        try {
            // Esto verifica email y password automáticamente
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword())
            );

            if (authentication.isAuthenticated()) {
                // Generamos el token
                String token = jwtUtils.generateToken(loginDto.getEmail());
                
                // Buscamos datos extra para enviarlos al frontend (opcional pero útil)
                Usuario usuario = usuarioRepository.findByEmail(loginDto.getEmail()).get();

                Map<String, Object> response = new HashMap<>();
                response.put("token", token);
                response.put("usuario", usuario); // Enviamos datos del usuario para el frontend

                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales inválidas");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Error de autenticación: " + e.getMessage());
        }
    }
}