drop table users;

create table users (
	id uuid primary key default uuid_generate_v4(),
	login text,
	password text,
	age integer,
	"isDeleted" boolean default false
);

insert into users(login,password,age) values
('user1','password1',31),
('user2','password2',32),
('user3','password3',33),
('user4','password4',34),
('user5','password5',35)
