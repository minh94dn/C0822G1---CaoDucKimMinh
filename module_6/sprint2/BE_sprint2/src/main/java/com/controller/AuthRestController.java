package com.controller;


import com.dto.request.SignInForm;
import com.dto.request.SignUpForm;
import com.dto.response.JwtResponse;
import com.dto.response.ResponseMessage;
import com.jwt.JWTProvider;
import com.model.account.Account;
import com.model.account.Role;
import com.model.account.RoleName;
import com.service.IAccountService;
import com.service.IRoleService;
import com.service.principle.AccountPrinciple;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/public/auth")
@CrossOrigin("*")
public class AuthRestController {
    @Autowired
    private IAccountService iAccountService;
    @Autowired
    private IRoleService iRoleService;

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JWTProvider jwtProvider;

    @PostMapping("/sign-in")
    public ResponseEntity<?> login(@Valid @RequestBody SignInForm signInForm) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(signInForm.getUsername(), signInForm.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtProvider.createToken(authentication);
        AccountPrinciple accountPrinciple = (AccountPrinciple) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        List<String> roles = accountPrinciple.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());
        return ResponseEntity.ok(new JwtResponse(token,
                accountPrinciple.getName(),
                accountPrinciple.getId(),
                accountPrinciple.getUsername(),
                accountPrinciple.getEmail(),
                accountPrinciple.getAvatar(),
                roles));
    }


    @PostMapping("/sign-up")
    public ResponseEntity<?> register(@Valid @RequestBody SignUpForm signUpForm) {
        if (iAccountService.existsAccountByUsername(signUpForm.getUsername())) {
            return new ResponseEntity<>(new ResponseMessage("Tên đăng nhập " + signUpForm.getUsername() +
                    " đã được sử dụng, vui lòng chọn tên khác"), HttpStatus.BAD_REQUEST);
        }
        if (iAccountService.existsAccountByEmail(signUpForm.getEmail())) {
            return new ResponseEntity<>(new ResponseMessage("Email đã tồn tại"), HttpStatus.BAD_REQUEST);
        }
        Account account = new Account(signUpForm.getUsername(), passwordEncoder.encode(signUpForm.getPassword()), signUpForm.getName(), signUpForm.getEmail());
        Set<Role> roles = new HashSet<>();
        Role role = iRoleService.findByName(RoleName.ROLE_CUSTOMER).orElseThrow(() -> new RuntimeException("Role not found"));
        roles.add(role);
        account.setRoles(roles);
        iAccountService.save(account);
        return new ResponseEntity<>(new ResponseMessage("Đăng kí thành công"), HttpStatus.OK);
    }

    @GetMapping("/findUserName/{userName}")
    public ResponseEntity<?> findByUsername(@PathVariable String userName) {
        Optional<Account> account = iAccountService.findByUsername(userName);
        if (account == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(account, HttpStatus.OK);
    }


//    @PatchMapping("/change-password")
//    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordDto changePasswordDto) throws Exception {
//        iAccountService.changePassword(changePasswordDto);
//        return ResponseEntity.ok().build();
//    }
}
