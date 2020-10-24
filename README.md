# doodledrop 

## Notes

#### Notificationsystem
Table: notifications
id (integer) | user_id (integer)  | notifi_type (enum) | timestamp (date)
--- | --- | --- | ---
1 | 2 | "doodle_liked" | "1603557837052"

Notfi_type: 
- `doodle_liked`
- `doodle_dislike` 
- `doodle_commented`
- `...` <br>

Example Query: 
```sql
SELECT * FROM notifications WHERE user_id = 6356 ORDER BY timestamp DESC;
```

Source:
[https://www.quora.com/What-is-the-best-way-to-store-notifications-in-the-database-MySQL-of-a-web-application-It-seems-as-though-the-amount-of-notifications-each-user-of-the-site-would-receive-will-total-to-a-very-large-number-in-the-database](source)

#### Followersystem
Table: followers
Columns: 
id (integer) | user_id (integer) | followed_id (integer)
--- | --- | ---
1 | 3 | 4
2 | 4 | 3

Example query to get following users from a user: 
```sql
SELECT * FROM users INNER JOIN followers ON id = user_id WHERE id = 2;
```
Example query to get followers from a user: 
```sql
SELECT * FROM users INNER JOIN followers ON id = followed_id WHERE id = 2;
```
Source:
[https://stackoverflow.com/questions/19734154/followers-following-database-structure/19734232](source)


#### Authenticationsystem

Auth routes:
- `/api/auth/login`
- `/api/auth/register`

##### Hitting `/login` route

1. Check if the input is valid
2. Check if the user exists
3. Check if the password is correct
4. Generate a JWT Token and set it to the response headers

##### Hitting `/register` route

1. Check if the input is valid
2. Check if the user doesnt already exist
3. Hash the password
4. Insert it to the database


