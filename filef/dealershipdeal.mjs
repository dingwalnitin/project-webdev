import { Deal , Dealership} from '../mongo.mjs';

const getDDeal = async (req, res) => {

  try {
    // Fetch all dealerships
    const dealerships = await Dealership.find();

    // Send the HTML response
    const html = `
      <html>
        <head>
          <title>Dealership Deals</title>
        </head>
        <body>
          ${await Promise.all(dealerships.map(async (dealership) => `
            <h1>${dealership.dealershipname}</h1>
            <h3>Deals:</h3>
            <ol>
              ${await getDealsForDealership(dealership)}
            </ol>
          `))}
        </body>
      </html>
    `;

    res.send(html);
  } catch (error) {
    console.error('An error occurred while fetching dealership deals:', error);
    res.status(500).send('An error occurred while fetching dealership deals');
  }
};

async function getDealsForDealership(dealership) {
  const deals = await Deal.find({ _id: { $in: dealership.dealershipdeal } });
  return deals.map((deal) => `<li>${deal.dealInfo}</li>`).join('');
}


export { getDDeal };