CREATE SEQUENCE public.auth_user_id_seq;

CREATE TABLE public.auth_user (
                id INTEGER NOT NULL DEFAULT nextval('public.auth_user_id_seq'),
                nombre VARCHAR(30) NOT NULL,
                apellido VARCHAR(30) NOT NULL,
                descripcion VARCHAR(500),
                email VARCHAR(50) NOT NULL,
                username VARCHAR(20) NOT NULL,
                password VARCHAR NOT NULL,
                CONSTRAINT auth_user_pk PRIMARY KEY (id)
);


ALTER SEQUENCE public.auth_user_id_seq OWNED BY public.auth_user.id;

------------------------------------------------------------------------------------------------

ALTER TABLE auth_user ADD COLUMN is_private BOOLEAN DEFAULT TRUE;

------------------------------------------------------------------------------------------------

CREATE TABLE public.follower (
                follower INTEGER NOT NULL,
				        followed INTEGER NOT NULL,
                CONSTRAINT follower_followed_pk PRIMARY KEY (follower, followed)
);

ALTER TABLE public.follower ADD CONSTRAINT follower_fk
FOREIGN KEY (follower)
REFERENCES public.auth_user (id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.follower ADD CONSTRAINT followed_fk
FOREIGN KEY (followed)
REFERENCES public.auth_user (id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;


CREATE SEQUENCE public.post_id_seq;

CREATE TABLE public.post (
				id INTEGER NOT NULL DEFAULT nextval('public.post_id_seq'),
				user_id INTEGER NOT NULL,
        foto VARCHAR,
				descripcion VARCHAR,
				fecha TIMESTAMP NOT NULL DEFAULT now(),
				CONSTRAINT post_pk PRIMARY KEY (id)
);

ALTER SEQUENCE public.post_id_seq OWNED BY public.post.id;

ALTER TABLE public.post ADD CONSTRAINT post_user_fk
FOREIGN KEY (user_id)
REFERENCES public.auth_user (id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;