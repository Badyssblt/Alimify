import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Index from "@/app/(tabs)/index";
import Courses from "@/app/(tabs)/courses";
import { useThemeColors } from "@/hooks/useThemeColors";
import Icon from 'react-native-vector-icons/FontAwesome';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Course from "@/components/Course";
import Login from "@/app/(tabs)/login";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Account from "@/app/(tabs)/account";
import { useEffect, useState } from "react";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function TabLayout() {
    const colors = useThemeColors();
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const fetchToken = async () => {
            const storedToken = await AsyncStorage.getItem('token');
            setToken(storedToken);
        };
        fetchToken();
    }, []);

    const onLogout = () => {
        setToken(null);
    };

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

            {token ? (
                <Tab.Screen
                    name="Account"
                    options={{
                        title: 'Mon compte',
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (
                            <Icon name="user" color={color} size={size} />
                        ),
                        tabBarActiveTintColor: "white",
                        tabBarLabel: () => null,
                    }}
                >
                    {() => <Account onLogout={onLogout} />}
                </Tab.Screen>
            ) : (
                <Tab.Screen
                    name="Login"
                    options={{
                        title: 'Se connecter',
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (
                            <Icon name="user" color={color} size={size} />
                        ),
                        tabBarActiveTintColor: "white",
                        tabBarLabel: () => null,
                    }}
                >
                    {() => <Login onLoginSuccess={setToken} />}
                </Tab.Screen>
            )}
        </Tab.Navigator>
    );
}


