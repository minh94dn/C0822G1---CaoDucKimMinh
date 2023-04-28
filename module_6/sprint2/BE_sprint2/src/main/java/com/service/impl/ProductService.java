package com.service.impl;

import com.model.Product;
import com.repository.IProductRepository;
import com.service.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService implements IProductService {
    @Autowired
    private IProductRepository iProductRepository;

    @Override
    public List<Product> findByCategoryId1(Pageable pageable) {
        return iProductRepository.findByCategoryId1(pageable);
    }

    @Override
    public List<Product> findByCategoryId2(Pageable pageable) {
        return iProductRepository.findByCategoryId2(pageable);
    }

    @Override
    public List<Product> searchAllProduct(String productName) {
        return iProductRepository.searchAllProduct(productName);
    }

    @Override
    public Optional<Product> findById(Long id) {
        return iProductRepository.findById(id);
    }

    @Override
    public Product findById(long id) {
        return iProductRepository.findProduct(id);
    }


}
