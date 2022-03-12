import {useState} from "react";
const Login = () =>{
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append('Accept', 'application/json');

        headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
        headers.append('Access-Control-Allow-Credentials', 'true');
        headers.append('Access-Control-Allow-Methods', 'POST');
        headers.append('Access-Control-Allow-Headers', 'Content-Type');

        let raw = JSON.stringify({"username":username,"password":password});

        let requestOptions = {
            method: 'POST',
            body: raw,
            headers: headers,
            redirect: 'follow'
        };

        fetch("https://restaurant-app-devops.herokuapp.com/authentication/login", requestOptions)
            .then(response => response.text())
            .then(result => {
                if (JSON.parse(result).message === true) {
                    localStorage.setItem('token', JSON.parse(result).token);
                    // alert(JSON.parse(result).token);
                    window.location.href = "summary";
                }
                else {
                    alert("invalid username or password");
                }
            })
            .catch(error => console.log('error', error));
    }

    return (
        <>
            <div className="container">
                <form onSubmit={handleSubmit} className="form">
                    <div className="first">
                        <input type="text" name="Username" className="box" placeholder="Username" onChange={(e)=>{setUserName(e.target.value)}}></input>
        
                    </div>
                    <div className="second">
                        <input type="password" name="password" className="box" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}}></input>
                    </div>
                    <button type="submit" className="submit">Submit</button>
                </form> 
            </div>
        </>
    )
}

export default Login;
