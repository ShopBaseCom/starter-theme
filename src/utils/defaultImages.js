const assets = {
  imagePlaceholder: 'image-placeholder.svg',
  productPlaceholder: 'product-placeholder.svg',
  smallProductPlaceholder: 'small-product-placeholder.svg',
  logoPlaceholder: 'logo.png',
  homepage: {
    bigImage: 'big-image.svg',
  },
  featureCollection: {
    shoe: 'shoe.svg',
    camera: 'camera.svg',
    watch: 'watch.svg',
    recorder: 'recorder.svg',
    watch2: 'watch-2.svg',
    highHeel: 'high-heel.svg',
    lens: 'lens.svg',
    bag: 'bag.svg',
  },
  collectionList: {
    cameras: 'cameras.svg',
    shoes: 'shoes.svg',
    watches: 'watches.svg',
  },
}

export default function(option) {
  if (!assets.hasOwnProperty(option)) return {}
  if (typeof assets[option] === 'string' || assets[option] instanceof String) {
    return require(`../assets/images/default/${assets[option]}`)
  }
  const settings = {}
  Object.keys(assets[option]).forEach((key) => {
    settings[key] = require(`../assets/images/default/${assets[option][key]}`)
  })
  return settings
}
