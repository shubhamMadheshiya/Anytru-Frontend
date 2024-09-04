import React from "react";
import axios from "axios";
import Logo from "../assets/AnyTru.png";

const Home = () => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZDgyYzcwNzdmMzJjZjJkMzViODE4NSIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzI1NDUwNjc0LCJleHAiOjE3MjgwNDI2NzR9.AnKnD5JW0kCh2IyK4jJh-GQ2QLiWD6oi8UWPKewN7nQ";
  const checkoutHandler = async (amount) => {
    try {
      // await axios.get("http://localhost:5000/api/getkey", {
      //   headers: {
      //     authorization: `Bearer ${token}`,
      //   },
      // });

      const { data } = await axios.post(
        "http://localhost:5000/order/checkoutSingle?deliveryType=Standard",
        {
          productId: "66d84b6577f32cf2d35b81d7",
          offerId: "66d850ac77f32cf2d35b8228",
          addressId: "66d8c055d5e3ebb10b70a86d",
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
