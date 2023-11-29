--trigger for update_at
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

create table team(
    id serial primary key,
    name varchar(255) not null,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp
);

CREATE TRIGGER update_user_type_modtime
BEFORE UPDATE ON team
FOR EACH ROW
EXECUTE PROCEDURE update_timestamp();

create table user_type(
    id serial primary key,
    name varchar(255) not null,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp
);

CREATE TRIGGER update_user_type_modtime
BEFORE UPDATE ON user_type
FOR EACH ROW
EXECUTE PROCEDURE update_timestamp();

create table "user" (
    id serial primary key,
    name varchar(255) not null,
    email varchar(255) not null,
    password varchar(255) not null,
    user_type_id integer not null,
    team_id integer not null,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp,
    foreign key (user_type_id) references user_type(id),
    foreign key (team_id) references team(id)
);

CREATE TRIGGER update_user_type_modtime
BEFORE UPDATE ON "user"
FOR EACH ROW
EXECUTE PROCEDURE update_timestamp();

create table party(
    id serial primary key,
    date timestamp not null,
    admin_user_id int not null,
    team_id_a int not null,
    team_id_b int not null,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp,
    foreign key (admin_user_id) references "user"(id),
    foreign key (team_id_a) references team(id),
    foreign key (team_id_b) references team(id)
);

CREATE TRIGGER update_user_type_modtime
BEFORE UPDATE ON party
FOR EACH ROW
EXECUTE PROCEDURE update_timestamp();

create table infraction(
    id serial primary key,
    user_id int not null,
    party_id int not null,
    expiration_date timestamp not null,
    name varchar(255) not null,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp,
    foreign key (user_id) references "user"(id),
    foreign key (party_id) references party(id)
);

CREATE TRIGGER update_user_type_modtime
BEFORE UPDATE ON infraction
FOR EACH ROW
EXECUTE PROCEDURE update_timestamp();