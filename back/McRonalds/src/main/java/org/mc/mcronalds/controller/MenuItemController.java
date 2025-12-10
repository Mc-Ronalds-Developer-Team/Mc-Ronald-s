package org.mc.mcronalds.controller;

import org.mc.mcronalds.model.MenuItem;
import org.mc.mcronalds.model.MenuCategory;
import org.mc.mcronalds.repository.MenuItemRepository;
import org.mc.mcronalds.repository.MenuCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.Map;
import java.util.HashMap;
import java.math.BigDecimal;

@RestController
@RequestMapping("/api/menu-items")
public class MenuItemController {

    @Autowired
    private MenuItemRepository menuItemRepository;
    
    @Autowired
    private MenuCategoryRepository menuCategoryRepository;

    // Obtener todos los items del menú
    @GetMapping
    public List<MenuItem> getAllMenuItems() {
        return menuItemRepository.findAll();
    }

    // Obtener un item por ID
    @GetMapping("/{id}")
    public ResponseEntity<MenuItem> getMenuItemById(@PathVariable Long id) {
        Optional<MenuItem> item = menuItemRepository.findById(id);
        return item.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Crear un nuevo item del menú
    @PostMapping
    public ResponseEntity<?> createMenuItem(@RequestBody MenuItem menuItem) {
        try {
            // Validaciones básicas
            if (menuItem.getName() == null || menuItem.getName().trim().isEmpty()) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "El nombre del item es requerido");
                return ResponseEntity.badRequest().body(error);
            }
            
            if (menuItem.getPrice() == null || menuItem.getPrice().compareTo(BigDecimal.ZERO) <= 0) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "El precio debe ser mayor a 0");
                return ResponseEntity.badRequest().body(error);
            }
            
            if (menuItem.getCategory() == null || menuItem.getCategory().getIdCategory() == null) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "La categoría es requerida");
                return ResponseEntity.badRequest().body(error);
            }
            
            // Verificar que la categoría existe
            Optional<MenuCategory> category = menuCategoryRepository.findById(menuItem.getCategory().getIdCategory());
            if (category.isEmpty()) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "La categoría especificada no existe");
                return ResponseEntity.badRequest().body(error);
            }
            
            // Verificar si ya existe un item con el mismo nombre en la misma categoría
            List<MenuItem> existingItems = menuItemRepository.findByCategory(category.get());
            boolean nameExists = existingItems.stream()
                    .anyMatch(item -> item.getName().equalsIgnoreCase(menuItem.getName()));
            
            if (nameExists) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Ya existe un item con este nombre en la categoría");
                return ResponseEntity.badRequest().body(error);
            }
            
            // Establecer la categoría completa en el item
            menuItem.setCategory(category.get());
            
            MenuItem savedItem = menuItemRepository.save(menuItem);
            return ResponseEntity.ok(savedItem);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Error al crear el item del menú");
            error.put("message", e.getMessage());
            return ResponseEntity.status(500).body(error);
        }
    }

    // Actualizar un item existente
    @PutMapping("/{id}")
    public ResponseEntity<?> updateMenuItem(@PathVariable Long id, @RequestBody MenuItem updatedItem) {
        try {
            Optional<MenuItem> existingItem = menuItemRepository.findById(id);
            if (existingItem.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            
            MenuItem item = existingItem.get();
            
            // Validaciones
            if (updatedItem.getName() == null || updatedItem.getName().trim().isEmpty()) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "El nombre del item es requerido");
                return ResponseEntity.badRequest().body(error);
            }
            
            if (updatedItem.getPrice() == null || updatedItem.getPrice().compareTo(BigDecimal.ZERO) <= 0) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "El precio debe ser mayor a 0");
                return ResponseEntity.badRequest().body(error);
            }
            
            if (updatedItem.getCategory() == null || updatedItem.getCategory().getIdCategory() == null) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "La categoría es requerida");
                return ResponseEntity.badRequest().body(error);
            }
            
            // Verificar que la categoría existe
            Optional<MenuCategory> category = menuCategoryRepository.findById(updatedItem.getCategory().getIdCategory());
            if (category.isEmpty()) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "La categoría especificada no existe");
                return ResponseEntity.badRequest().body(error);
            }
            
            // Verificar si ya existe otro item con el mismo nombre en la misma categoría
            List<MenuItem> existingItems = menuItemRepository.findByCategory(category.get());
            boolean nameExists = existingItems.stream()
                    .anyMatch(existing -> !existing.getIdItem().equals(id) && 
                            existing.getName().equalsIgnoreCase(updatedItem.getName()));
            
            if (nameExists) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Ya existe otro item con este nombre en la categoría");
                return ResponseEntity.badRequest().body(error);
            }
            
            // Actualizar campos
            item.setName(updatedItem.getName());
            item.setDescription(updatedItem.getDescription());
            item.setPrice(updatedItem.getPrice());
            item.setPreviousPrice(updatedItem.getPreviousPrice());
            item.setImageUrl(updatedItem.getImageUrl());
            item.setPreparationTime(updatedItem.getPreparationTime());
            item.setCategory(category.get()); // Usar la categoría completa cargada
            
            MenuItem savedItem = menuItemRepository.save(item);
            return ResponseEntity.ok(savedItem);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Error al actualizar el item del menú");
            error.put("message", e.getMessage());
            return ResponseEntity.status(500).body(error);
        }
    }

    // Eliminar un item del menú
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMenuItem(@PathVariable Long id) {
        try {
            Optional<MenuItem> item = menuItemRepository.findById(id);
            if (item.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            
            // Verificar si el item tiene órdenes o ventas asociadas
            if (!item.get().getOrderDetails().isEmpty() || !item.get().getSaleDetails().isEmpty()) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "No se puede eliminar el item porque tiene órdenes o ventas asociadas");
                error.put("message", "Primero elimine las órdenes y ventas relacionadas con este item");
                return ResponseEntity.badRequest().body(error);
            }
            
            menuItemRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Error al eliminar el item del menú");
            error.put("message", e.getMessage());
            return ResponseEntity.status(500).body(error);
        }
    }
    
    // Obtener items por categoría
    @GetMapping("/category/{categoryId}")
    public ResponseEntity<?> getItemsByCategory(@PathVariable Long categoryId) {
        try {
            Optional<MenuCategory> category = menuCategoryRepository.findById(categoryId);
            if (category.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            
            List<MenuItem> items = menuItemRepository.findByCategory(category.get());
            return ResponseEntity.ok(items);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Error al obtener items por categoría");
            error.put("message", e.getMessage());
            return ResponseEntity.status(500).body(error);
        }
    }
    
    // Buscar items por nombre
    @GetMapping("/search")
    public ResponseEntity<?> searchItemsByName(@RequestParam String name) {
        try {
            List<MenuItem> allItems = menuItemRepository.findAll();
            List<MenuItem> filteredItems = allItems.stream()
                    .filter(item -> item.getName().toLowerCase().contains(name.toLowerCase()))
                    .toList();
            
            return ResponseEntity.ok(filteredItems);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Error al buscar items");
            error.put("message", e.getMessage());
            return ResponseEntity.status(500).body(error);
        }
    }
    
    // Obtener items por rango de precio
    @GetMapping("/price-range")
    public ResponseEntity<?> getItemsByPriceRange(
            @RequestParam BigDecimal minPrice, 
            @RequestParam BigDecimal maxPrice) {
        try {
            List<MenuItem> allItems = menuItemRepository.findAll();
            List<MenuItem> filteredItems = allItems.stream()
                    .filter(item -> item.getPrice().compareTo(minPrice) >= 0 && 
                                  item.getPrice().compareTo(maxPrice) <= 0)
                    .toList();
            
            return ResponseEntity.ok(filteredItems);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Error al filtrar items por precio");
            error.put("message", e.getMessage());
            return ResponseEntity.status(500).body(error);
        }
    }
}
