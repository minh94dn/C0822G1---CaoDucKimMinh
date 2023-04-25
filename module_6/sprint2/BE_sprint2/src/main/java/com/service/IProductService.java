package com.service;

import com.model.Product;

import java.util.List;
import java.util.Optional;

public interface IProductService {
    List<Product> getAllProduct();

    Optional<Product> findById(Long id);
}
