import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../context/AuthContext";

function Protected({children}) {
    const {user} = useContext(Context);

    if(!user) {
        return <Navigate to="/Auth" replace />
    } else { return children;}
}

export default Protected;