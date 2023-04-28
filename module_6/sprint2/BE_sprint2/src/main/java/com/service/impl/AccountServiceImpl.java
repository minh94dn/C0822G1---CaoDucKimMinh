package com.service.impl;

import com.dto.request.ChangePasswordDto;
import com.model.account.Account;
import com.repository.IAccountRepository;
import com.service.IAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AccountServiceImpl implements IAccountService {
    @Autowired
    private IAccountRepository iAccountRepository;

    @Override
    public Optional<Account> findByUsername(String username) {
        return iAccountRepository.findByUsername(username);
    }

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void save(Long accountId) {
        iAccountRepository.save(accountId);
    }

    @Override
    public void changePassword(ChangePasswordDto changePasswordDto) throws Exception {
        Account account = iAccountRepository.findByUserId(changePasswordDto.getAccountId());
        if (account == null) {
            throw new Exception("Account null");
        }
        account.setPassword(passwordEncoder.encode(changePasswordDto.getNewPass()));
        iAccountRepository.save(account);
    }

    @Override
    public Boolean existsAccountByUsername(String username) {
        return iAccountRepository.existsAccountByUsername(username);
    }

    @Override
    public Boolean existsAccountByEmail(String email) {
        return iAccountRepository.existsAccountByEmail(email);
    }

    @Override
    public void save(Account account) {
        iAccountRepository.save(account);
    }

    @Override
    public Account findById(long id) {
        return iAccountRepository.findById(id).orElse(null);
    }

}
