import React,{Component} from "react";
import {StyleSheet, Text, View, Flatlist, Alert, CreateButton} from "react-native";
import {Card, Icon} from "react-native-elements";
import axios from axios;

export default class DetailScreen extends Component{
    constructor(props){
        super(props);
        this.state = {
            details: {},
            imagePath: "",
            url: `http://localhost:5000/planet?name=${this.props.navigation.getParam(
              "planet_name"
            )}`
        };
    }
    ComponentDidMount(){
        this.getDetails();

    }
    getDetails = () => {
        const{url} = this.state;
        axios
        .get(url)
        .then(response => {
            this.setDetails(response.data.data);
        })
        .catch(error => {
            Alert.alert(error.message);
        });
    };

    setDetails = planetDetails => {
        const planetType = planetDetails.planet_type;
        let imagePath = "";
        switch(planetType){
            case "gas giant":
                imagePath = require("../assets/planet_type/gas_giant.png")
                break;
            case "terrestrial":
                imagePath = require("../assets/planet_type/terrestrial.png")
                break;
            case "super earth":
                imagePath = require("../assets/planet_type/super_earth.png")
                break;
            case "neptune like":
                imagePath = require("../assets/planet_type/neptune_like.png")
                break;
            default: 
                imagePath = require("../assets/planet_type/gas_giant.png")
                break;
        }
        this.setState({
            details: planetDetails,
            imagePath: imagePath,
        })
    }
}