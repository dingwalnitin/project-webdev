import { Car , Dealership} from '../mongo.mjs';
import jwt from 'jsonwebtoken'

const carsold = async (req, res) => {
    try {
        const token = req.headers['x-magic'];
        if (!token) {
          return res.status(401).json({ error: 'Token not provided' });
        }
    
        const decoded = jwt.verify(token, 'your-secret-key');
        if (!decoded.username) {
          return res.status(400).json({ error: 'Invalid token' });
        }
    
        const dealership = await Dealership.findOne({
          dealershipemail: decoded.username
        }).populate('dealershipsoldveh');
    
        if (!dealership) {
          return res.status(404).json({ error: 'Dealership not found' });
        }
    
        const soldVehicles = dealership.dealershipsoldveh;
    
        res.json(soldVehicles);
      } catch (error) {
        console.error('An error occurred while fetching sold cars:', error);
        res.status(500).json({ error: 'An error occurred while fetching sold cars' });
      }  };


export { carsold };
