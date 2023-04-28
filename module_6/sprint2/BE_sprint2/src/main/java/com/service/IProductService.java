package com.service;

import com.model.Product;
import com.model.account.Account;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface IProductService {
    List<Product> findByCategoryId1(Pageable pageable);

    List<Product> findByCategoryId2(Pageable pageable);

    List<Product> searchAllProduct(String productName);

    Optional<Product> findById(Long id);

    Product findById(long id);
}
