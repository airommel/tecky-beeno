import { Person } from './03-person'
import { Bar } from './04-bar'

describe('Bar class', () => {
  let bar: Bar
  beforeEach(() => {
    bar = new Bar()
  })
  it('should has enter() method', () => {
    expect(typeof bar.enter).toBe('function')
  })
  it('should allow adult to drink', () => {
    let alice = new Person('alice', 18)
    jest.spyOn(alice, 'drink').mockImplementation(() => {
      // console.log('fake drink by alice')
    })

    // let originalDrink = alice.drink.bind(alice)
    // alice.drink = jest.fn((...args: any[]) => originalDrink(...args))

    let group = [alice]
    bar.enter(group)
    expect(alice.drink).toBeCalled()
  })
  it('should not teen to drink', () => {
    let bob = new Person('bob', 12)
    jest.spyOn(bob, 'drink').mockImplementation(() => {
      // console.log('fake drink by bob')
    })
    let group = [bob]
    bar.enter(group)
    expect(bob.drink).not.toBeCalled()
  })
  it('should not crash on empty list', () => {
    let emptyGroup: Person[] = []
    bar.enter(emptyGroup)
  })
  it('should only allow adult to drink and ignore teens', () => {
    let alice = new Person('alice', 18)
    let bob = new Person('bob', 12)
    let group = [alice, bob]
    group.forEach(person =>
      jest.spyOn(person, 'drink').mockImplementation(() => {}),
    )
    bar.enter(group)
    expect(alice.drink).toBeCalled()
    expect(bob.drink).not.toBeCalled()
  })
})
