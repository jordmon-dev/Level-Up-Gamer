package cl.duoc.levelup.dto;
import lombok.Data;

@Data
public class RegistroDto {
    private String nombre;
    private String apellidos;
    private String email;
    private String password;
    private String direccion;
    private String region;
    private String comuna;
}