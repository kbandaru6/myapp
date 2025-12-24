package com.example.app.controller;

import com.example.app.entity.TestEntity;
import com.example.app.service.TestService;
import com.example.app.dto.TestResponseDto;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tests")
public class TestController {

    private final TestService service;

    public TestController(TestService service) {
        this.service = service;
    }

    @GetMapping
    public List<TestResponseDto> getAll() {
        return service.getAllTests();
    }

    @PostMapping
    public TestResponseDto create(@RequestBody TestEntity entity) {
        TestEntity saved = service.save(entity);
        return new TestResponseDto(saved.getId(), saved.getName());
    }
}
