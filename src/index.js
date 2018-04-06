import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"

import "@progress/kendo-theme-bootstrap/dist/all.css"
import "./index.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "./style/style.css"

import { Ripple } from "@progress/kendo-react-ripple"
import Navigator from "./component/nav-component/Navigator"
import Dialog from "./component/Dialog"
import Window from "./component/Window"

import storage from "./storage"

import registerServiceWorker from "./registerServiceWorker"

ReactDOM.render(<Provider store={storage}>
  <div className="container-fluid">
    <Ripple>
      <Navigator />
      <Dialog />
      <Window />
    </Ripple>
  </div>
</Provider>, document.getElementById("root"))
registerServiceWorker()

/*
              ========================
              ||  [MOTI]            ||
              ||  reference gw,     ||
              ||  jangan di apus dl ||
              ========================

<div className='main'>
  <div className='button_group'>
    <button onClick={() => scrollToComponent(this.Violet, { offset: 0, align: 'top', duration: 1500})}>Go To Violet</button>
    <button onClick={() => scrollToComponent(this.Indigo, { offset: 0, align: 'bottom', duration: 500, ease:'inExpo'})}>Go To Indigo</button>
    <button onClick={() => scrollToComponent(this.Blue, { offset: -200, align: 'middle', duration: 1500, ease:'inCirc'})}>Go To Blue</button>
    <button onClick={() => scrollToComponent(this.Green, { offset: 0, align: 'middle', duration: 500, ease:'inExpo'})}>Go To Green</button>
    <button onClick={() => scrollToComponent(this.Yellow, { offset: 0, align: 'top', duration: 1500, ease:'inCirc'})}>Go To Yellow</button>
    <button onClick={() => scrollToComponent(this.Orange, { offset: 0, align: 'top', duration: 500, ease:'inCirc'})}>Go To Orange</button>
    <button onClick={() => scrollToComponent(this.Red, { offset: 0, align: 'top', duration: 500})}>Go To Red</button>
  </div>
  <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
  <span  ref={(span) => { this.Violet = span; }}>Violet</span>
  <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
  <span  ref={(span) => { this.Indigo = span; }}>Indigo</span>
  <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
  <span ref={(span) => { this.Blue = span; }}>Blue</span>
  <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
  <span ref={(span) => { this.Green = span; }}>Green</span>
  <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
  <span  ref={(span) => { this.Yellow = span; }}>Yellow</span>
  <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
  <span  ref={(span) => { this.Orange = span; }}>Orange</span>
  <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
  <span ref={(span) => { this.Red = span; }}>Red</span>
  <b>Inspired By <a href="https://hopechen1028.github.io/hopechen.me/" target="_blank">Hope</a> with Love and Peace</b>
</div>

*/
