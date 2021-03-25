const CREATE_USER = "http://localhost:1000/users/createUser";
const LOGIN_USER = "http://localhost:1000/users/checkLogin";
const LEVELS = "http://localhost:1000/users/getLevels";
const RAMDOM_WORD = "http://localhost:1000/users/getRandomWord";
const STORE_SCORE = "http://localhost:1000/users/storeScore";
const GET_SCORE_BORAD = "http://localhost:1000/users/getAllScore";



export  function CreateUser(userName,password,email) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({name:userName,password:password,email:email} )
    };
      return  fetch(CREATE_USER,requestOptions)
      .then(res => res.json())
     
}


export  function LoginUser(password,email) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({password:password,email:email} )
    };
      return  fetch(LOGIN_USER,requestOptions)
      .then(res => res.json())
     
}

export  function getLevel() {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
      return  fetch(LEVELS,requestOptions)
      .then(res => res.json())
     
}


export  function randomWord(password,email) {
    const requestOptions = {
        method: 'get',
        headers: { 'Content-Type': 'application/json' }
    };
      return  fetch(RAMDOM_WORD,requestOptions)
      .then(res => res.json())
     
}


export  function storeScore(score,user_id,level) {
    console.log(JSON.stringify({score:score,user_id:user_id,level:level}))
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({score:score,user_id:user_id,level:level} )
    };
      return  fetch(STORE_SCORE,requestOptions)
      .then(res => res.json())
     
}

export  function getAllScore(user_id) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({user_id:user_id} )
    };
      return  fetch(GET_SCORE_BORAD,requestOptions)
      .then(res => res.json())
     
}



