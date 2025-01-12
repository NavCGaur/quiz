const config = {
    development: {
      mongoUri: 'mongodb+srv://naveen:naveen%4024@cluster0.lmfml.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
      port: 5000,
    },
    production: {
      mongoUri: process.env.MONGO_URI,
      port: process.env.PORT || 5000,   
    },
  };
  
  export default config[process.env.NODE_ENV || 'development'];
  