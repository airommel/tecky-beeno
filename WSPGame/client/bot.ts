let params = new URLSearchParams(location.search)
switch (params.get('bot')) {
  case 'farmer':
    import('./bot/farmer-bot')
    break
  case 'hunter':
    import('./bot/hunter-bot')
    break
  case 'random':
  default:
    import('./bot/random-bot')
    break
}
