/**
 * Combines all defined resolutions into a singe chain
 * Inspired by https://github.com/reactjs/redux/blob/master/src/compose.js
 */
export default function composeResolutions(resolutions) {

  const last = resolutions[resolutions.length - 1]
  const rest = resolutions.slice(0, -1)

  return rest.reduceRight((chain, f) => (
      (props) => (
        f({
          ...props,
          next: chain
        }))),
    (props) => (
      last({
        ...props,
        next: null
      }))
  )
}
