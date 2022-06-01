import * as redis from 'redis'

// console.log('redis:', redis)

let client = redis.createClient({
  url: 'redis://172.18.0.3:6379/0',
})

async function main() {
  await client.connect()
  let visitor = await client.get('visitor')
  console.log('visitor:', visitor)
  await client.set('visitor', +(visitor || 0) + 1)
  await client.incrBy('visitor', 10)
  await client.disconnect()
}
main()
