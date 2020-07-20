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