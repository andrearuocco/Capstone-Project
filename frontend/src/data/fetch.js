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

export const me = async () => {
    const res = await fetch("http://localhost:5000/api/v1/auth/me", {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    })
    if (!res.ok) {
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
            body: JSON.stringify(formValue)
        })
        if (res.ok) {
            const data = await res.json();
            return data
        } else {
            const errorData = await res.json()
            return { error: errorData.message || 'Errore di login' }
        }
    } catch (error) {
        return { error: 'Errore, riporva più tardi' }
    }
}

export const profileId = async (id) => {
    try {
        const res = await fetch(`http://localhost:5000/profile/${id}`, {
            method: 'GET',
        })
        if (res.ok) {
            const data = await res.json();
            return data
        } else {
            const errorData = await res.json()
            return { error: errorData.message || 'Profile non trovato' }
        }
    } catch (error) {
        return { error: 'Riprova più tardi' }
    }
}

export const employeeId = async (id) => {
    try {
        const res = await fetch(`http://localhost:5000/employee/${id}`, {
            method: 'GET',
        })
        if (res.ok) {
            const data = await res.json();
            return data
        } else {
            const errorData = await res.json()
            return { error: errorData.message || 'Employee non trovato' }
        }
    } catch (error) {
        return { error: 'Riprova più tardi' }
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
            const errorData = await res.json()
            return { error: errorData.message || 'Employee non trovato' }
        }
    } catch (error) {
        return { error: 'Riprova più tardi' }
    }
};

export const editWhoIs = async (id, whoIsForm) => {
    try {

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
            const errorData = await res.json()
            return { error: errorData.message || 'Utenza non trovata' }
        }
    } catch (error) {
        return { error: 'Riprova più tardi' }
    }
}

export const deleteEmployee = async (id, employeeId) => {

    const response = await fetch(`http://localhost:5000/profile/${id}/employee/${employeeId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    })
}

export const editPay = async (employeeDataId, payEnvelopeId, payForm) => {
    try {

        const res = await fetch(`http://localhost:5000/api/v1/employee/${employeeDataId}/payEnvelope/${payEnvelopeId}`, {
            headers: {
                "Content-Type": "application/json",
            },
            method: 'PUT',
            body: JSON.stringify(payForm)
        });
        if (res.ok) {
            const data = await res.json();
            return data;
        } else {
            const errorData = await res.json()
            return { error: errorData.message || 'Pagamento modificato correttamente.' }
        }
    } catch (error) {
        return { error: 'Riprova più tardi.' }
    }
}

export const loadRequest = async () => {
    try {
        
        const response = await fetch(`http://localhost:5000/requests`)
        if (!response.ok) {
            throw new Error('Errore nel caricamento delle richieste')
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Riprova più tardi:', error);
    }
}
  
export const employeeRequest = async (employeeId, requestData) => {
    try {
      /* const employeeId = '6701296374a18dafd4ce3f3c' */
      const response = await fetch(`http://localhost:5000/api/v1/employee/${employeeId}/requests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
      if (!response.ok) {
        throw new Error('Richiesta non inoltrata')
      }
      const data = await response.json()
      console.log('Richiesta inviata:', data)
    } catch (error) {
      console.error('Riprova più tardi:', error);
    }
  }

 export const patchRequest = async (employeeId, requestId, action) => {
    try {
      
      const response = await fetch(`http://localhost:5000/api/v1/employee/${employeeId}/requests/${requestId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: action }), 
      });
      if (!response.ok) {
        throw new Error('Richiesta non gestica correttamente')
      }
      /* setRequests(requests.filter(request => request._id !== requestId)); */
    } catch (error) {
      console.error('Riprova più tardi:', error);
    }
  };
