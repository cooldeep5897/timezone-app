import React, { Component } from 'react';
import Axios from 'axios';
class Timezone extends Component {
    
    constructor(){
        super();
        this.state={
            currenttime : 'notchanged',
            timezones: [],
            zone:''
        }
    }

    componentDidMount(){
        Axios.get('http://worldtimeapi.org/api/timezone')
        .then((response)=>{
            this.setState({
                timezones: response.data,  
            })
            console.log("Loading");
        })
        .catch((error)=>{
            alert('error')
        })
    } 
   
   fetchTime = (event, timezone) =>{
       console.log("running")
        const url='http://worldtimeapi.org/api/timezone/';
        Axios.get(url+timezone)
        .then((response)=>{

            console.log(response.data);
            this.setState({
            currenttime : response.data.datetime
            })
        })
        .catch((error)=>{
            alert('error')
        })

   }
   changeTimezone= (event)=>{
       let zone=event.target.value;
       const url='http://worldtimeapi.org/api/timezone/';
       Axios.get(url+zone)
       .then((response)=>{

           console.log(response.data);
           this.setState({
           currenttime : response.data.datetime
           })
       })
       .catch((error)=>{
           alert('error')
       })
   }
   
   
    render() {
        const{ timezones,currenttime}=this.state;
        console.log(currenttime);
        if(timezones.length===0){
            return (<h1>Loading</h1>);
        }
        else{
            return (
                
                <div>
                <h1>Timezones and Time</h1>
                
                    <select onChange={this.changeTimezone}>
                        {timezones.map((timezone,index)=>{
                        return (
                            <option value={timezone} key={timezone} style={{margin:"auto"}} >{timezone}</option>
                        
                            )
                        })}
                    </select>&nbsp;
                    <br></br>
                    <label>CurretTime:{currenttime}</label>
                </div>
            );
        }
    }
}

export default Timezone;