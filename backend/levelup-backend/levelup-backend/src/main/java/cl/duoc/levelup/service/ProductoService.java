package cl.duoc.levelup.service;

import cl.duoc.levelup.model.Producto;
import cl.duoc.levelup.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductoService {

    @Autowired
    private ProductoRepository repository;

    // Listar todos
    public List<Producto> listarTodos() {
        return repository.findAll();
    }

    // Buscar por ID
    public Optional<Producto> buscarPorId(Long id) {
        return repository.findById(id);
    }

    // Guardar o Actualizar
    public Producto guardar(Producto producto) {
        return repository.save(producto);
    }

    // Eliminar
    public void eliminar(Long id) {
        repository.deleteById(id);
    }
}