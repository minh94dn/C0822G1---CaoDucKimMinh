package com.repository;

import com.model.Cart;
import com.model.Product;
import com.model.account.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Transactional
public interface ICartRepository extends JpaRepository<Cart, Integer> {
    List<Cart> findAllByAccount(Account account);

    Boolean existsByProductIdAndAccountId(Product product, long accountId);

    Cart findByProductIdAndAccountId(Product product, long accountId);

    @Query(value = "select * from cart\n" +
            "where account_id =:account_id and product_id =:product_id",nativeQuery = true)
    Cart findCartBy(@Param("account_id") long account_id,
                    @Param("product_id") long product_id);

    @Query(value = "select * from cart\n" +
            "where account_id =:account_id",nativeQuery = true)
    List<Cart> findCartByAccountId(@Param("account_id") long account_id);

}
