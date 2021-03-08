export const scrollPage = (...args) =>{
    const x = args[0]?args[0]:0
    const y = args[1]?args[1]:0
    window.scrollTo(x,y)
}