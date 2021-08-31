// instal mailchimp in node&express server and required it
const mailchimp = require("@mailchimp/mailchimp_marketing");
// require express
const express = require(`express`);
// initial express
const app = express();

// for sending static file to webpage via server
app.use(express.static(`public`));
// take data which is enter in webpage
app.use(express.urlencoded({
  extended: true
}));

// setting mailchimp configration before using mailchimp api
mailchimp.setConfig({
  apiKey: "f18a160a2c9c3a5cbbd29ec6c6283808-us5",
  server: "us5",
});

// deciding our html-file in get request in root route
app.get(`/`, (req, res) => {
  res.sendFile(__dirname + `/signup.html`);
});

// sending required info back to root route when user given some data
app.post(`/`, (req, res) => {
  // storing user submited data in this
  const fName = req.body.fName;
  const lName = req.body.lName;
  const email = req.body.email;
  console.log(fName, lName, email);

  // created a obj because when user is object eg: 3 obj means 3 user
  const subData = {
    fName : fName,
    lName : lName,
    email : email
  }

  // addind members in list code is from mailchimp website
  const run = async () => {
    try{
      const response = await mailchimp.lists.addListMember("299a1ea9bf", {
        email_address: subData.email,
        status: "subscribed",
        merge_fields: {
          FNAME: subData.fName,
          LNAME: subData.lName
        }
      });
      res.sendFile(__dirname+`/success.html`);
    }

    catch (error) {
      res.sendFile(__dirname+`/failure.html`);
    }
  };
  run();

});

app.post('/failure', (req, res) => {
  res.redirect('/')
});
app.listen(process.env.PORT || 3000, () => console.log(`Server is up and running on port 3000`));

// async function run() {
//   // To check API is Working or not
//   // const response = await mailchimp.ping.get();
//   // console.log(response);
//
// // This will give all the info of  all the list present in dashboard
//   // const response = await mailchimp.lists.getAllLists();
//   // console.log(response);
//
// // To Get info of any specfic list/audience by list_id
//   const response = await mailchimp.lists.getList("299a1ea9bf");
//   console.log(response);
// }
// run();





// MailChimp API-key.
// f18a160a2c9c3a5cbbd29ec6c6283808-us5

// Mailchimp Audience-ID
// 299a1ea9bf
