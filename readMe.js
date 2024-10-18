// Questo progetto mira allo sviluppo di un software gestionale aziendale per semplificare la gestione finanziaria e delle risorse umane all'interno dell'impresa.
    // Ho implementato le funzionalità di login con 1.accesso con credenziali 
                                                //  2.registrazione per admin attraverso chiave di licenza dell'applicazione 'licenzaAndrea'
                                                //  3.registrazione per employee attraverso google con un ruolo casuale 
                                                //  .TODO: possibilità di aggiungere una nuova utenza profile di tipo employee per un amministratore dell'azienda, vista la struttura del mio
                                                //  Schema avevo la necessità di dividere le due modalità di accesso(2., 3.). Non escludo ulteriori modifiche future dal punto di vista della   
                                                //  struttura back-end (referenziare uno schema profile generico dentro gli Schema admin ed employee più specifici)
    // I dipendenti hanno la possibilità di 1.visualizzare i pagamenti emessi dall'azienda in loro favore
                                        //  2.inoltrare richieste di permesso o ferie all'amministrazione
                                        //  3.apportare modifiche al loro profilo (dati anagrafici e fiscali)
    // Gli admin hanno la possibilità di 1.visualizzare i pagamenti emessi dall’azienda in un dato periodo
                                    //   2.gestire richieste di permesso e ferie il cui esito è comunicato al richiedente tramite mail
                                    //   3.modificare posizione lavorativa dei dipendenti dell'azienda 
                                    //   4.gestire i pagamenti mensili in favore dei dipendenti
    // TODO: -Autorizzazioni sulle rotte del sito comprese quelle comunque già parzialemnte funzionanti grazie all'uso combinato di Outlet e Navigate lato frontend.
        //   -Migliorare definizione dei componenti React, vorrei in seguito delineare maggiormente la struttura front-end con componenti più specifici.
        //   -Implementare funzionalità EXTRA 1.gestione delle attività quotidiane (l'amministrazione potrà assegnare compiti migliorando la pianificazione delle risorse)
                                          //  2.funzionalità di tracciamento ed aggiornamento dello stato delle varie attività in corso (comments)
                                          //  /* tali funzionalità sono già presenti lato back-end */
    // TECNOLOGIE UTILIZZATE /* NodeJs, Express, MongoDB, bcrypt, cloudinary, cors, dotenv, helmet, jsonwebtoken, mailtrap, mongoose, morgan, multer, multer-storage-cloudinary, nodemon, passport,
                        //   passport-google-oauth20 */
                        //   /* React, Bootstrap, animatecss, framer-motion, react-router-dom, react-select */
    