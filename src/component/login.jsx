import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../services/login.services";
import LoginCSS from "../login.module.css"


export function Login() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    async function handleForm(e) {
        //pour eviter l'envoi du formulaire
        e.preventDefault();
        const user = { "Name": login, "password": password };
        const rep = await userLogin(user);
        const token = rep.data;

        //stocke de token dans navigateur (using LOCAL STORAGE)
        localStorage.setItem("jwtToken", token)
        navigate("/home")
    }

    return (
        <>

            <section className={LoginCSS.section}>
                <div className={LoginCSS.signin} >
                    <div className={LoginCSS.content}>
                        <h2>Login</h2>
                        <form className={LoginCSS.form} onSubmit={e => handleForm(e)}>

                            <div className={LoginCSS.inputBox}>
                                <input type="text" onChange={e => setLogin(e.target.value)} /><i>Username</i>
                            </div>


                            <div className={LoginCSS.inputBox}>
                                <input type="password" onChange={e => setPassword(e.target.value)} /><i>Password</i>
                            </div>

                            <div className={LoginCSS.links}></div>

                            <div className={LoginCSS.inputBox}>
                                <input type="submit" /><br /><br />
                                <input type="reset" />
                            </div>
                        </form >
                    </div>
                </div>
            </section>








            {/* <br />
            <br />
            <form onSubmit={e => handleForm(e)}>
                <div className="form-group">
                    <label >Login:</label>
                    <input className="form-control" type="text" onChange={e => setLogin(e.target.value)} />
                </div>


                <div className="form-group">
                    <label >Mot de passe :</label>
                    <input className="form-control" type="password" onChange={e => setPassword(e.target.value)} />
                </div>
                <br /><br />

                <input type="submit" />
                <input type="reset" />
            </form > */}


        </>
    );
}