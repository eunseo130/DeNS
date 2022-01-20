package com.ssafy.BackEnd.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;


@Entity
@RequiredArgsConstructor
@Table(name = "user")
@Getter @Setter
public class User{

    @Id @Column(name = "email")
    @NotBlank
    private String email;

    @NotBlank
    private String name;

    @NotBlank
    private String password;

    @Column(name = "identity")
    @Enumerated(EnumType.STRING)
    private UserIdentity identity = UserIdentity.UNAUTH;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "salt_id")
    private Salt salt;
//    @Column
//    private boolean emailSuccess;
//
//    public void verifiedSuccess() {
//        emailSuccess = true;
//    }

}
