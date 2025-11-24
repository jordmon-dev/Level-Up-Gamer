package cl.duoc.levelup.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "usuarios")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nombre;
    
    @Column(nullable = false)
    private String apellidos;

    // El email debe ser único para el Login
    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    // Datos adicionales para el Checkout
    private String direccion;
    private String region;
    private String comuna;

    // Rol para saber si es ADMIN o USER (Requisito de la rúbrica)
    private String rol; 
}