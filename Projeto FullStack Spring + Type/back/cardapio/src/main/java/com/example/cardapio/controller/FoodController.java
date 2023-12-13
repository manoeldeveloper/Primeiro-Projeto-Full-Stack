package com.example.cardapio.controller;

import java.util.List;
import java.util.stream.Collectors;

import com.example.cardapio.food.Food;
import com.example.cardapio.food.FoodRepository;
import com.example.cardapio.food.FoodRequestDTO;
import com.example.cardapio.food.FoodResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/food")
public class FoodController {

    private final FoodRepository repository;

    public FoodController(FoodRepository repository) {
        this.repository = repository;
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping
    public ResponseEntity<Void> saveFood(@RequestBody FoodRequestDTO data) {
        Food foodData = new Food(data);
        repository.save(foodData);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public List<FoodResponseDTO> getAllFood() {
        List<FoodResponseDTO> foodList = repository.findAll().stream()
                .map(FoodResponseDTO::new)
                .collect(Collectors.toList());
        return foodList;
    }

    @DeleteMapping("/all")
    public ResponseEntity<String> deleteAllFood() {
        try {
            repository.deleteAll();
            return ResponseEntity.ok("Todos os itens do cardápio foram removidos com sucesso");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Erro ao remover todos os itens do cardápio");
        }
    }
}
