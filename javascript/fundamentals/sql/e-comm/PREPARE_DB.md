# Preparing the database

Do the following as root

```
create database shopdb;
create user root identified by '';
use shopdb;
grant all privileges on shopdb to shopper;
grant all privileges on shopdb.* to shopper;
```
