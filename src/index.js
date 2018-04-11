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

import scrollToComponent from 'react-scroll-to-component';

ReactDOM.render(<Provider store={storage}>
  <div className="container-fluid">
    <Ripple>
      <Navigator />
      <Dialog />
      <Window />

      <div className='main'>
        <div className='button_group'>
          <button onClick={() => scrollToComponent(this.Violet, { offset: -100, align: 'top', duration: 1500})}>Go To Violet</button>
          <button onClick={() => scrollToComponent(this.Indigo, { offset: 0, align: 'bottom', duration: 500, ease:'inExpo'})}>Go To Indigo</button>
          <button onClick={() => scrollToComponent(this.Blue, { offset: -200, align: 'middle', duration: 1500, ease:'inCirc'})}>Go To Blue</button>
          <button onClick={() => scrollToComponent(this.Green, { offset: 0, align: 'middle', duration: 500, ease:'inExpo'})}>Go To Green</button>
          <button onClick={() => scrollToComponent(this.Yellow, { offset: 0, align: 'top', duration: 1500, ease:'inCirc'})}>Go To Yellow</button>
          <button onClick={() => scrollToComponent(this.Orange, { offset: 0, align: 'top', duration: 500, ease:'inCirc'})}>Go To Orange</button>
          <button onClick={() => scrollToComponent(this.Red, { offset: 0, align: 'top', duration: 500})}>Go To Red</button>
        </div>
        <section className='violet' ref={(section) => { this.Violet = section; }}>Violet</section>
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        <section className='indigo' ref={(section) => { this.Indigo = section; }}>Indigo</section>
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        <section className='blue' ref={(section) => { this.Blue = section; }}>Blue</section>
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        <section className='green' ref={(section) => { this.Green = section; }}>Green</section>
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        <section className='yellow' ref={(section) => { this.Yellow = section; }}>Yellow</section>
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        <section className='orange' ref={(section) => { this.Orange = section; }}>Orange</section>
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        <section className='red' ref={(section) => { this.Red = section; }}>Red</section>
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        <b>Inspired By <a href="https://hopechen1028.github.io/hopechen.me/" target="_blank">Hope</a> with Love and Peace</b>
      </div>
    </Ripple>
  </div>
</Provider>, document.getElementById("root"))
registerServiceWorker()

var size = 20
var buffer = ""

for(let i = 0; i < size; i++) {
  for(let j = 0; j < size; j++) {
    if(isPrintCond(i, j, 0, size - 1)) {
      buffer += "#"
    } else {
      buffer += " "
    }
  }
  buffer += "\n"
}
console.log(buffer)

function isPrintCond(i, j, min, max) {
  // return i === j || i === 0 || j === 0 || i === max || j === max || i+j === max
  // return Math.pow(i - max/2, 2) + Math.pow(j - max/2, 2) < Math.pow(max/2, 2)
  // return Math.floor(max/2) >= Math.abs(Math.floor(max/2) - i) + Math.abs(Math.floor(max/2) - j)
  return min > max || !(min <= i && i <= max) || !(min <= j && j <= max) ? false : i === min || i === max || j === min || j === max || isPrintCond(i, j, min+2, max-2)
  // return (min > max || !(min <= i && i <= max) || !(min <= j && j <= max)) && !(i === min && j === min-1) ? false : ((i === min || i === max || j === min || j === max || (i === min && j === min-1)) && !(i === min+1 && j === min)) || isPrintCond(i, j, min+2, max-2)
}