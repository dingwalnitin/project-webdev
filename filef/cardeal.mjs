import { Deal , Car} from '../mongo.mjs';

const getDeal = async (req, res) => {
    try {
        // Fetch all cars
        const cars = await Car.find();
    
        // Send the HTML response
        const html = `
          <html>
            <head>
              <title>Car Deals</title>
            </head>
            <body>
              ${await Promise.all(cars.map(async (car) => `
                <h1>${car.carname}</h1>
                <h3>Deals:</h3>
                <ol>
                  ${await getDealsForCar(car)}
                </ol>
              `))}
            </body>
          </html>
        `;
    
        res.send(html);
      } catch (error) {
        console.error('An error occurred while fetching car deals:', error);
        res.status(500).send('An error occurred while fetching car deals');
      }
    };
    
    async function getDealsForCar(car) {
      const deals = await Deal.find({ carId: car._id });
      return deals.map((deal) => `<li>${deal.dealInfo}</li>`).join('');
    }


  export { getDeal };