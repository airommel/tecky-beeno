import { knex } from './knex'

async function main() {
  try {
    console.log('How many files does each user have?')
    let rows = await knex
      .count('file.id as file_count')
      .select('user.id as user_id', 'user.username')
      .from('file')
      .groupBy('user.id')
      .innerJoin('user', 'user.id', 'file.owner_id')
    console.log(rows)

    console.log('How does the files distribute over different categories?')
    rows = await knex
      .count('file.id as file_count')
      .select('category.id as cat_id', 'category.name as cat_name')
      .from('file')
      .groupBy('category.id')
      .innerJoin('category', 'category.id', 'file.category_id')
    console.log(rows)

    console.log('How many files of the category important does alex have ?')
    rows = await knex
      .count('file.id as file_count')
      .from('category')
      .where('category.name', 'iLike', 'important')
      .andWhere('user.username', 'iLike', 'alex')
      .innerJoin('file', 'file.category_id', 'category.id')
      .innerJoin('user', 'user.id', 'file.owner_id')
    console.log(rows)

    let minFileCount = 800
    minFileCount = 420
    console.log(`How many users have more than ${minFileCount} files ?`)
    rows = await knex
      .with(
        'user_list',
        knex
          .select('file.owner_id')
          .from('file')
          .groupBy('file.owner_id')
          // .having('file_count', '>', minFileCount)
          .havingRaw('count(file.owner_id) > ?', [minFileCount]),
      )
      .count('owner_id as user_count')
      .from('user_list')
    console.log(rows)
  } finally {
    await knex.destroy()
  }
}

main()
