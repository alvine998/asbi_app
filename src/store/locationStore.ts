import { create } from "zustand";
import { Platform } from "react-native";
import Geolocation from "react-native-geolocation-service";
import { request, PERMISSIONS, RESULTS } from "react-native-permissions";
import axios from "axios";

interface Location {
    latitude: number;
    longitude: number;
}

interface LocationStore {
    location: Location | null;
    address: any;
    getLocation: () => void;
}

const getAddressFromCoordinates = async (latitude: any, longitude: any) => {
    console.log(latitude, longitude);
    try {
        const response = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
            {
                headers: {
                    "User-Agent": "donasiqu/1.0 (donasiqu.office@email.com)",
                },
            }
        );

        if (response.data && response.data.display_name) {
            // Split the address into parts
            let addressParts = response.data.display_name.split(", ");

            // Replace "Kabupaten" with "KAB" and "Kota" with "KOTA"
            addressParts = addressParts.map((part: any) =>
                part.includes("Kabupaten") ? part.replace("Kabupaten", "KAB.") :
                    part.includes("Kota") ? part.replace("Kota", "KOTA") :
                        part
            );

            return addressParts?.join(", ")?.toUpperCase(); // Rejoin the modified address
        } else {
            return "No address found";
        }
    } catch (error) {
        console.error("Error fetching address:", error);
        return "Failed to get address";
    }
};

export const useLocationStore = create<LocationStore>((set) => ({
    location: null,
    address: null,
    getLocation: async () => {
        try {
            const permission =
                Platform.OS === "android" ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;

            const result = await request(permission);

            if (result === RESULTS.GRANTED) {
                Geolocation.getCurrentPosition(
                    async (position) => {
                        const { latitude, longitude } = position.coords;

                        const address = await getAddressFromCoordinates(latitude, longitude);
                        set({ location: { latitude, longitude }, address });
                    },
                    (error) => console.error("Error getting location:", error),
                    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
                );
            } else {
                console.log("Location permission denied");
            }
        } catch (error) {
            console.error("Permission request error:", error);
        }
    },
}));
