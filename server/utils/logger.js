import morgan from 'morgan';

export const loggerFormat = morgan(':method :url :status :res[content-length] - :response-time ms');
