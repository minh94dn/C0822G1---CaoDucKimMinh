package com.service;

import com.model.Cart;
import com.model.Product;
import com.model.account.Account;

import java.util.List;

public interface ICartService {
    List<Cart> findAllByAccount(Account account);
    List<Cart> findCartByAccountId(long accountId);

    Boolean existsByProductIdAndAccountId(Product productId, long accountId);

    Cart findByProductIdAndAccountId(long productId, long accountId);

    void createCart(Cart cart);

    Cart findById(int id);
}
