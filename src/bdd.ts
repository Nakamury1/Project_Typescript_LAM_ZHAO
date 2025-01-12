import mysql from 'mysql2';

export const bdd = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'Project_Typescript',
});