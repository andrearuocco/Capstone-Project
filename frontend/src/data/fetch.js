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