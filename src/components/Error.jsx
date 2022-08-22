import { useState,useEffect} from "react"
function Error({children}){

    return(
        <div className="bg-red-700 text-white font-bold text-center p-3 uppercase rounded-lg mb-3">
        {children}
     </div> 
    )
}

export default Error