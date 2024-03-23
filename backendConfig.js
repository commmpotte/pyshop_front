

let backendURL = 'http://localhost:3000'; 

if (process.env.NODE_ENV === 'production') {
  backendURL = 'ВСТАВИТЬ ССЫЛКУ НА БЭКЕНД';
}

export default backendURL;
