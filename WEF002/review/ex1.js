const data = [
  {
    name: 'Hong Kong',
    topLevelDomain: ['.hk'],
    alpha2Code: 'HK',
    alpha3Code: 'HKG',
    callingCodes: ['852'],
    capital: 'City of Victoria',
    altSpellings: ['HK', '香港'],
    region: 'Asia',
    subregion: 'Eastern Asia',
    population: 7324300,
    latlng: [22.25, 114.16666666],
    demonym: 'Chinese',
    area: 1104.0,
    gini: 53.3,
    timezones: ['UTC+08:00'],
    borders: ['CHN'],
    nativeName: '香港',
    numericCode: '344',
    currencies: [
      {
        code: 'HKD',
        name: 'Hong Kong dollar',
        symbol: '$',
      },
    ],
    languages: [
      {
        iso639_1: 'en',
        iso639_2: 'eng',
        name: 'English',
        nativeName: 'English',
      },
      {
        iso639_1: 'zh',
        iso639_2: 'zho',
        name: 'Chinese',
        nativeName: '中文 (Zhōngwén)',
      },
    ],
    translations: {
      de: 'Hong Kong',
      es: 'Hong Kong',
      fr: 'Hong Kong',
      ja: '香港',
      it: 'Hong Kong',
      br: 'Hong Kong',
      pt: 'Hong Kong',
      nl: 'Hongkong',
      hr: 'Hong Kong',
      fa: 'هنگ‌کنگ',
    },
    flag: 'https://restcountries.eu/data/hkg.svg',
    regionalBlocs: [],
    cioc: 'HKG',
  },
]

const hk = data[0]

// console.log(hk)

for (const key in hk) {
  const title = key[0].toUpperCase() + key.substring(1)
  const value = hk[key]
  if (Array.isArray(value)) {
    // this is an array

    if (value.length == 0) {
      // this is an empty array
      console.log(title + ': ' + '<empty>')
    } else {
      // this is an non-empty array
      let firstItem = value[0]
      if (typeof firstItem == 'object') {
        // this is an array of object
        // console.log(title + ': ' + 'TODO Array' + '_(x_x)_'.repeat(32))
        for (const item of value) {
          for (const key in item) {
            const inner_title = title + '_' + key
            const inner_value = item[key]
            console.log(inner_title + ': ' + inner_value)
          }
        }
      } else {
        // this is an array of non-object
        console.log(title + ': ' + value)
      }
    }

    value[0]
  } else if (typeof value == 'object') {
    // this is really an 'object'
    for (const key in value) {
      const inner_title = title + '_' + key
      const inner_value = value[key]
      console.log(inner_title + ': ' + inner_value)
    }
  } else {
    // this is something else
    console.log(title + ': ' + value)
  }
}
