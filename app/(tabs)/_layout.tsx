import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Index from "@/app/(tabs)/index";
import Login from "@/app/(tabs)/login";
import {useThemeColors} from "@/hooks/useThemeColors";
import Icon from 'react-native-vector-icons/FontAwesome';


const Tab = createBottomTabNavigator();


export default function TabLayout()
{
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
                alignItems: "center"
            }
        }}>
            <Tab.Screen name="Home" component={Index}  options={{
                title: 'Accueil',
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                    <Icon name="home" color={color} size={size} />
                ),
                tabBarActiveTintColor: "white",
                tabBarLabel: () => null
            }}/>
            <Tab.Screen name="Login" component={Login} />
        </Tab.Navigator>
    )
}

