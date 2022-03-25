import {useState, useEffect} from 'react';
import './App.css';

console.log(typeof(process.env.REACT_APP_API_KEY))
console.log(process.env.REACT_APP_API_HOST)
function App() {
  const [queryData, setQueryData] = useState('')
  const [responseData, setResponseData] = useState([])

    
  function handleSubmit(e) {
    e.preventDefault();
    let axios = require("axios").default;
    let options = {
    method: 'POST',
    url: 'https://microsoft-translator-text.p.rapidapi.com/translate',
    params: {to: 'fr', 'api-version': '3.0', profanityAction: 'NoAction', textType: 'plain'},
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Host': process.env.REACT_APP_API_HOST,
      'X-RapidAPI-Key': process.env.REACT_APP_API_KEY
    },
    data: [{Text: queryData}]
  };
     const postData = async() => {
        try {
          const res = await axios.request(options)
          const resData = await res.data
          const translatedData = await resData[0].translations[0].text
          setResponseData(translatedData)
        } catch(err) {
          console.error(err);
        }
    }
    postData()
    setQueryData('')
     
  }
  

  return (
    <>
    <h1>Translate</h1>
    <div className="container">
      <div className="box">
        <form className="form">
          <input type="text" className="userInput" placeholder='Type Anything to Translate' onChange = {(e) => setQueryData(e.target.value)} value = {queryData} />
          <button className="subForm" type ='submit' onClick={handleSubmit}>Submit</button>
        </form>
        </div> 
        <div className="response">
          {responseData}
        </div>  
    </div>
    </>
  );
}

export default App;
