import { Dealership, Car } from '../mongo.mjs';

const getAllDealerships = async (req, res) => {
    
        try {
          // Fetch all dealerships from the collection
          const dealerships = await Dealership.find({});
      
          // Generate the dealership list with cars
          let dealershipListHTML = '';
          for (const dealership of dealerships) {
            const cars = await Car.find({ _id: { $in: dealership.dealershipcars } }).select('carname');
      
            const carNames = cars.map((car) => car.carname);
      
            dealershipListHTML += `<li><h3>${dealership.dealershipname}</h3><p>Cars available: ${carNames.join(', ')}</p></li>`;
          }
      
          // Send the HTML response
          const html = `
            <html>
              <head>
                <title>Dealership List</title>
              </head>
              <body>
                <h1>Dealership List</h1>
                <ul>
                  ${dealershipListHTML}
                </ul>
              </body>
            </html>
          `;
      
          res.send(html);
        } catch (error) {
          console.error('An error occurred while fetching dealership list:', error);
          res.status(500).send('An error occurred while fetching dealership list');
        }
      };


export { getAllDealerships };