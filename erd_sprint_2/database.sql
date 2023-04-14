create database sales_management;
use sales_management;

create table role (
id int primary key auto_increment,
name varchar(25)
);

create table account(
id int primary key auto_increment,
name varchar(45),
avatar varchar(255),
address varchar(255),
password varchar(225),
email varchar(45),
phone_number varchar(15),
user_name varchar (45)
);

create table account_role (
id int primary key auto_increment,
id_role int,
id_account int,
foreign key (id_role) references `role`(id),
foreign key (id_account) references account(id)
);

create table category(
id int primary key auto_increment,
name varchar (45)
) ;

create table product (
id int primary key auto_increment,
code varchar(45),
name varchar(45),
description varchar(255),
flag_delete boolean,
image varchar(500),
origin varchar (255),
id_category int,
foreign key (id_category) references category(id)
);

create table `order` (
id int primary key auto_increment ,
date_order date ,
flag_delete boolean,
payment_status boolean,
id_account int,
foreign key (id_account) references account(id)
);

create table `order_detail` (
id int primary key auto_increment ,
quantity int,
id_order int,
id_product int,
foreign key (id_product) references product(id),
foreign key (id_order) references `order`(id)
);




