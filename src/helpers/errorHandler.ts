export const errorHandler = (name:any,text:any,...args:any)=>{
    console.log(`ERROR:${text}
    AT METHOD:${name},
    ARGUMENTS:${[...args]}`)
}

