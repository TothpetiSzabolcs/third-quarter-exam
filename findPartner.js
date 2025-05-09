function findPartner(customer, candidates) {
  const filteredCandidates = candidates.filter(candidate => candidate.favoriteGenre === customer.favoriteGenre && candidate.hobbies.some(hobby => customer.hobbies.includes(hobby)))

  let youngest = filteredCandidates[0]

  for (let i = 0; i < filteredCandidates.length; i++) {
    if (filteredCandidates[i].age < youngest.age) {
      youngest = filteredCandidates[i]
    }
  }
  return youngest || null
}


module.exports = findPartner