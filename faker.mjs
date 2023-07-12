import mongoose from 'mongoose';
import faker from 'faker';
import { User, Dealership, SoldVeh, Deal, Car, Admin } from './mongo.mjs';

mongoose.connect('mongodb://localhost:27017/Backend_Project')
  .then(() => {
    console.log('mongoose connected');

    // Generate fake data and save to the database
    generateFakeData()
      .then(() => {
        console.log('Fake data generated and saved successfully');
        mongoose.disconnect();
      })
      .catch((e) => {
        console.error('Failed to generate and save fake data:', e);
        mongoose.disconnect();
      });
  })
  .catch((e) => {
    console.error('Failed to connect to MongoDB:', e);
  });

async function generateFakeData() {
  try {
    // Generate fake admin data
    const admin = new Admin({
      useremail: faker.internet.email(),
      userpassword: faker.internet.password(),
      salt: faker.random.alphaNumeric()
    });
    await admin.save();

    // Generate fake users
    const users = [];
    for (let i = 0; i < 10; i++) {
      const user = new User({
        vehInfo: new mongoose.Types.ObjectId(),
        useremail: faker.internet.email(),
        userpassword: faker.internet.password(),
        userlocation: faker.address.city(),
        userinfo: faker.lorem.sentence(),
        salt: faker.random.alphaNumeric()
      });
      users.push(user);
    }
    await User.insertMany(users);

    // Generate fake dealerships
    const dealerships = [];
    for (let i = 0; i < 5; i++) {
      const dealership = new Dealership({
        dealershipname: faker.company.companyName(),
        dealershipemail: faker.internet.email(),
        dealershippassword: faker.internet.password(),
        dealershiplocation: faker.address.city(),
        dealershipinfo: faker.lorem.sentence(),
        salt: faker.random.alphaNumeric(),
        dealershipId: faker.random.uuid(),
        dealershipcars: [], // Initialize as empty array
        dealershipdeal: [], // Initialize as empty array
        dealershipsoldveh: [] // Initialize as empty array
      });

      // Generate fake car references for dealershipcars
      const carReferences = [];
      for (let j = 0; j < 5; j++) {
        const car = new Car({
          carId: faker.random.uuid(),
          cartype: faker.lorem.word(),
          carname: faker.vehicle.vehicle(),
          carmodel: faker.vehicle.model(),
          carInfo: faker.lorem.sentence()
        });
        await car.save();
        carReferences.push(car._id);
      }
      dealership.dealershipcars = carReferences;

      // Generate fake deal references for dealershipdeal
      const dealReferences = [];
      for (let j = 0; j < 3; j++) {
        const deal = new Deal({
          dealId: faker.random.uuid(),
          carId: carReferences[j],
          dealInfo: faker.lorem.sentence()
        });
        await deal.save();
        dealReferences.push(deal._id);
      }
      dealership.dealershipdeal = dealReferences;

      // Generate fake sold vehicle references for dealershipsoldveh
      const soldVehReferences = [];
      for (let j = 0; j < 2; j++) {
        const soldVeh = new SoldVeh({
          vehId: faker.random.uuid(),
          carId: carReferences[j + 2],
          vehInfo: faker.lorem.sentence()
        });
        await soldVeh.save();
        soldVehReferences.push(soldVeh._id);
      }
      dealership.dealershipsoldveh = soldVehReferences;

      dealerships.push(dealership);
    }
    await Dealership.insertMany(dealerships);
  } catch (error) {
    throw error;
  }
}
