'use client';

import axios from "axios";
import { useState } from "react";
import LoginView from "@/app/_components/login-view";
import { authenticatedRequest } from "./interceptor";
import BlueButton from "./_components/blue-button";
import RedButton from "./_components/red-button";



export default function Home() {
  const [resultat, setResultat] = useState("");
  const [testDataName, setTestDataName] = useState("");

  async function testPublique(){

    const response = await axios.get("http://localhost:5011/api/Account/PublicTest")
    setResultat(response.data);

  }

  async function testPrive(){

    const response = await authenticatedRequest.get("http://localhost:5011/api/Account/PrivateTest")
    setResultat(response.data);

  }

  async function ajouter(){

    const response = await authenticatedRequest.post("http://localhost:5011/api/TestData/CreateData", { name: testDataName })
    alert("Data ajoutée avec succès ! " + response.data.name + " (id: " + response.data.id + ")");

  }

  function isLoggedIn() : Boolean{
    return sessionStorage.getItem("token") != null;
  }

  return (
    <div>
      <LoginView />
      
      <div className="borderedZone">
        <div>
          <BlueButton onClick={testPublique}>Test Publique</BlueButton>
          <RedButton onClick={testPrive}>Test Privé</RedButton>
        </div>
        <div className="mt-2">
          Résultat: {resultat}
        </div>
      </div>
      

      <div className="borderedZone">
        <h4>Ajout de data</h4>
        <div>
          <input className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block px-3 py-2.5 shadow-xs placeholder:text-body m-2" value={testDataName} onChange={(e) => setTestDataName(e.target.value)} type="text" name="newTestDataName"/>
        </div>
        <BlueButton onClick={ajouter}>Ajouter</BlueButton>
      </div>
    </div>
  );
}
