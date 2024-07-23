// src/socket.js
import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:5000"; // Replace with your backend URL and port
const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NWM3ZmIxMDMxZGY3ZThiNWFkZGRlMSIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzE4MDk4NDUwLCJleHAiOjE3MjA2OTA0NTB9.0n7XjGX3mxE0Uvp_fpBarvCjOoiOjaOJcFv8sywZjYI";
const socket = io(SOCKET_URL, {
  transports: ["websocket"], // you can add other transport methods if needed
  pingTimeout: 60000, // should match the server's pingTimeout
  query: { token },
});

export default socket;
