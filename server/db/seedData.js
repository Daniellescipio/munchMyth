const client = require('./client');
const uuid = require('uuid');
// const {recipes} = require('data.js');
// const data = require('data.json');
const {createIngredient} = require('./ingredients');
const {ingredients} = require('./ingrSeedData')
// const {createRecipe, createRecipeIngredient} = require('./recipes')
// const recipes = require('./recipeSeedData');
const {createWorld} = require('./worlds');
const {worlds} = require('./worldSeedData');
const {createUser, createUserRecipe} = require('./users');
const {users} = require('./userSeedData')

//drop all tables if any exist
const dropTables = async () => {
  const SQL = `
  DROP TABLE IF EXISTS user_recipe;
  DROP TABLE IF EXISTS recipe_ingredient;
  DROP TABLE IF EXISTS image_url; 
  DROP TABLE IF EXISTS ingredient_allergen;
  DROP TABLE IF EXISTS ingredients;
  DROP TABLE IF EXISTS allergens;
  DROP TABLE IF EXISTS users CASCADE;
  DROP TABLE IF EXISTS worlds CASCADE;
  DROP TABLE IF EXISTS recipes CASCADE;
  `;
  await client.query(SQL);
};

//async function to create tables back
const createTables = async () => {
  const SQL = `
    CREATE TABLE worlds(
      id UUID PRIMARY KEY,
      name VARCHAR(100) NOT NULL UNIQUE,
      img_url VARCHAR(500)
    );
    CREATE TABLE users(
      id UUID PRIMARY KEY,
      username VARCHAR(255) UNIQUE,
      email VARCHAR(255) UNIQUE,
      password VARCHAR(255) NOT NULL
    );
    CREATE TABLE ingredients(
      id UUID PRIMARY KEY,
      name VARCHAR(255) NOT NULL UNIQUE,
      description TEXT
    );
    CREATE TABLE recipes(
      id UUID PRIMARY KEY,
      name VARCHAR(255) NOT NULL UNIQUE,
      description TEXT,
      cook_time VARCHAR(255),
      world_name VARCHAR(500),
      instructions TEXT,
      img_url VARCHAR(500)
    );
    CREATE TABLE recipe_ingredient(
      id UUID PRIMARY KEY,
      recipe_name VARCHAR(255) NOT NULL,
      ingredient_name VARCHAR(255) NOT NULL,
      amount INT,
      unit VARCHAR(255)
    );
    CREATE TABLE user_recipe(
      id UUID PRIMARY KEY,
      user_id UUID REFERENCES users(id) NOT NULL,
      recipe_id UUID REFERENCES recipes(id) NOT NULL,
      rating INT,
      review TEXT,
      bookmarked boolean DEFAULT false
    );
  `;
  await client.query(SQL);
};

//  CREATE TABLE tags(
//   id SERIAL PRIMARY KEY,
//   description TEXT
// );
// CREATE TABLE recipe_tags(
//   id UUID PRIMARY KEY,
//   recipe_name VARCHAR(255),
//   tag_id SERIAL REFERENCES tag(id),
//   description TEXT
// );

// const seedWorlds = async (worlds) => {
//   const arrayOfPromises = worlds.forEach(world => {
//     return createWorld(name, img_url)
//   })
//   const newWorlds = await Promise.all(arrayOfPromises)
//   return newWorlds
// }

async function seedWorlds(client) {
  try {
    for (const world of worlds) {
      const createdWorld = await createWorld(world);
      console.log(`Created world: ${createdWorld.name}`); // 
    }
  } catch (error) {
    console.error('Error seeding worlds:', error);
    throw error; // Re-throw to indicate failure
  }
};

async function seedUsers(client) {
  try {
    for (const user of users) {
      const createdUser = await createUser(user);
      console.log(`Created user: ${createdUser.username}`); // 
    }
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error; // Re-throw to indicate failure
  }
};

async function seedIngr(client) {
  try {
    for (const ingredient of ingredients) {
      const createdIngr = await createIngredient(ingredient);
      console.log(`Created ingr: ${createdIngr.name}`); // 
    }
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error; // Re-throw to indicate failure
  }
};

// async function seedInst(client) {
//   try {
//     for (const instruction of instruction) {
//       const createdInst = await createInstruction(instruction);
//       console.log(`Created ingr: ${createdInst.name}`); // 
//     }
//   } catch (error) {
//     console.error('Error seeding users:', error);
//     throw error; // Re-throw to indicate failure
//   }
// };

async function rebuild() {
  try {
      await client.connect()
      await dropTables()
      console.log('tables yeeted')
      await createTables()
      console.log('made tables')
      await seedWorlds()
      console.log('we got worlds')
      await seedUsers()
      console.log('made users')
      await seedIngr()
      console.log('ingredients seeded')
  } catch (error) {
    console.log(error.message);
  }
};

// rebuild().finally(() => client.end());
module.exports = {
  rebuild,
};
