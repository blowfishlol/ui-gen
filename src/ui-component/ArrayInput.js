import React from "react";
import '@progress/kendo-theme-material/dist/all.css';

import App from './App';
import ErrorBox from './ErrorBox';

export default class ArrayInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      childData: ["uneeded data for now"],
      key: 0,
    };
  }

  add() {
    this.setState({
      ...this.state,
      childData: this.state.childData.concat(["uneeded data for now"])
    });
  }

  render() {
    if(!this.props.hasOwnProperty("config")) {
      return <ErrorBox message="Config is missing" />
    } else if(!this.props.config.hasOwnProperty("child_content")) {
      return <ErrorBox message="Content is missing" />
    } else if(!this.props.config.child_content.hasOwnProperty("type")) {
      return <ErrorBox message="Content type is missing" />
    }

    //if this is the first element, then it just adds the key to the behind.
<<<<<<< HEAD
    if(this.state.key===0){
=======
    if(this.state.key === 0){
>>>>>>> 2f5f224bd0839e3871f07494e7dd21f1a56e97b0
      this.props.config.path = this.props.config.path + "." + this.state.key;
    }else{
      //if it not the first, then throw the last part of the path and replace it with the new key
      //this has to be done becose incoming prop will contain the previous key.
      var previousPath = this.props.config.path;
      var previousPathExploded  = previousPath.split(".");
      previousPathExploded[previousPathExploded.length-1]  = this.state.key;
      console.log(previousPathExploded,"BOOMMM!!!");
      this.props.config.path = previousPathExploded.join(".");
    }
    this.state.key++;

    var elements = this.state.childData.map(element => {

      return <App config={[{...this.props.config, label: "", type:this.props.config.child_content.type}]} />
    });
    return <label>
      <span>{this.props.config.label}</span>
      {elements}
      <button onClick={() => this.add()}>ADD</button>
    </label>
  }
}
