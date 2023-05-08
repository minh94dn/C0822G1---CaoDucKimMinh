
package com.repository;

import com.model.account.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Optional;

@Repository
@Transactional
public interface IAccountRepository extends JpaRepository<Account,Long> {

    Boolean existsAccountByUsername(String username);

    Boolean existsAccountByEmail(String email);


    @Query(value = "select * from account where username = :username", nativeQuery = true)
    Optional<Account> findByUsername(@Param("username") String username);

    @Query(value = "select * from account where account_id = :accountId", nativeQuery = true)
    Account findByUserId(@Param("accountId") Long accountId);


    @Query(value = "update account set password = :newPass where account_id= :accountId",nativeQuery = true)
    void save(@Param("accountId") Long accountId);
}
