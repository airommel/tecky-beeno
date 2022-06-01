type 無 = void

class 承諾<Result> {
  private 成功嘅話: Array<(result: Result) => 無> = []
  private 反口嘅話: Array<(error: any) => 無> = []
  private 有結果 = false
  private 結果?: Result
  private error?: any
  private 成功?: boolean

  constructor(
    嘗試做: (提供: (result: Result) => 無, 反口: (error: any) => 無) => 無,
  ) {
    嘗試做(this.提供, this.反口)
  }

  // resolve
  private 提供 = (result: Result) => {
    if (this.有結果) return
    this.有結果 = true
    this.成功 = true
    this.結果 = result
    this.成功嘅話.forEach(報喜 => 報喜(result))
  }

  // reject
  private 反口 = (error: any) => {
    if (this.有結果) return
    this.有結果 = true
    this.成功 = false
    this.error = error
    this.反口嘅話.forEach(唱通街 => 唱通街(error))
  }

  // Promise.then
  如果可以就<FutureResult>(
    跟住做: (result: Result) => FutureResult,
  ): 承諾<FutureResult> {
    return new 承諾((提供, 反口) => {
      let 下一步 = (結果: Result) => {
        try {
          let 下一步結果 = 跟住做(結果)
          提供(下一步結果)
        } catch (error) {
          反口(error)
        }
      }
      if (this.有結果) {
        if (this.成功) {
          下一步(this.結果!)
        } else {
          反口(this.error)
        }
      } else {
        this.成功嘅話.push(下一步)
        this.反口嘅話.push(反口)
      }
    })
  }

  // Promise.catch
  如果唔得就<FutureResult>(
    planB: (error: any) => FutureResult,
  ): 承諾<FutureResult | Result> {
    return new 承諾((提供, 反口) => {
      let 下一步 = (error: any) => {
        try {
          let 下一步結果 = planB(error)
          提供(下一步結果)
        } catch (error) {
          反口(error)
        }
      }
      if (this.有結果) {
        if (this.成功) {
          提供(this.結果!)
        } else {
          下一步(this.error)
        }
      } else {
        this.成功嘅話.push(提供)
        this.反口嘅話.push(下一步)
      }
    })
  }
}

export function test1() {
  let 訂婚 = new 承諾((提供, 反口) => {
    console.log('進行訂婚')
    setTimeout(() => {
      if (Math.random() > 0.5) {
        提供(['樓'])
        提供(['車'])
        setTimeout(() => {
          反口('買唔起')
        }, 1000)
      } else {
        反口('頭頂生草')
        setTimeout(() => {
          提供(['樓', '車'])
        }, 1000)
      }
    }, 1000)
    console.log('做完訂婚')
  })
  setTimeout(() => {
    console.log('plan next step')
    訂婚.如果可以就(訂婚結果 => {
      console.log('Congratulation, 你收到:', 訂婚結果)
      return '去配鑰匙'
    })
      .如果唔得就(error => {
        console.log('So sad:', error)
        return '俾多次機會, 去買花'
      })
      .如果可以就(result => {
        console.log('result:', result)
      })
  }, 2000)
}

export function test2() {
  let promise = new Promise((resolve, reject) => {
    console.log('進行訂婚')
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve(['樓', '車'])
        setTimeout(() => {
          reject('買唔起')
        }, 1000)
      } else {
        reject('頭頂生草')
        setTimeout(() => {
          resolve(['樓', '車'])
        }, 1000)
      }
    }, 1000)
    console.log('做完訂婚')
  })
  setTimeout(() => {
    console.log('Plan next step')
    promise
      .then(訂婚結果 => {
        console.log('Congratulation, 你收到:', 訂婚結果)
        return '去配鑰匙'
      })
      .catch(error => {
        console.log('So sad:', error)
        return '俾多次機會, 去買花'
      })
      .then(result => {
        console.log('result:', result)
      })
  }, 2000)
}

test1()
