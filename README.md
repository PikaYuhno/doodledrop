# doodledrop 

## Notes

[https://www.quora.com/What-is-the-best-way-to-store-notifications-in-the-database-MySQL-of-a-web-application-It-seems-as-though-the-amount-of-notifications-each-user-of-the-site-would-receive-will-total-to-a-very-large-number-in-the-database](source)
Notificationsystem: 
    Table: notifications
    Columns: id: integer | user_id: integer  | notifi_type: enum | timestamp: date
    Notfi_type: doodle_liked, doodle_dislike, doodle_commented, ...
    Example Query: `SELECT * FROM notifications WHERE user_id = 6356 ORDER BY timestamp DESC;`

[https://stackoverflow.com/questions/19734154/followers-following-database-structure/19734232](source)
Followersystem:
    Table: followers
    Columns: id: integer | user_id: integer | followed_id
    Example query to get following users from a user: `SELECT * FROM users INNER JOIN followers ON id = user_id WHERE id = 2`;
    Example query to get followers from a user: `SELECT * FROM users INNER JOIN followers ON id = followed_id WHERE id = 2`;


