import { View, Image, ImageSourcePropType, Text  } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { icons } from '../../constants';

interface TabIconProps {
  icon: ImageSourcePropType;
  color: string;
  name: string;
  focused: boolean;
}

const TabIcon: React.FC<TabIconProps> = ({ icon, color, name, focused}) => {
  return (
    <View className='items-center justify-center gap-2 min-w-[64px]'>
      <Image
        source={icon}
        resizeMode='contain'
        tintColor={color}
        className='w-6 h-6'
      />
      <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`} style={{ color: color }}>
        {name}
      </Text>
    </View>
  )
}

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#EED3B1',
          tabBarInactiveTintColor: '#CDCDE0',
          tabBarStyle: {
            backgroundColor: '#1F4529',
            borderTopWidth: 1,
            borderTopColor: '#232533',
            height: 84,
            paddingTop: 20,
          }
        }}
      >
        <Tabs.Screen 
          name="map" 
          options={{
            title: 'Map',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.profile}
                color={color}
                name="Map"
                focused={focused}
              />
            )
          }}
        />
        <Tabs.Screen 
          name="profile" 
          options={{
            title: 'Profile',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.profile}
                color={color}
                name="Profile"
                focused={focused}
              />
            )
          }}
        />
        <Tabs.Screen 
          name="settings" 
          options={{
            title: 'Settings',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.profile}
                color={color}
                name="Settings"
                focused={focused}
              />
            )
          }}
        />
      </Tabs>
    </>
  )
}

export default TabsLayout