package cl.duoc.levelup.model;

import jakarta.persistence.*;
import lombok.Data;

@Data // Lombok genera getters, setters y toString automáticamente
@Entity // Esto le dice a Spring que es una tabla
@Table(name = "productos")
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nombre;

    private String codigo;
    
    private String descripcion;

    @Column(nullable = false)
    private Integer precio;

    private Integer stock;

    private String categoria;

    private String imagen; // URL de la imagen
}
