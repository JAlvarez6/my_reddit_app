export const galleryImages = (galleryData) => {
  const gallery = []

  for (const item in galleryData) {
    const itemData = galleryData[item]

    const url = itemData.s.u ?? itemData.s.gif

    gallery.push(url.split('amp;').join(''))
  }

  return gallery
}

export const tempFunc1 = (e) => {
  e.stopPropagation()

  const targetGallery = e.target.parentElement.id
  const tempVar1 = document.getElementById(targetGallery)
  const tempVar2 = tempVar1.querySelectorAll('.gallery-slide')

  Object.values(tempVar2).forEach((slide, index) => {
    if (slide.style.right === '') {
      slide.style.right = 0
    }

    if ((tempVar2.length - 1) * 100 === parseFloat(slide.style.right)) {
      return
    }

    let num1 = parseFloat(slide.style.right)
    num1 += 100

    slide.style.right = num1 + '%'
  })
}

export const tempFunc2 = (e) => {
  e.stopPropagation()

  const targetGallery = e.target.parentElement.id
  const tempVar1 = document.getElementById(targetGallery)
  const tempVar2 = tempVar1.querySelectorAll('.gallery-slide')

  Object.values(tempVar2).forEach((slide, index) => {
    if (slide.style.right === '') {
      slide.style.right = 0
    }

    if (parseFloat(slide.style.right) === 0) {
      return
    }

    let num1 = parseFloat(slide.style.right)
    num1 -= 100

    slide.style.right = num1 + '%'
  })
}
