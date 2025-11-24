package cl.duoc.levelup.repository;

import cl.duoc.levelup.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    // Método mágico de Spring Data para buscar por email
    Optional<Usuario> findByEmail(String email);
}