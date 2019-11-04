export const GroupImage = {
  name: 'GroupImage',
  data() {
    return {
      variantGroupLoaded: false,
      variantGroupImageLoaded: {},
      variantGroupImageMaxHeight: 0,
    }
  },
  methods: {
    calculateMaxHeightForGroupImage() {
      const domImages = document.getElementsByClassName('product__image-option')
      if (domImages && domImages.length) {
        const images = []
        Array.prototype.slice.call(domImages).map((i) => {
          if (i.clientHeight) {
            images.push({
              width: i.clientWidth,
              height: i.clientHeight,
              ratio: i.clientWidth / i.clientHeight,
            })
          }
        })
        // check the majority ratio of images
        const numOfVerticals = images.filter(({ ratio }) => ratio < 1).length

        let majority = []
        if (numOfVerticals > images.length / 2) {
          // get all vertical images
          majority = images.filter(({ ratio }) => ratio < 1)
        } else {
          // get all horizontal images
          majority = images.filter(({ ratio }) => ratio >= 1)
        }

        const averageHeight =
          majority.reduce((sum, image) => sum + image.height, 0) /
          majority.length

        // get the closest height of the majority to the average height
        this.variantGroupImageMaxHeight = majority
          .map((image) => image.height)
          .reduce(function(prev, curr) {
            return Math.abs(curr - averageHeight) <
              Math.abs(prev - averageHeight)
              ? curr
              : prev
          }, [])

        setTimeout(() => {
          this.variantGroupLoaded = true
        }, 200)
      }
    },
  },
}
