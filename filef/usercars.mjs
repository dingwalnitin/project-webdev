import { User, Car } from '../mongo.mjs';
import jwt from 'jsonwebtoken';

const UserCarss = async (req, res) => {
  const token = req.cookies['token']; // Extract JWT from the 'token' cookie

  try {
    if (!token) {
      res.status(401).send('Unauthorized');
      return;
    }

    const decoded = jwt.verify(token, 'your-secret-key');
    const username = decoded.username; // Assuming decoded.username represents the username

    // Fetch the user by username
    const user = await User.findOne({ username });

    if (!user) {
      res.status(404).send('User not found');
      return;
    }

    // Fetch the cars used by the user
    const cars = await Car.find({ _id: { $in: user.vehInfo } }).select('carname');

    const carNames = cars.map((car) => car.carname);

    // Send the HTML response
    const html = `
      <html>
        <head>
          <title>User Cars</title>
        </head>
        <body>
          <h1>${user.username}</h1>
          <h3>Cars Used:</h3>
          <ul>
            ${carNames.map((carName) => `<li>${carName}</li>`).join('')}
          </ul>
        </body>
      </html>
    `;

    res.send(html);
  } catch (error) {
    console.error('An error occurred while fetching user cars:', error);
    res.status(500).send('An error occurred while fetching user cars');
  }
};

export { UserCarss };
