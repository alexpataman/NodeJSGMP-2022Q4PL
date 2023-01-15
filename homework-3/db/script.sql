drop table users;

create table users (
	id uuid primary key default uuid_generate_v4(),
	login text,
	password text,
	age integer,
	"isDeleted" boolean default false,
	"createdAt" timestamp,
	"updatedAt" timestamp
);

insert into users(login,password,age,"createdAt") values
('user1','password1',31, NOW()),
('user2','password2',32, NOW()),
('user3','password3',33, NOW()),
('user4','password4',34, NOW()),
('user5','password5',35, NOW())
