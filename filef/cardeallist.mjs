import { Dealership , Car} from '../mongo.mjs';


const getAllCarDealerships = async (req, res) => {
    try {
      // Fetch all cars from the collection
      const cars = await Car.find({});
  
      // Generate the car list with dealership names
      let carListHTML = '';
      for (const car of cars) {
        const dealerships = await Dealership.find({ dealershipcars: car._id }).select('dealershipname');
        const dealershipNames = dealerships.map((dealership) => dealership.dealershipname);
  
        carListHTML += `<li><h3>${car.carname}</h3><p>Available at: ${dealershipNames.join(', ')}</p></li>`;
      }
  
      // Send the HTML response
      const html = `
        <html>
          <head>
            <title>Car List</title>
          </head>
          <body>
            <h1>Car List</h1>
            <ul>
              ${carListHTML}
            </ul>
          </body>
        </html>
      `;
  
      res.send(html);
    } catch (error) {
      console.error('An error occurred while fetching car list:', error);
      res.status(500).send('An error occurred while fetching car list');
    }
  };


export { getAllCarDealerships };
  