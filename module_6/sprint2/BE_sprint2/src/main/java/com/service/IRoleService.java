package com.service;

import com.model.account.Role;
import com.model.account.RoleName;

import java.util.Optional;

public interface IRoleService {
    Optional<Role> findByName(RoleName name);

}
