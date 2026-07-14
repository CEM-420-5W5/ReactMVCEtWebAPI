'use client';

import axios from "axios";
import { useState } from "react";
import LoginView from "@/app/_components/login-view";
import { authenticatedRequest } from "./interceptor";

import { Button } from "@/components/ui/button"

import {
  Field,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

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
          <Button onClick={testPublique}>Test Publique</Button>
          <Button variant="destructive" onClick={testPrive}>Test Privé</Button>
        </div>
        <div className="mt-2">
          Résultat: {resultat}
        </div>
      </div>
      

      <div className="borderedZone">
        <Field className="mb-2">
          <FieldLabel htmlFor="input-field-data-name">Ajout de data</FieldLabel>
          <Input
            id="input-field-data-name"
            type="text"
            value={testDataName}
            onChange={(e) => setTestDataName(e.target.value)}
            placeholder="N'importe quel texte"
          />
        </Field>

        <Button onClick={ajouter}>Ajouter</Button>
      </div>
    </div>
  );
}
