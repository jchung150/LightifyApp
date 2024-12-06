import uuid from "react-native-uuid";
import axios from "axios";

const BASE_URL = "https://openapi.api.govee.com/router/api/v1/";

const GOVEE_API_KEY = process.env.GOVEE_API_KEY;
const GOVEE_DEVICE_MODEL = process.env.GOVEE_DEVICE_MODEL;
const GOVEE_DEVICE_ID = process.env.GOVEE_DEVICE_ID;

export async function fetchDevices() {
  try {
    const response = await axios.get(`${BASE_URL}/user/devices`, {
      headers: {
        "Content-Type": "application/json",
        "Govee-API-Key": GOVEE_API_KEY,
      },
    });

    console.log("Devices fetched successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching devices:",
      error.response?.data || error.message
    );
    throw new Error("Failed to fetch devices.");
  }
}

export async function setGoveeLightColor(rgb) {
  const payload = {
    requestId: uuid.v4(),
    payload: {
      sku: GOVEE_DEVICE_MODEL,
      device: GOVEE_DEVICE_ID,
      capability: {
        type: "devices.capabilities.color_setting",
        instance: "colorRgb",
        value: rgb,
      },
    },
  };

  try {
    const response = await axios.post(`${BASE_URL}/device/control`, payload, {
      headers: {
        "Content-Type": "application/json",
        "Govee-API-Key": GOVEE_API_KEY,
      },
    });

    console.log("Govee Light Response:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error setting Govee light color:",
      error.response?.data || error.message
    );
    throw error;
  }
}
