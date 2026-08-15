const ErrorResponse=(message:string,status:number)=>{
    const err:any=new Error(message)
    err.statusCode=status
    throw err
}
export default ErrorResponse