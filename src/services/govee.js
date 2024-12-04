import uuid from "react-native-uuid";
import axios from "axios";

const BASE_URL = "https://openapi.api.govee.com";
//const BASE_URL = 'https://developer-api.govee.com/v1/'

const GOVEE_API_KEY = process.env.GOVEE_API_KEY;
const GOVEE_DEVICE_MODEL = process.env.GOVEE_DEVICE_MODEL;
const GOVEE_DEVICE_ID = process.env.GOVEE_DEVICE_ID;

// Fetch the list of Govee devices associated with your API key
export async function fetchDevices() {
    try {
      const response = await axios.get(
        'https://openapi.api.govee.com/router/api/v1/user/devices',
        //'https://developer-api.govee.com/v1/devices',
        {
          headers: {
            'Content-Type': 'application/json',
            'Govee-API-Key': GOVEE_API_KEY,
          },
        }
      );
  
      console.log('Devices fetched successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching devices:', error.response?.data || error.message);
      throw new Error('Failed to fetch devices.');
    }
  }

  export async function setGoveeLightColor(rgb) {
    //const rgbValue = ((rgb.r & 0xff) << 16) | ((rgb.g & 0xff) << 8) | (rgb.b & 0xff);
  
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
      const response = await axios.post(
        "https://openapi.api.govee.com/router/api/v1/device/control",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            "Govee-API-Key": GOVEE_API_KEY,
          },
        }
      );
  
      console.log("Govee Light Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error setting Govee light color:", error.response?.data || error.message);
      throw error;
    }
  }