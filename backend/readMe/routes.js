// POST http://localhost:5000/profile => aggiunge un nuovo admin o un nuovo employee, nel secondo caso crea anche un nuovo doc. employee con il ruolo "Carpetiere" (registrazione)

// POST http://localhost:5000/api/v1/auth/login => restituisce il token dell'utente loggato 

// GET http://localhost:5000/api/v1/auth/me => manda in risposta un oggetto profile con i dati del doc. nella collection che corrisponde al token nell'autorizzazione 

// GET http://localhost:5000/profile => manda in risposta un json con tutti i profili dell'azienda con i dati admin o employee

// GET http://localhost:5000/profile/:id => manda in risposta un json con un profilo specifico dell'azienda con i dati admin o employee

// PUT http://localhost:5000/profile/:id => modifica un profilo specifico e risponde con l'oggetto modificato (modifica da employee verso admin e cancella doc. employee eventualmente)

// DELETE http://localhost:5000/profile/:id => cancella un profilo attraverso l'ID di params e se employee anche il doc. corrispondente

// POST http://localhost:5000/profile/:profileId/employee => aggiunge ad employeeData la referenza del nuovo doc. employee creato associato tramite profileId

// GET http://localhost:5000/employee => mostra tutti i dipendenti dell'azienda (?role=addetta X ricerca)

// GET http://localhost:5000/employee/:id => mostra un singolo dipendente dell'azienda e referenzia nell'oggetto mostrato i suoi dati payEnvelope

// POST http://localhost:5000/api/v1/profile/:profileId/employee/:employeeId/payEnvelope => aggiungi busta paga con gli ID utenza di params 

// PUT http://localhost:5000/employee/:id => modifica il doc. employee nella collection  

// DELETE http://localhost:5000/profile/:profileId/employee/:employeeId => cancella il doc. employee nella collection e mostra il doc. profile modificato 

// GET http://localhost:5000/api/v1/payEnvelope => mostra tutti i pagamenti verso i dipendenti emessi dall'azienda (?year=2024 X ricerca)

// GET http://localhost:5000/api/v1/employee/:employeeId/payEnvelope/:payEnvelopeId => mostra una singola busta paga di uno specifico dipendente 

// PUT http://localhost:5000/api/v1/employee/:employeeId/payEnvelope/:payEnvelopeId => modifica la busta paga di uno specifico dipendente

// DELETE http://localhost:5000/api/v1/employee/:employeeId/payEnvelope/:payEnvelopeId => cancella la busta paga di uno specifico dipendente 

// PATCH http://localhost:5000/profile/:id/avatar => aggiorna l'immagine di un doc. profile specifico 

