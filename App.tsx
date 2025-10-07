// App.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<"home" | "addRemove">(
    "home"
  );

  const [dishName, setDishName] = useState("");
  const [description, setDescription] = useState("");
  const [course, setCourse] = useState("");
  const [price, setPrice] = useState("");
  const [menu, setMenu] = useState([
    {
      course: "Entrées (Starters)",
      dishes: [
        "Seared Scallops – R185",
        "Beef Carpaccio – R165",
        "Lobster Bisque – R175",
      ],
    },
    {
      course: "Plats Principaux (Mains)",
      dishes: [
        "Filet Mignon – R350",
        "Pan-Seared Duck Breast – R325",
        "Grilled Chilean Sea Bass – R345",
      ],
    },
    {
      course: "Desserts",
      dishes: [
        "Dark Chocolate Fondant – R145",
        "Crème Brûlée – R135",
        "Tarte Tatin – R140",
      ],
    },
    {
      course: "Digestifs & Beverages",
      dishes: [
        "Espresso, Cappuccino, Specialty Teas – R45 – R65",
        "Sommelier’s Wine Pairings – R120 per glass / R450 per bottle",
        "Fine Cognac & Aged Whiskey Selection – From R180",
      ],
    },
  ]);

  // Add dish
  const handleAddDish = () => {
    if (!dishName || !course || !price) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    const updatedMenu = menu.map((section) => {
      if (section.course === course) {
        return {
          ...section,
          dishes: [
            ...section.dishes,
            `${dishName} – R${price}${description ? ` (${description})` : ""}`,
          ],
        };
      }
      return section;
    });

    setMenu(updatedMenu);
    setDishName("");
    setDescription("");
    setCourse("");
    setPrice("");
    Alert.alert("Success", "Dish added to the menu!");
  };

  // Remove dish
  const handleRemoveDish = () => {
    if (!dishName) {
      Alert.alert("Error", "Please enter a dish name to remove");
      return;
    }

    const updatedMenu = menu.map((section) => ({
      ...section,
      dishes: section.dishes.filter(
        (dish) => !dish.toLowerCase().includes(dishName.toLowerCase())
      ),
    }));

    setMenu(updatedMenu);
    setDishName("");
    Alert.alert("Removed", "Dish has been removed from the menu.");
  };

  // Home Screen
  const HomeScreen = () => (
    <ScrollView style={styles.container}>
      <Text style={styles.logo}>Christoffel’s</Text>
      <Text style={styles.subtitle}>Tonight’s Menu</Text>

      {menu.map((section, index) => (
        <View key={index} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.course}</Text>
          {section.dishes.map((dish, i) => (
            <Text key={i} style={styles.dishText}>
              {dish}
            </Text>
          ))}
        </View>
      ))}

      <TouchableOpacity
        style={styles.goldButton}
        onPress={() => setCurrentScreen("addRemove")}
      >
        <Text style={styles.buttonText}>Add / Remove Dishes</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  // Add / Remove Screen
  const AddRemoveScreen = () => (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Add / Remove Dishes</Text>

      <TextInput
        placeholder="Dish Name"
        value={dishName}
        onChangeText={setDishName}
        style={styles.input}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
      <TextInput
        placeholder="Course (e.g. Entrées (Starters))"
        value={course}
        onChangeText={setCourse}
        style={styles.input}
      />
      <TextInput
        placeholder="Price (e.g. 185)"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        style={styles.input}
      />

      <TouchableOpacity style={styles.goldButton} onPress={handleAddDish}>
        <Text style={styles.buttonText}>Add Dish</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.removeButton} onPress={handleRemoveDish}>
        <Text style={styles.buttonText}>Remove Dish</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.homeButton}
        onPress={() => setCurrentScreen("home")}
      >
        <Text style={styles.buttonText}>Back to Home</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  return currentScreen === "home" ? <HomeScreen /> : <AddRemoveScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffaf0",
    padding: 20,
  },
  logo: {
    fontSize: 40,
    fontFamily: "serif",
    fontStyle: "italic",
    fontWeight: "300",
    textAlign: "center",
    marginTop: 20,
    color: "#6b4f1d",
  },
  subtitle: {
    fontSize: 22,
    textAlign: "center",
    color: "#5d4037",
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4e342e",
    marginBottom: 5,
  },
  dishText: {
    fontSize: 16,
    color: "#3e2723",
    marginVertical: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginVertical: 8,
    backgroundColor: "#fff",
  },
  goldButton: {
    backgroundColor: "#C9A43C",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  removeButton: {
    backgroundColor: "#b22222",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  homeButton: {
    backgroundColor: "#C9A43C",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#4e342e",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "500",
  },
});
