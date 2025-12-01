package cl.duoc.levelup.controller;

import cl.duoc.levelup.model.Orden;
import cl.duoc.levelup.repository.OrdenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/ordenes")
@CrossOrigin(origins = "http://localhost:5173")
public class OrdenController {

    @Autowired
    private OrdenRepository ordenRepository;

    @GetMapping
    public List<Orden> listar() {
        return ordenRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<Orden> crear(@RequestBody Orden orden) {
        orden.setFecha(java.time.LocalDateTime.now());
        return ResponseEntity.ok(ordenRepository.save(orden));
    }
}