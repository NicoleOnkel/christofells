import * as React from 'react';
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const initialDishes = [
  { id: '1', name: 'Grilled Salmon', category: 'Seafood', price: 'R150' },
  { id: '2', name: 'Chicken Burger', category: 'Fast Food', price: 'R120' },
  { id: '3', name: 'Caesar Salad', category: 'Salad', price: 'R90' },
];

// 🏠 Home Screen
function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🍽️ FreshBite Restaurant</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddRemove')}>
        <Text style={styles.buttonText}>Add / Remove Dishes</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ViewDishes')}>
        <Text style={styles.buttonText}>View Dishes</Text>
      </TouchableOpacity>
    </View>
  );
}

// ➕ Add / Remove Dishes Screen
function AddRemoveScreen() {
  const [dish, setDish] = useState('');
  const [menu, setMenu] = useState(initialDishes);

  const addDish = () => {
    if (dish.trim() === '') return Alert.alert('Error', 'Please enter a dish name');
    const newDish = { id: Date.now().toString(), name: dish, category: 'Custom', price: 'R100' };
    setMenu([...menu, newDish]);
    Alert.alert('Success', `${dish} added to menu!`);
    setDish('');
  };

  const removeDish = (id) => {
    const updatedMenu = menu.filter((item) => item.id !== id);
    setMenu(updatedMenu);
    Alert.alert('Removed', 'Dish has been removed.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add / Remove Dishes</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter new dish name"
        value={dish}
        onChangeText={setDish}
      />

      <TouchableOpacity style={styles.button} onPress={addDish}>
        <Text style={styles.buttonText}>Add Dish</Text>
      </TouchableOpacity>

      <FlatList
        data={menu}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.menuItem}>
            <Text style={styles.dish}>{item.name}</Text>
            <TouchableOpacity onPress={() => removeDish(item.id)}>
              <Text style={styles.remove}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

// 🍴 View Dishes Screen (no filter)
function ViewDishesScreen() {
  const [menu] = useState(initialDishes);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>View Dishes</Text>
      <FlatList
        data={menu}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.menuItem}>
            <Text style={styles.dish}>{item.name}</Text>
            <Text style={styles.price}>{item.price}</Text>
          </View>
        )}
      />
    </View>
  );
}

// 🧭 App Navigation
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddRemove" component={AddRemoveScreen} />
        <Stack.Screen name="ViewDishes" component={ViewDishesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// 🎨 Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 10,
    marginVertical: 10,
    width: 220,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    padding: 10,
    borderRadius: 8,
    width: '90%',
    marginBottom: 10,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 250,
    paddingVertical: 8,
  },
  dish: {
    fontSize: 16,
  },
  price: {
    fontWeight: 'bold',
  },
  remove: {
    color: 'red',
    fontWeight: '600',
  },
});
