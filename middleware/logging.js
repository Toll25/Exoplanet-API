
let logging = (request, response, next) => {
    console.log(`${new Date().toLocaleString()} - ${request.method} ${request.url} from ${request.ip}`);
    next();
}

export default logging;