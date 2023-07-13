import { Car } from '../mongo.mjs';

export const getAllCars = async (req, res) => {
    try {
      // Fetch all cars from the collection
      const cars = await Car.find({});
  
      // Extract the carname and carmodel fields
      const carData = cars.map((car) => ({
        carname: car.carname,
        carmodel: car.carmodel,
      }));
  
      // Render the car data in a readable format
      const carList = carData.map((car) => `<li>${car.carname} - ${car.carmodel}</li>`).join('');
  
      // Send the HTML response
      res.send(`
        <html>
          <head>
            <title>All Cars</title>
          </head>
          <body>
            <h1>All Cars</h1>
            <ul>
              ${carList}
            </ul>
          </body>
        </html>
      `);
    } catch (error) {
      console.error('An error occurred while fetching cars:', error);
      res.status(500).send('An error occurred while fetching cars');
    }
  };