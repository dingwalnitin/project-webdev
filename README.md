# project-webdev

First install mongoDB in the system and start mongod, then use the faker.mjs file to populate the database

There is a problem here, since the data is random the password and username and email for admin and dealership and users will also be random, we need to manually replace the data we generate usuing the signup form. 

open the project after cloning in the ide of your choice and in the terminal run "npm install" this will install the req dependencies 

now run the index.mjs this will start the local server and all the files will be accessiable.


documentation for the APIs

                  "  app.get('/user-signup', (req, res) => {
                    res.sendFile(path.resolve(tempelatePath, 'user-signup.html'));
                  });
                  
                  app.get('/', (req, res) => {
                    res.sendFile(path.resolve(tempelatePath, 'homepage.html'));
                  });
                  
                  app.get('/user-signin', (req, res) => {
                    res.sendFile(path.resolve(tempelatePath, 'user-signin.html'));
                  });
                  
                  app.get('/admin-signin', (req, res) => {
                    res.sendFile(path.resolve(tempelatePath, 'admin-signin.html'));
                  });
                  
                  app.get('/user-profile', (req, res) => {
                    res.sendFile(path.resolve(tempelatePath, 'user-profile.html'));
                  });
                  
                  
                  app.get('/deal-signin', (req, res) => {
                    res.sendFile(path.resolve(tempelatePath, 'deal-signin.html'));
                  });
                  app.get('/deal-profile', (req, res) => {
                    res.sendFile(path.resolve(tempelatePath, 'dealership-profile.html'));
                  });
                  
                  app.get('/allcars', getAllCars);
                  app.get('/selcardeal', getAllCarDealerships);
                  app.get('/seldeal', getAllDealerships);
                  app.get('/usercar', UserCarss);
                  app.get('/dealcar', getDeal);
                  app.get('/dealershipdeal', getDDeal);
                  
                  
                  
                  app.get('/Tseldeal', (req, res) => {
                    res.sendFile(path.resolve(tempelatePath, 'Tseldeal.html'));
                  }); "
These are the get to redirect the url to these pages.



