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
SELECT followers.user_id, followers.follower_id, users.* FROM users INNER JOIN followers ON users.id = followers.follower_id WHERE followers.user_id = 3;
```
Example query to get followers from a user: 
```sql
SELECT followers.user_id, followers.follower_id, users.* FROM users INNER JOIN followers ON users.id = followers.user_id WHERE followers.follower_id = 3;
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

##### Node packages 

- `bycrypt`
- `jsonwebtoken`

##### Useful Links
- [https://medium.com/better-programming/building-basic-react-authentication-e20a574d5e71](React Authentication)
- [https://medium.appbase.io/how-to-implement-authentication-for-your-react-app-cf09eef3bb0b](React Authentication)

#### Creating the client

##### Packages needed (Dev Dependencies)
- `webpack`
- `webpack-cli`
- `webpack-dev-server`
- `@babel/core`
- `babel-loader (the webpack loader responseible for talking to Babel)`
- `@babel/preset-env (for compiling modern Javascript down to ES5)`
- `@babel/preset-react (for compiling JSX and other stuff down to Javascript)`
- `react`
- `react-dom`
- `html-webpack-plugin`
- `~~html-loader~~ don't need this sh** only caused problems`

##### Configuring Babel
`.babelrc`
```js
{
    "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

##### Configuring Webpack
`webpack.config.js`
```js
const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/index.jsx",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    {
                        loader: "sass-loader",
                        options: {
                            implementation: require("sass"),
                        },
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: [".js", ".jsx"],
    },
    devServer: {
        contentBase: [
            path.join(__dirname, "/public/"),
            path.join(__dirname, "/dist/"),
        ],
        compress: true,
        port: 9000,
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./public/index.html",
            filename: "./index.html",
        }),
    ],
};
```

##### Configuring Dev Server
`package.json`
```json
"scripts": {
  "start": "webpack-dev-server --open --mode development",
  "build": "webpack --mode production"
}
```

Source: [https://www.valentinog.com/blog/babel/](Webpack)
#### Webdesign
##### Useful links
- `https://undraw.co/illustrations`
- `https://www.flaticon.com/`
- `https://www.vecteezy.com/browse`
- `https://www.vectorstock.com/royalty-free-vector/social-media-and-news-tips-landing-page-vector-21638743`

## Ideas
- `Show followers in a network using https://visjs.org/`

## Todo
- [ ] ``

## Documentation
Comming soon.
## Setup Server
Comming soon.
## Setup Client
Comming soon.

