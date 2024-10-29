// tabs.tsx
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Index from "@/app/(tabs)/index";
import Courses from "@/app/(tabs)/courses";
import { useThemeColors } from "@/hooks/useThemeColors";
import Icon from 'react-native-vector-icons/FontAwesome';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Course from "@/components/Course";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function TabLayout() {
    const colors = useThemeColors();

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: colors.tint,
                    width: 350,
                    height: 60,
                    alignSelf: "center",
                    marginBottom: 10,
                    borderRadius: 400,
                    justifyContent: "center",
                    alignItems: "center",
                },
            }}
        >
            <Tab.Screen
                name="Home"
                component={Index}
                options={{
                    title: 'Accueil',
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="home" color={color} size={size} />
                    ),
                    tabBarActiveTintColor: "white",
                    tabBarLabel: () => null,
                }}
            />
            <Tab.Screen
                name="Courses"
                options={{
                    title: 'Mes courses',
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="shopping-cart" color={color} size={size} />
                    ),
                    tabBarActiveTintColor: "white",
                    tabBarLabel: () => null,
                }}
            >
                {() => (
                    <Stack.Navigator>
                        <Stack.Screen name="CoursesList" component={Courses} options={{ headerShown: false }} />
                        <Stack.Screen name="CourseDetail" component={Course} options={{ headerShown: false }} />
                    </Stack.Navigator>
                )}
            </Tab.Screen>
        </Tab.Navigator>
    );
}
