import { Knex } from 'knex'
import { HttpError } from './http-error'

export class BidService {
  constructor(private _knex: Knex) {}

  async bidItem_v1(row: { id: number; bid: number }) {
    let txn = await this._knex.transaction()
    try {
      let item = await txn
        .select('price')
        .from('item')
        .where({ id: row.id })
        .first()
      if (!item) {
        // await txn.rollback()
        throw new HttpError(404, 'item not found')
      }
      if (!(item.price < row.bid)) {
        // await txn.rollback()
        throw new HttpError(
          400,
          'invalid bid, must be greater than ' + item.price,
        )
      }
      await txn('item') //
        .update({ price: row.bid })
        .where({ id: row.id })
      await txn.commit()
      return {
        prev_price: item.price,
      }
    } catch (error) {
      await txn.rollback()
      throw error
    }
  }

  async bidItem_v2(row: { id: number; bid: number }) {
    return this._knex.transaction(async knex => {
      let item = await knex
        .select('price')
        .from('item')
        .where({ id: row.id })
        .first()
      if (!item) {
        // await txn.rollback()
        throw new HttpError(404, 'item not found')
      }
      if (!(item.price < row.bid)) {
        // await txn.rollback()
        throw new HttpError(
          400,
          'invalid bid, must be greater than ' + item.price,
        )
      }
      await knex('item') //
        .update({ price: row.bid })
        .where({ id: row.id })
      return {
        prev_price: item.price,
      }
    })
  }

  async getItemPrice(id: number) {
    let knex = this._knex
    let row = await knex.select('price').from('item').where({ id }).first()
    if (!row) {
      throw new HttpError(404, 'item not found')
    }
    return row.price
  }
}
