
import React from "react";
import Meme from "../Meme/Meme";
//import styles from './style.module.css';
import { Switch, Route } from "react-router";
import MemeGenerated from "../MemeGenerated/MemeGenerated";
export const App=()=>{
  return (
    <>
    <h1>MEMES GENERATOR</h1>
      <Switch>
          <Route exact path="/">
              <Meme/>
          </Route>
          <Route path="/generated">
              <MemeGenerated/>
          </Route>
      </Switch>
    </>
  );
}
