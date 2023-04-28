package com.repository;

import com.model.Product;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public interface IProductRepository extends JpaRepository<Product, Long> {
    @Query(value = "select * from product where product.category_id = 1",nativeQuery = true)
    List<Product> findByCategoryId1(Pageable pageable);

    @Query(value = "select * from product where product.category_id = 2",nativeQuery = true)
    List<Product> findByCategoryId2(Pageable pageable);

    @Query(value = "select * from product where product.name like concat('%', :productName, '%')",nativeQuery = true)
    List<Product> searchAllProduct(@Param("productName") String productName);

    @Query(value = "select * from product " +
            "where id =:id " +
            "and flag_delete = false ",
            nativeQuery = true)
    Product findProduct(@Param("id") long id);
}
