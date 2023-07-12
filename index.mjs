import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import bcrypt from 'bcrypt';
import { LogInCollection } from './mongo.mjs';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const tempelatePath = path.join(__dirname, 'tempelates');
const publicPath = path.join(__dirname, 'public');

console.log(publicPath);

app.use(express.static(publicPath));

app.get('/user-signup', (req, res) => {
  res.sendFile(path.resolve(tempelatePath, 'user-signup.html'));
});

app.get('/user-signin', (req, res) => {
  res.sendFile(path.resolve(tempelatePath, 'user-signin.html'));
});

app.get('/user-profile', (req, res) => {
  res.sendFile(path.resolve(tempelatePath, 'success.html'));
});

app.post('/user-signup', async (req, res) => {
  try {
    const checking = await LogInCollection.findOne({ name: req.body.name });
    if (checking) {
      res.send('User details already exist');
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      const data = {
        name: req.body.name,
        password: hashedPassword,
        salt: salt,
      };

      await LogInCollection.insertMany([data]);
      console.log('Signup successful:', data);
      res.status(200).json({ message: 'Signup successful' });
    }
  } catch (error) {
    console.error('An error occurred during signup:', error);
    res.status(500).json({ error: 'An error occurred during signup' });
  }
});

app.post('/user-signin', async (req, res) => {
  try {
    console.log('Signin successful:', req.body);

    const check = await LogInCollection.findOne({ name: req.body.email });
    if (check) {
      const passwordMatch = await bcrypt.compare(req.body.password, check.password);
      if (passwordMatch) {
        res.status(201).json({ success: true });
      } else {
        res.send('Incorrect password');
      }
    } else {
      res.send('User not found');
    }
  } catch (e) {
    res.send('An error occurred during signin');
    console.error(e);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
