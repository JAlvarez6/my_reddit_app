// Extracts images from the reddit post gallery property
export const galleryImages = (galleryData) => {
  const gallery = []

  for (const item in galleryData) {
    const itemData = galleryData[item]

    const url = itemData.s.u ?? itemData.s.gif

    gallery.push(url.split('amp;').join(''))
  }

  return gallery
}

// Moves gallery images to the right
export const galleryRight = (e) => {
  e.stopPropagation()

  const galleryContainerID = document.activeElement.parentElement.id
  const galleryContainer = document.getElementById(galleryContainerID)
  const gallerySlides = galleryContainer.querySelectorAll('.gallery-slide')

  Object.values(gallerySlides).forEach((slide) => {
    if (slide.style.right === '') {
      slide.style.right = 0
    }

    // Checks if gallery is at the end
    if ((gallerySlides.length - 1) * 100 === parseFloat(slide.style.right)) {
      return
    }

    let rightStyle = parseFloat(slide.style.right)

    rightStyle += 100

    slide.style.right = rightStyle + '%'
  })
}

// Moves gallery images to the left
export const galleryLeft = (e) => {
  e.stopPropagation()

  const galleryContainerID = document.activeElement.parentElement.id
  const galleryContainer = document.getElementById(galleryContainerID)
  const gallerySlides = galleryContainer.querySelectorAll('.gallery-slide')

  Object.values(gallerySlides).forEach((slide) => {
    if (slide.style.right === '') {
      slide.style.right = 0
    }

    // Checks if gallery is at the beginning
    if (parseFloat(slide.style.right) === 0) {
      return
    }

    let rightStyle = parseFloat(slide.style.right)

    rightStyle -= 100

    slide.style.right = rightStyle + '%'
  })
}
