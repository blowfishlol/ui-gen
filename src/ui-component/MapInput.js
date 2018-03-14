import React from "react";
import '@progress/kendo-theme-material/dist/all.css';

import App from './App';
import ErrorBox from './ErrorBox';

export default class MapInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      childData: ["uneeded data for now"],
      path: this.props.config.path,
      key: 0, //to store the key of each element in the map.
    };
  }

  add() {
      console.log("Ma Boi",this.state);
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
    }
    const thisPath = this.state.path;

    //check if key has generated any child or not. if not, then the path of the parent must be appended to the child.
<<<<<<< HEAD
    if(this.state.key===0){
=======
    if(this.state.key === 0) {
>>>>>>> 2f5f224bd0839e3871f07494e7dd21f1a56e97b0
      //this.state.key++;
      const thisKey = this.state.key;
      this.props.config.child_content.forEach(function(child){
        //console.log(child.path,thisPath);
        child.path = thisPath + "." + thisKey + "." + child.path;
      })
      this.state.init = true;
    }
    //If this is not the first child, then it will split the given path and then take the last part.
    if(this.state.key > 0) {
      const thisKey = this.state.key;
      //for each child in the map
      this.props.config.child_content.forEach(function(child){
        const previousPath = child.path;
        //split the previous path from the parent because it will include all the path, not just the alst part
        const previousPathExploded = previousPath.split(".");
        //take the last element of the split path so it gets what it wants
        const childPath = previousPathExploded[previousPathExploded.length-1];
        console.log(thisPath + "." + thisKey + "." + childPath, "AFTER 0");
        child.path = thisPath + "." + thisKey + "." + childPath;
      });
    }
    this.state.key++;

    var elements = this.state.childData.map(element => {
      return <div className="mapChild">
        <App config={this.props.config.child_content} />
      </div>
    });
    return <label className="k-form-field">
      <span>{this.props.config.label}</span>
      <div className="k-form">
        {elements}
      </div>
      <button onClick={() => this.add()}>ADD</button>
    </label>
  }
}
