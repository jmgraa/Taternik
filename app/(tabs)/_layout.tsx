import React from 'react'
import { View, Image, ImageSourcePropType, Text  } from 'react-native'
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
      <Text 
        className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`} 
        style={{ color: color }}
      >
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
            backgroundColor: '#000',
            opacity: 0.9,
            borderTopWidth: 1,
            borderTopColor: '#232533',
            height: '6%',
            paddingTop: '2%',
            paddingBottom: '2%'
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
                icon={icons.map}
                color={'#c0cea1'}
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
                color={'#c0cea1'}
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
                icon={icons.settings}
                color={'#c0cea1'}
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