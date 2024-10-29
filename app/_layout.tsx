import { Stack } from "expo-router";
import Course from "@/components/Course";
import {FoodProvider} from "@/context/FoodContext";


export default function RootLayout() {
  return (
        <FoodProvider>
            <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }}/>
            </Stack>
        </FoodProvider>

  );
}
