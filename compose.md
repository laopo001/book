function compose(...args) {
  return (result) => {
    return args.reduceRight((result, fn) => {
      return fn(result)
    }, result)
  }
}