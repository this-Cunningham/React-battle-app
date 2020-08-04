const id = 'cbebd6ae64a46ac8dfa4'
const sec = 'b6c354cb1c1858eebe173524f985a94fbfc103cc'
const params = `?client_id=${id}&client_secret=${sec}` //this is to append to each request if ratelimited

function onErrorMsg(message, username) {
  if (message === 'Not Found'){
    return `${username} doesn't exist!`
  }
  return message
}

function getUserProfile(username) {
  return fetch(`https://api.github.com/users/${username}`)
    .then((res)=>res.json())
    .then((profile)=>{
      if (profile.message) {
        throw new Error (onErrorMsg(profile.message, username))
      }
      return profile
    })
}

function getUserRepos(username) {
  return fetch(`https://api.github.com/users/${username}/repos?per_page=50`)
    .then((res)=>res.json())
    .then((repos)=> {
      if (repos.message) {
        throw new Error (onErrorMsg(repos.message, username))
      }
      return repos
    })
}

function calculateStars (repos) {
  return repos.reduce((count, {stargazers_count})=> count + stargazers_count, 0)
}

function calculateScore (followers, repos) {
  return (followers*3)+ calculateStars(repos)
}

function getUserData(player){
  return Promise.all([
    getUserProfile(player),
    getUserRepos(player)
  ]).then(([profile, repos])=>({
    profile,
    score: calculateScore(profile.followers, repos)
  }))
}

function sortResults(data){
  return data.sort((a,b)=>b.score - a.score)
}

export function battle (players) {
  return Promise.all([
    getUserData(players[0]),
    getUserData(players[1])
  ]).then((results)=>sortResults(results))
}

export function fetchPopularRepos (language) {
  const endpoint = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`)

  return fetch(endpoint)
    .then((res)=>res.json())
    .then((data)=> {
      if (!data.items) {
        throw new Error ('Error fetching repos', data.message)
      }

      return data.items
  })
}
