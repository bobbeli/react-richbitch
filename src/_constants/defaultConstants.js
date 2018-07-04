let apiPath;
if(process.env.NODE_ENV == 'development'){
    apiPath = 'http://localhost:5000/richbitch-4fc7a/us-central1/app';
}else{
    apiPath = 'https://us-central1-richbitch-4fc7a.cloudfunctions.net/app';

}

export const defaultConstants = {
    API_PATH: apiPath,
}