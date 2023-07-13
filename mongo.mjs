import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/Backend_Project')
  .then(() => {
    console.log('mongoose connected');
  })
  .catch((e) => {
    console.log('failed');
  });

const UserSchema = new mongoose.Schema({
  vehInfo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SoldVeh',
    required: false
  },
  useremail: {
    type: String,
    required: true
  },
  userpassword: {
    type: String,
    required: true
  },
  userlocation: {
    type: String,
    required: true
  },
  userinfo: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: true
  }
});

const DealershipSchema = new mongoose.Schema({
  dealershipname: {
    type: String,
    required: true
  },
  dealershipemail: {
    type: String,
    required: true
  },
  dealershippassword: {
    type: String,
    required: true
  },
  dealershiplocation: {
    type: String,
    required: true
  },
  dealershipinfo: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: true
  },
  dealershipId: {
    type: String,
    required: true
  },
  dealershipcars: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car'
  }],
  dealershipdeal: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Deal'
  }],
  dealershipsoldveh: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SoldVeh',
    required: true
  }]
});

const SoldVehSchema = new mongoose.Schema({
  vehId: {
    type: String,
    required: true
  },
  carId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car',
    required: true
  },
  vehInfo: {
    type: String,
    required: true
  }
});

const DealSchema = new mongoose.Schema({
  dealId: {
    type: String,
    required: true
  },
  carId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car',
    required: true
  },
  dealInfo: {
    type: String,
    required: true
  }
});

const CarSchema = new mongoose.Schema({
  carId: {
    type: String,
    required: true
  },
  cartype: {
    type: String,
    required: true
  },
  carname: {
    type: String,
    required: true
  },
  carmodel: {
    type: String,
    required: true
  },
  carInfo: {
    type: String,
    required: true
  }
});

const AdminSchema = new mongoose.Schema({
  useremail: {
    type: String,
    required: true
  },
  userpassword: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: true
  }
});

const User = mongoose.model('User', UserSchema);
const Dealership = mongoose.model('Dealership', DealershipSchema);
const SoldVeh = mongoose.model('SoldVeh', SoldVehSchema);
const Deal = mongoose.model('Deal', DealSchema);
const Car = mongoose.model('Car', CarSchema);
const Admin = mongoose.model('Admin', AdminSchema);

export { User, Dealership, SoldVeh, Deal, Car, Admin };
