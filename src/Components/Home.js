import React from "react";
import axios from "axios";
import Logo from "../assets/AnyTru.png";

const Home = () => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OTM4YjUzZTY5MDgxOTc5ZTVhMWUxYiIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzI1MzUxMDk3LCJleHAiOjE3Mjc5NDMwOTd9.N5xUGX09-phZoR3rctY5gHXCLfUbM0ghG8oA_Be4DQ8";
  const checkoutHandler = async (amount) => {
    try {
      // await axios.get("http://localhost:5000/api/getkey", {
      //   headers: {
      //     authorization: `Bearer ${token}`,
      //   },
      // });

      const { data } = await axios.post(
        "http://localhost:5000/order/checkoutSingle",
        {
          productId: "669392924acf601ac523fe47",
          offerId: "6693a317de48b53e801cd0d3",
          addressId: "66940d55a63b6ad12a546407",
          quantity: 4,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(data);
      const options = {
        key: "rzp_test_3fSbxV1af8FRWh",
        amount: data.order.amount,
        currency: data.order.currency,
        name: "AnyTru",
        description: "Tutorial of RazorPay",
        image: Logo,
        order_id: data.order.id,
        callback_url: "http://localhost:5000/order/verificationPay",
        prefill: {
          name: `${data.orderDoc.user.firstName} ${data.orderDoc.user.lastName}`,
          email: data.orderDoc.user.email,
          contact: data.orderDoc.user.phoneNumber,
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#F2682D",
        },
      };
      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <h1>Home Page</h1>
        <button onClick={() => checkoutHandler(500)}>Pay</button>{" "}
        {/* Pass the amount to checkoutHandler */}
      </div>
    </>
  );
};

export default Home;
