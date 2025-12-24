package com.example.app.service;

import com.example.app.entity.TestEntity;
import com.example.app.repository.TestRepository;
import com.example.app.dto.TestResponseDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TestService {
    private final TestRepository repository;

    public TestService(TestRepository repository) {
        this.repository = repository;
    }

    public List<TestEntity> findAll() {
        return this.repository.findAll();
    }

    public TestEntity save(TestEntity entity) {
        return this.repository.save(entity);
    }

    public List<TestResponseDto> getAllTests() {
        return this.repository.findAll()
                .stream()
                .map(test -> new TestResponseDto(
                        test.getId(),
                        test.getName()
                ))
                .toList();
    }
}