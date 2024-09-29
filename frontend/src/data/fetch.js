const fetchProfileUrl = `${process.env.REACT_APP_API_URL}/profile`
const fetchEmployeeUrl = `${process.env.REACT_APP_API_URL}/employee`
const fetchPaymentsUrl = `${process.env.REACT_APP_API_URL_N2}/payEnvelope`

export const fetchGetProfiles = async () => {
    try {
/*    
      let res = null;
      if (!perPage || !page) res = await fetch(fetchProfileUrl);
      else
        res = await fetch(`${fetchProfileUrl}?page=${page}&perPage=${perPage}`);
      if (!res.ok) throw new Error(res); 
*/
      const res = await fetch(fetchProfileUrl)
      const data = await res.json()
      return data
    } catch (err) {
      console.log("ERR fetchGetProfiles\n", err);
    }
}

export const me = async() =>{
  const res = await fetch("http://localhost:5000/api/v1/auth/me", {
      headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
      }
  })
  if(!res.ok){
      throw new Error(res.status)
  }
  const data = await res.json();
  return data
}

export const login = async (formValue) => {
  try {
      const res = await fetch('http://localhost:5000/api/v1/auth/login', {
          headers: {
              "Content-Type": "application/json",
          },
          method: 'POST',
          body:JSON.stringify (formValue)
      })
      if(res.ok){
          const data = await res.json();
          return data
      }else {const errorData = await res.json()
          return {error: errorData.message || 'Errore di login'}
      }
  } catch (error) {
      return {error: 'Errore, riporva più tardi'} 
  }
}