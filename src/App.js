import React,{useEffect,useState} from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography
} from "@material-ui/core";

const api= {
  key: "d52b0a40c9c558c56bc3c33921f958c9",
  base:"https://api.openweathermap.org/data/2.5/"
}



function App() {

  const [weather,setweather] = useState([]);
  const [search,setsearch] = useState("");
  const [query,setquery] = useState('Mymensingh');


  useEffect(()=>{
    getWeatherInfo();
  },[query])
  
  const getWeatherInfo =async()=>{
    const response = await fetch( `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${api.key}`);
    const weather = await response.json();
    setweather(weather);
    console.log(weather);
    }

    const dateBuilder= (d)=>{
      let months = ['january','February','March','April','May','June',"july",'August','September','October','November','December'];
      let days = ['sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
       
      let month = months[d.getMonth()];
      let day = days[d.getDay()];
      let year = d.getFullYear();
      let date = d.getDate();
      
      return `${day} ${date} ${month} ${year}` 
    }

    const updateSearch = e =>{
      setsearch(e.target.value);
      //console.log({search})
    }
    
    const getSearch = e =>{
      e.preventDefault();
      setquery(search);
      setsearch('');
    }
    var date = new  Date((weather?.sys?.sunrise)*1000);
    var hour = date.getHours();
    var minute = date.getMinutes();
    var seconds = date.getSeconds();

    var date1 = new  Date((weather?.sys?.sunset)*1000);
    var hour1 = date1.getHours();
    var minute1= date1.getMinutes();
    var seconds1 = date1.getSeconds();
  return (
    <div className="App">
      
      <main>

      <CardActions>
        <Grid container justify="center">
          <div className="input-box">
             <form className="search-form" onSubmit={getSearch}>
               <p style={{color:'white',fontSize:'17px'}}><b><u>Nasim's Weather App</u></b></p>
                 <input className="search-bar"  placeholder="Enter City for weather news" type="text" value={search} onChange={updateSearch}></input><br></br><br></br>
                    <button className="btn btn-primary" type="submit" >Search</button>
               </form>
            </div>
         </Grid>
      </CardActions>
   
      
    {(weather?.weather?.length)?(
      <div class="container">
          <div className="row">
   
  
   
         <div className="card" style={{background:"black"}}>
         <div className="card-header">
            <h4>{weather?.name} , {weather?.sys?.country}</h4>
          <p style={{fontSize:'14px'}}>{dateBuilder(new Date())}</p>
        </div>
          <div className="card-body">
          <p>
          <span className="versus">Temperature:</span> {weather?.main?.temp}°c<br></br>
          <span className="versus">Temperature feels like:</span> {weather?.main?.feels_like}<br></br>
          <span className="versus">Maximum Temperature :</span> {weather?.main?.feels_like}<br></br>
          <span className="versus">Minimum Temperature:</span> {weather?.main?.feels_like}<br></br>
        
          </p>
        </div>
        <div className="card-body2"> 
            <p>
            <span className="caption">Weather Description: </span>{weather?.weather[0]?.description}<br></br>
            <span className="caption">Humidity :</span> {weather?.main?.humidity}% <br></br>
            <span className="caption">Wind Speed: </span> {weather?.wind?.speed} m/s<br></br>
            <span className="caption">Sunrise : </span> {hour} : {minute} : {seconds} <br></br>
            <span className="caption">Sunset : </span> {hour1} : {minute1} : {seconds1}
            </p>
         </div>
      </div>
   
      </div>
    
           </div>
    ):(
      <CardActions>
        <Grid container justify="center">
        <div className="playercard">
           <h5>Not Found...</h5>
        </div>
        </Grid>
        </CardActions>
    )}
      </main>

      <br></br>
      <p className="creater"  style={{textAlign:"center"}}> <b>Created by</b><a href="https://web.facebook.com/zafrulhasan.nasim" target="_blank"><b>Zafrul Hasan Nasim</b> </a></p>
    
      
      </div>
  );
}

export default App;
