package com.model;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Product {
    @Id
    private int id;
    private String code;
    private String name;
    private String description;
    private boolean flagDelete;
    private String image;
    private String origin;
}
