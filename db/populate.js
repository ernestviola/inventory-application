import { Client } from 'pg';

const SQL = `
create table if not exists category (
  id integer primary key generated always as identity,
  name varchar(255),
  imageUrl text
);

create table if not exists item (
  id integer primary key generated always as identity,
  name varchar(255),
  quantity integer,
  price float,
  imageUrl text,
  category_id integer not null references category(id) on delete cascade
);
`;

async function main() {
  console.log('seeding...');
  const dbString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;
  console.log(dbString);
  const client = new Client({
    connectionString: dbString,
  });

  await client.connect();
  const result = await client.query(SQL);
  console.log(result);
  await client.end();
  console.log('done');
}

main();
