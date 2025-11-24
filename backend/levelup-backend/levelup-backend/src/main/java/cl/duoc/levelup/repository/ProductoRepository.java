package cl.duoc.levelup.repository;

import cl.duoc.levelup.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {
    // ¡Listo! Con esto ya tienes findAll, save, deleteById, etc.
}