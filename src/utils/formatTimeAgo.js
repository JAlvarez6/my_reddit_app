// Checks and formats how much time has passsed from the epoch passed in
export const formatTimeAgo = (date) => {
  const rft = new Intl.RelativeTimeFormat('en-us', {
    style: 'long',
    numeric: 'always',
  })

  const time_units = [
    { amount: 60, name: 'seconds' },
    { amount: 60, name: 'minutes' },
    { amount: 24, name: 'hours' },
    { amount: 7, name: 'days' },
    { amount: 4.34524, name: 'weeks' },
    { amount: 12, name: 'months' },
    { amount: Number.POSITIVE_INFINITY, name: 'years' },
  ]

  const temp_date = new Date(date * 1000)

  let date_dif = (temp_date - new Date()) / 1000

  for (let i = 0; i < time_units.length; i++) {
    const unit = time_units[i]

    if (Math.abs(date_dif) < unit.amount) {
      return rft.format(Math.round(date_dif), unit.name)
    }

    date_dif /= unit.amount
  }
}
