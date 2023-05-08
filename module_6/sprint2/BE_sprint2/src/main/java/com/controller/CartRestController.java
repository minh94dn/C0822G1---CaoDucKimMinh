package com.controller;

import com.dto.CartDTO;
import com.model.Cart;
import com.model.Product;
import com.model.account.Account;
import com.repository.ICartRepository;
import com.service.IAccountService;
import com.service.ICartService;
import com.service.IProductService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/cart")
public class CartRestController {

    @Autowired
    private ICartService iCartService;

    @Autowired
    private IAccountService iAccountService;

    @Autowired
    private IProductService iProductService;

    @PostMapping("/create")
    public ResponseEntity<?> createOrUpdate(@RequestBody CartDTO cartDto) {
        Cart cart = new Cart();
        Account account = iAccountService.findById(cartDto.getAccountId());
        Product product = iProductService.findById(cartDto.getProductId());
        BeanUtils.copyProperties(cartDto, cart);
        cart.setAccount(account);
        cart.setProduct(product);
//        if (iCartService.existsByProductIdAndAccountId(cart.getProduct(),cart.getAccount().getId())) {
//            Cart cart1 = iCartService.findByProductIdAndAccountId(cart.getProduct(),cart.getAccount().getId());
//            cart1.setQuantity(cart1.getQuantity() + 1);
//            iCartService.createCart(cart1);
//        }else {
            Cart cart1 = new Cart();
            cart1.setQuantity(cartDto.getQuantity());
            cart1.setProduct(iProductService.findById(cartDto.getProductId()));
            cart1.setAccount(iAccountService.findById(cartDto.getAccountId()));
            iCartService.createCart(cart1);
//        }
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @PostMapping("/increase")
    public ResponseEntity<?> increaseQuantity(@RequestBody CartDTO cartDto) {
        Cart cart1 = iCartService.findById(cartDto.getId());
        cart1.setQuantity(cart1.getQuantity() + 1);
        iCartService.createCart(cart1);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/reduce")
    public ResponseEntity<?> reduceQuantity(@RequestBody CartDTO cartDto) {
        Cart cart1 = iCartService.findById(cartDto.getId());
        cart1.setQuantity(cart1.getQuantity() - 1);
        iCartService.createCart(cart1);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/list/{id}")
    public ResponseEntity<List<Cart>> showList(@PathVariable("id") Integer id){
        List<Cart> carts = iCartService.findCartByAccountId(id);
        return new ResponseEntity<>(carts, HttpStatus.OK);
    }
}
