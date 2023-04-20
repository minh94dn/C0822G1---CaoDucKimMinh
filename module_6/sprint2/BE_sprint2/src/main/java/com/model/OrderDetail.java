package com.model;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class OrderDetail {
    @Id
    private int id;
    private int quantity;

}
