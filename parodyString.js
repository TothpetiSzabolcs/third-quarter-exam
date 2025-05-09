function parodyString(string) {
  return string.split('').map((character, index) => index % 2 === 0 ? character.toUpperCase() : character.toLowerCase()).join('')
}

module.exports = parodyString