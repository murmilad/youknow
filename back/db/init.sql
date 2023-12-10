SELECT 'CREATE USER postgres'
WHERE NOT EXISTS(SELECT FROM pg_catalog.pg_roles WHERE rolname = 'postgres')\gexec

SELECT 'CREATE DATABASE youknow'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'youknow')\gexec

GRANT ALL PRIVILEGES ON DATABASE youknow TO postgres;

\c youknow;
 
CREATE TABLE IF NOT EXISTS users (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    name character varying(255) NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    role character varying(255) NOT NULL,
    provider text NOT NULL,
    photo text NOT NULL,
    verification_code text,
    verified boolean NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    UNIQUE (email, provider)
);

CREATE TABLE IF NOT EXISTS know_types (
    id bigint GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    name text NOT NULL,
    style text NOT NULL,
    user_id uuid NOT NULL REFERENCES users(id),
    deleted boolean NOT NULL DEFAULT false
);

CREATE TABLE IF NOT EXISTS knows (
    id bigint GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    knowtype_id bigint NOT NULL REFERENCES know_types(id),
    lessontype_id bigint NOT NULL REFERENCES lesson_types(id),
    name text NOT NULL,
    value text NOT NULL,
    deleted boolean NOT NULL DEFAULT false
);

CREATE TABLE IF NOT EXISTS lesson_types (
    lesson_handler text PRIMARY KEY,
    deleted boolean NOT NULL DEFAULT false
);

CREATE TYPE know_status AS ENUM ('KNOW_NEW', 'KNOW_RIGHT', 'KNOW_WRONG');
CREATE TABLE IF NOT EXISTS lessons_knows (
    know_id bigint NOT NULL REFERENCES know(id),
    lesson_id bigint NOT NULL REFERENCES lesson(id),
    know_status know_status NOT NULL DEFAULT 'KNOW_NEW',
    ask_at timestamp with time zone NOT NULL,
    ask_times int NOT NULL,
    deleted boolean NOT NULL DEFAULT false,
    PRIMARY KEY (know_id, lesson_id)
);

CREATE TYPE lesson_status AS ENUM ('LESSON_NEW', 'LESSON_STARTED', 'LESSON_FINISHED');
CREATE TABLE IF NOT EXISTS lesson (
    id bigint GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    show_at timestamp with time zone NOT NULL,
    show_times int NOT NULL,
    lessontype_id bigint NOT NULL REFERENCES lesson_types(id),
    lesson_status lesson_status NOT NULL DEFAULT 'LESSON_NEW',
    user_id uuid NOT NULL REFERENCES users(id),
    deleted boolean NOT NULL DEFAULT false,
);


--ALTER TABLE knows add lessontype_id bigint NOT NULL REFERENCES lesson_types(id)
