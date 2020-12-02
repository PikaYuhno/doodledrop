# Server

## Models
- Doodle
- User
- Comment
- Channel
- Message
- Follower

## Routes
### Users Routes (/api/users)
- `GET /`
- `GET /:id`
- `POST /`
- `PATCH /:id`
- `DELETE /:id`
- `GET /doodles`
- `POST /follow/:id`
- `POST /unfollow/:id`

### Auth Routes (/api/auth/)
- `POST /login`
- `POST /register`

### Doodle Routes (/api/doodles)
- `PATCH /:id/comments/:c_id`
- `DELETE /:id/comments/:c_id`
- `POST /:id/comments`
- `GET /:id/comments`
- `GET /`
- `GET /:id`
- `POST /`
- `PATCH /:id/like`
- `PATCH /:id/dislike`
- `DELETE /:id`
