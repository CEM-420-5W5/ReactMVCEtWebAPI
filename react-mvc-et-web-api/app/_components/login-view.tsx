'use client';

import { useEffect, useState } from "react";
import axios from "axios";
import BlueButton from "./blue-button";

export default function LoginView() {

    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const tokenJSON : string | null = sessionStorage.getItem("token");

        setToken(tokenJSON);
    }, []);

    const apiBaseUrl = "http://localhost:5011/api/"
    const accountBaseUrl = apiBaseUrl + "Account/";

    const username = "test";
    const motDePasse = "Passw0rd!";

    async function enregistrer(){
        let registerData = {
            username: username,
            email : username + "@test.com",
            password : motDePasse,
            passwordConfirm : motDePasse,
        }
        await axios.post(accountBaseUrl + "Register", registerData);
    }

    async function login(){
        let loginData = {
            username: username,
            password: motDePasse
        }
        const result = await axios.post(accountBaseUrl + "Login", loginData);
        sessionStorage.setItem("token", result.data.token);
        setToken(result.data.token);
    }

    async function logout(){
        // Rien d'autre à faire que d'oublier le Token
        sessionStorage.removeItem("token");
        setToken(null);
    }

    function isLoggedIn() : Boolean{
        return token != null;
    }

    function displayLogin(){
        if(!isLoggedIn()){
            return(<div>
                <div className="mb-2">
                    Qui êtes-vous?
                </div>
                <BlueButton onClick={enregistrer}>Enregistrer</BlueButton>
                <BlueButton onClick={login}>Login</BlueButton>
            </div>);
        }
        else{
            return (<div>
                <div className="mb-2">
                    Bienvenue!
                </div>
                <BlueButton onClick={logout}>Logout</BlueButton>
            </div>);
        }
    }

    return(
        <div className="borderedZone">
            {displayLogin()}   
        </div>
    );
}