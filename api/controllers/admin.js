const Sequelize = require("sequelize");
const fetch = require("node-fetch");
const LiqPay = require('../../lib/liqpay');
const { base64encode } = require("nodejs-base64");
const public_key = "sandbox_i60836324630";
const private_key = "sandbox_B9GsrZKGel0WKXvxDCZEmuaUynulsDwu4bMPiE8W";
const liqpay = new LiqPay(public_key, private_key);

exports.admin_pay = (req, res, next) => {
  let sum = req.params.sum;
  if(sum === undefined || sum < 5) {
    sum = 5;
  }
  let json_string = {"public_key":public_key,"version":"3","action":"pay","amount":`${sum}`,"currency":"UAH","description":"test","order_id":"000001"};
  let data = base64encode(JSON.stringify(json_string));
  const sha1 = require('crypto').createHash('sha1').update(private_key + data + private_key, 'utf8').digest('base64');
  const signature = sha1;
  res.status(200).json({
    data: data,
    signature: signature,
  });
};

exports.admin_p2p = (req, res, next) => {
  liqpay.api("request", {
    "action"         : "p2p",
    "version"        : "3",
    "phone"          : "380993015228",
    "amount"         : "100",
    "currency"       : "UAH",
    "description"    : "P2P text",
    "order_id"       : "order_id_3",
    "receiver_card"  : "5168757384491553",
    "card"           : "4242424242424242",
    "card_exp_month" : "03",
    "card_exp_year"  : "22",
    "card_cvv"       : "305"
    }, function(json){
    if (json.status === 'success') {
      res.status(200).json({
        status: json.status,
        info: liqpay,
      });
    } else {
      res.status(400).json({
        status: json.status,
        info: liqpay,
      });
    }
    });
};



