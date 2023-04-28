package com.service.impl;

import com.model.Cart;
import com.model.Product;
import com.model.account.Account;
import com.repository.ICartRepository;
import com.service.ICartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartService implements ICartService {
    @Autowired
    private ICartRepository iCartRepository;

    @Override
    public List<Cart> findAllByAccount(Account account) {
        return iCartRepository.findAllByAccount(account);
    }

    @Override
    public List<Cart> findCartByAccountId(long accountId) {
        return iCartRepository.findCartByAccountId(accountId);
    }

    @Override
    public Boolean existsByProductIdAndAccountId(Product product, long accountId) {
        return iCartRepository.existsByProductIdAndAccountId(product, accountId);
    }

    @Override
    public Cart findByProductIdAndAccountId(long productId, long accountId) {
        return iCartRepository.findCartBy(productId, accountId);
    }

    @Override
    public void createCart(Cart cart) {
        iCartRepository.save(cart);
    }

    @Override
    public Cart findById(int id) {
        return iCartRepository.findById(id).orElse(null);
    }
}
