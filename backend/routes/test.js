
const test = ()=>{
    console.log("hello")
    return new Promise((res,rej)=>{
        console.log("rtrtrtrert")
        res("test")
    })
}


test()
// .then((data)=>{
//     console.log(data)
//     test
// })
