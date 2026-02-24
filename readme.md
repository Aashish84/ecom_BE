commands :

npx prisma migrate dev --name init

npx prisma generate


app.use() registers middleware (function that runs before request reaches )

  app.use(() =>{
  	  console.log("Middleware executed for every request");
  })

  app.use((req, res, next) => {
  	  console.log(`Received ${req.method} request for ${req.url}`);
  	  next();
  	});

  support all http methods 
  app.use((req, res, next) => {
    res.send("Hello from Express!");
  });

  app.use("/allMethods",(req, res, next) => {
    res.send("Hello from all methods!");
  });

  app.use((req, res, next) => {
    console.log(`Received ${req.method} request for ${req.url}`);
      req.send ("Hello from Express!");   req.send is not a function 
  }); 
