package com.example.app.dto;

public class TestResponseDto {
    private Long id;
    private String name;

    public TestResponseDto(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

}