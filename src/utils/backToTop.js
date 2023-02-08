export const handleScrollToTop = () => {
  const toTopButton = document.querySelector('.backToTop-button')

  if (window.scrollY > 1700) {
    toTopButton.style.display = 'block'
  } else {
    toTopButton.style.display = 'none'
  }
}

export const backToTop = () => {
  window.scrollTo({ left: 0, top: 0, behavior: 'smooth' })
}
