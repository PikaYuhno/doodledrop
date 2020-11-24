
CREATE TABLE "public"."channels"
(
 "id"   uuid NOT NULL,
 "name" varchar(255) NOT NULL,
 CONSTRAINT "PK_channels" PRIMARY KEY ( "id" )
);

CREATE TABLE "public"."comments"
(
 "id"         integer NOT NULL,
 "doodle_id"  integer NOT NULL,
 "user_id"    integer NOT NULL,
 "content"    text NOT NULL,
 "created_at" date NOT NULL,
 "likes"      integer[] NOT NULL,
 "dislikes"   integer[] NOT NULL,
 CONSTRAINT "PK_comments" PRIMARY KEY ( "id" ),
 CONSTRAINT "FK_48" FOREIGN KEY ( "doodle_id" ) REFERENCES "public"."doodles" ( "id" ),
 CONSTRAINT "FK_51" FOREIGN KEY ( "user_id" ) REFERENCES "public"."users" ( "id" )
);

CREATE INDEX "fkIdx_48" ON "public"."comments"
(
 "doodle_id"
);

CREATE INDEX "fkIdx_51" ON "public"."comments"
(
 "user_id"
);

CREATE TABLE "public"."doodles"
(
 "id"         integer NOT NULL,
 "user_id"    integer NOT NULL,
 "image_path" varchar(255) NOT NULL,
 "likes"      integer[] NOT NULL,
 "dislikes"   integer[] NOT NULL,
 CONSTRAINT "PK_doodles" PRIMARY KEY ( "id" ),
 CONSTRAINT "FK_37" FOREIGN KEY ( "user_id" ) REFERENCES "public"."users" ( "id" ),
 CONSTRAINT "check_31" CHECK (  )
);

CREATE INDEX "fkIdx_37" ON "public"."doodles"
(
 "user_id"
);


CREATE TABLE "public"."followers"
(
 "id"          integer NOT NULL,
 "user_id"     integer NOT NULL,
 "follower_id" integer NOT NULL,
 CONSTRAINT "PK_followers" PRIMARY KEY ( "id" ),
 CONSTRAINT "FK_66" FOREIGN KEY ( "user_id" ) REFERENCES "public"."users" ( "id" ),
 CONSTRAINT "FK_69" FOREIGN KEY ( "follower_id" ) REFERENCES "public"."users" ( "id" )
);

CREATE INDEX "fkIdx_66" ON "public"."followers"
(
 "user_id"
);

CREATE INDEX "fkIdx_69" ON "public"."followers"
(
 "follower_id"
);

CREATE TABLE "public"."messages"
(
 "id"                integer NOT NULL,
 "channel_id"        uuid NOT NULL,
 "user_id"           integer NOT NULL,
 "body"              text NOT NULL,
 "message_createdAt" date NOT NULL,
 CONSTRAINT "PK_messages" PRIMARY KEY ( "id" ),
 CONSTRAINT "FK_84" FOREIGN KEY ( "channel_id" ) REFERENCES "public"."channels" ( "id" ),
 CONSTRAINT "FK_87" FOREIGN KEY ( "user_id" ) REFERENCES "public"."users" ( "id" )
);

CREATE INDEX "fkIdx_84" ON "public"."messages"
(
 "channel_id"
);

CREATE INDEX "fkIdx_87" ON "public"."messages"
(
 "user_id"
);


CREATE TABLE "public"."users"
(
 "id"            integer NOT NULL,
 "username"      varchar(255) NOT NULL,
 "first_name"    varchar(255) NOT NULL,
 "last_name"     varchar(255) NOT NULL,
 "password"      varchar(255) NOT NULL,
 "email"         varchar(255) NOT NULL,
 "created_posts" integer NOT NULL,
 "pfp_pic_path"  varchar(255) NOT NULL,
 "bio"           text NULL,
 "location"      varchar(255) NULL,
 CONSTRAINT "PK_users" PRIMARY KEY ( "id" )
);
