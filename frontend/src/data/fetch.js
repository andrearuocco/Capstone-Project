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

export const profileId = async (id) => {
    try {
        const res = await fetch(`http://localhost:5000/profile/${id}`, {
            method: 'GET',
        })
        if(res.ok){
            const data = await res.json();
            return data
        }else {const errorData = await res.json()
            return {error: errorData.message || 'Profile non trovato'}
        }
    } catch (error) {
        return {error: 'Riprova più tardi'} 
    }
  }

  export const employeeId = async (id) => {
    try {
        const res = await fetch(`http://localhost:5000/employee/${id}`, {
            method: 'GET',
        })
        if(res.ok){
            const data = await res.json();
            return data
        }else {const errorData = await res.json()
            return {error: errorData.message || 'Employee non trovato'}
        }
    } catch (error) {
        return {error: 'Riprova più tardi'} 
    }
  }

  export const editEmployee = async (id, employeeForm) => {
    try {
        const res = await fetch(`http://localhost:5000/employee/${id}`, {
            headers: {
                "Content-Type": "application/json",
            },
            method: 'PUT', 
            body: JSON.stringify(employeeForm)
        });
        if (res.ok) {
            const data = await res.json();
            return data;
        } else {
            const errorData = await res.json();
            return { error: errorData.message || 'Employee non trovato' };
        }
    } catch (error) {
        return { error: 'Riprova più tardi' };
    }
};

export const editWhoIs = async (id, whoIsForm) => {
    try {
        const payload = { type: whoIsForm.type } // verifica se type è stato cambiato da employee ad admin 
        if (whoIsForm.type === "admin") {
            
            payload.adminData = {} // solo se questo è già successo allora crea il campo adminData

            if (whoIsForm.name) {
                payload.adminData.name = whoIsForm.name
            }

            if (whoIsForm.description) {
                payload.adminData.description = whoIsForm.description
            }
        }
        const res = await fetch(`http://localhost:5000/profile/${id}`, {
            headers: {
                "Content-Type": "application/json",
            },
            method: 'PUT',
            body: JSON.stringify(whoIsForm)
        });
        if (res.ok) {
            const data = await res.json();
            return data;
        } else {
            const errorData = await res.json();
            return { error: errorData.message || 'Utenza non trovata' };
        }
    } catch (error) {
        return { error: 'Riprova più tardi' };
    }
};

export const employeePayments = async (employeeId, payEnvelopeId) => {
    try {
        const res = await fetch(`http://localhost:5000/api/v1/employee/${employeeId}/payEnvelope/${payEnvelopeId}`)
        if (res.ok) {
            const data = await res.json();
            return data;
        } else {
            const errorData = await res.json();
            return { error: errorData.message || 'Employee non trovato' };
        }
    } catch (error) {
        return { error: 'Riprova più tardi' };
    }
};

