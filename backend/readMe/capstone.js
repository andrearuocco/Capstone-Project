// PER CONCLUSIONE BACKEND

    // inserimento dell' AUTENTICAZIONE non solo per il login ma anche per distinguere ADMIN da EMPLOYEE /* (lato front-end questa cosa come potrebbe essere gestita: 
    // ?? con una PAGINA per la registrazione adimin accessibile con delle CREDENZIALI fornite da chi ha la licenza dell'applicazione ?? _ */ 26/09/2024 /* ) */

    // 23 SETT: controllare la corretta cancellazione dei commenti legati e dei task assegnati quando viene cancellata un'utenza profile o un documento employee =>
    // ?? probabilmente una volta cancellato uno tra employee e profile si cancellano automaticamente anche i task in quanto la cancellazione nel secondo caso è gestita per il doc. corrispondente ??
    // (i commenti e i pagamenti invece restano nel DB in quanto refenziati e dotati quindi di una propria collection);
    // 26/09/2024 /* getdailytask */

    // per quanto riguarda la richiesta di permessi (?? ferie ??), 
    // cosa fare lato back-end per disegnare una situazione dove in seguito alla richiesta generata da un employee ed approvata da un admin si possa aggiornare in automatico paid/unpaid Leave (35-44)

// FUTURO SVILUPPO FRONT-END 

    // fare le chiamate fetch necessarie per le operazione di CRUD sui vari dati ed individuare la loro 'posizione' all'interno dei componenti react del front-end  


// 22 SETT: terminare le CRUD comment in dailytaskRoutes(OKAY)
// patch dell'avatar per il modello profile con Cloudinary(OKAY)
// servizio mailtrap per inviare una mail in merito ad alcune operazioni possibili nel sito(OKAY)