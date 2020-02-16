-- Table: public.identities

-- DROP TABLE public.identities;

CREATE TABLE public.identities
(
    id SERIAL,
    CONSTRAINT identities_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public.identities
    OWNER to api_user;

-- Table: public.profiles

-- DROP TABLE public.profiles;

CREATE TABLE public.profiles
(
    persona_id integer NOT NULL UNIQUE,
    first_name character varying(255) COLLATE pg_catalog."default",
    last_name character varying(255) COLLATE pg_catalog."default",
    interests text[] COLLATE pg_catalog."default",
    latitude numeric,
    longitude numeric,
    CONSTRAINT profiles_persona_id_fkey FOREIGN KEY (persona_id)
        REFERENCES public.identities (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE public.profiles
    OWNER to api_user;
-- Index: index

-- DROP INDEX public.index;

CREATE INDEX index
    ON public.profiles USING btree
    (persona_id ASC NULLS LAST)
    TABLESPACE pg_default;

INSERT INTO public.identities(id)
    VALUES (1);
INSERT INTO public.identities(id)
    VALUES (2);
INSERT INTO public.identities(id)
    VALUES (3);
INSERT INTO public.identities(id)
    VALUES (4);
INSERT INTO public.identities(id)
    VALUES (5);


INSERT INTO public.profiles(
    first_name, last_name, interests, latitude, longitude, persona_id)
    VALUES ('Jennifer','Liversedge',ARRAY['swimming','biking','running'],39.1156615,-77.5636015,1);
