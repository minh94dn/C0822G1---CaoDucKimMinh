package com.service;

import com.dto.request.ChangePasswordDto;
import com.model.account.Account;

import java.util.Optional;

public interface IAccountService {
    Optional<Account> findByUsername(String username);

    /**
     * Create by : NuongHT
     * Date create: 27/02/2023
     * Description: create method service of change password
     *
     */
    void save(Long accountId);

    void changePassword(ChangePasswordDto changePasswordDto) throws Exception;

    Boolean existsAccountByUsername(String username);

    Boolean existsAccountByEmail( String email);

    void save(Account account);

}
