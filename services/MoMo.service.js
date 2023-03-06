const { default: axios } = require("axios");
const crypto = require("crypto");

const apiMomo = async (total_amount, time_request) => {
  try {
    var partnerCode = "MOMO";
    var accessKey = "F8BBA842ECF85";
    var secretkey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
    var requestId = partnerCode + new Date().getTime();
    var orderId = requestId;
    var orderInfo = time_request;
    var returnUrl = "http://localhost:3000/purchase/2";
    var notifyUrl = "http://localhost:3000/purchase/2";
    // var ipnUrl = redirectUrl = "https://webhook.site/454e7b77-f177-4ece-8236-ddf1c26ba7f8";
    var amount = total_amount;
    var requestType = "captureMoMoWallet";
    var extraData = ""; //pass empty value if your merchant does not have stores

    //before sign HMAC SHA256 with format
    //accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
    var rawSignature =
      "partnerCode=" +
      partnerCode +
      "&accessKey=" +
      accessKey +
      "&requestId=" +
      requestId +
      "&amount=" +
      amount +
      "&orderId=" +
      orderId +
      "&orderInfo=" +
      orderInfo +
      "&returnUrl=" +
      returnUrl +
      "&notifyUrl=" +
      notifyUrl +
      "&extraData=" +
      extraData;
    //puts raw signature
    console.log("--------------------RAW SIGNATURE----------------");
   
    var signature = crypto
      .createHmac("sha256", secretkey)
      .update(rawSignature)
      .digest("hex");
    const requestBody = JSON.stringify({
      partnerCode: partnerCode,
      accessKey: accessKey,
      requestId: requestId,
      amount: amount,
      orderId: orderId,
      orderInfo: orderInfo,
      notifyUrl: notifyUrl,
      returnUrl: returnUrl,
      extraData: extraData,
      requestType: requestType,
      signature: signature,
      lang: "en",
    });
   
    const MoMo_request = axios.post(
      "https://test-payment.momo.vn/gw_payment/transactionProcessor",
      requestBody);
    const res = (await MoMo_request).data;
    console.log(res,'_________');
   
    return {
      message: "Thực hiện thanh toán",
      data: res,
      success: true,
    };
  } catch (error) {
    return { message: "Có lỗi xảy ra", success: false };
  }
};

// apiMomo();
// // write data to request body
// console.log("Sending....");
// req.write(requestBody);
// req.end();
module.exports = {
  apiMomo,
};
