package cl.duoc.levelup.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "ordenes")
public class Orden {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long numeroOrden; // El número aleatorio que generas en el front
    private LocalDateTime fecha;
    private Integer total;
    
    // Datos del comprador (simplificado para esta evaluación)
    private String nombreCliente;
    private String emailCliente;
    
    // En un caso real haríamos una relación @OneToMany con "DetalleOrden",
    // pero para cumplir con la evaluación rápido, podemos guardar un resumen o 
    // simplemente el total y el cliente, que es lo crítico.
}