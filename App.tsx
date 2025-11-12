import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

type Dish = {
  name: string;
  description: string;
  course: string;
  price: string;
};

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<"home" | "addRemove" | "filter">("home");
  const [menu, setMenu] = useState<Dish[]>([
    { name: "Seared Scallops", description: "", course: "Starters", price: "R185" },
    { name: "Beef Carpaccio", description: "", course: "Starters", price: "R165" },
    { name: "Lobster Bisque", description: "", course: "Starters", price: "R175" },
    { name: "Filet Mignon", description: "", course: "Mains", price: "R350" },
    { name: "Pan-Seared Duck Breast", description: "", course: "Mains", price: "R325" },
    { name: "Grilled Chilean Sea Bass", description: "", course: "Mains", price: "R345" },
    { name: "Dark Chocolate Fondant", description: "", course: "Desserts", price: "R145" },
    { name: "Crème Brûlée", description: "", course: "Desserts", price: "R135" },
    { name: "Tarte Tatin", description: "", course: "Desserts", price: "R140" },
  ]);

  const [newDish, setNewDish] = useState<Dish>({
    name: "",
    description: "",
    course: "",
    price: "",
  });
  const [filter, setFilter] = useState<string>("Starters");

  const handleAddDish = () => {
    if (!newDish.name || !newDish.course || !newDish.price) {
      Alert.alert("Please fill in all fields.");
      return;
    }
    setMenu([...menu, newDish]);
    setNewDish({ name: "", description: "", course: "", price: "" });
    Alert.alert("Dish Added", "Your dish has been added to the menu!");
  };

  const handleRemoveDish = () => {
    const updatedMenu = menu.filter((dish) => dish.name !== newDish.name);
    if (updatedMenu.length === menu.length) {
      Alert.alert("Dish Not Found", "No dish with that name exists.");
    } else {
      setMenu(updatedMenu);
      setNewDish({ name: "", description: "", course: "", price: "" });
      Alert.alert("Dish Removed", "The dish has been removed from the menu.");
    }
  };

  // Home Screen
  const HomeScreen = () => (
    <KeyboardAwareScrollView style={styles.container}>
      <Text style={styles.restaurantName}>Christoffel’s</Text>
      <Text style={styles.subtitle}>Tonight’s Menu</Text>

      {["Starters", "Mains", "Desserts", "Digestifs & Beverages"].map((section) => (
        <View key={section} style={styles.section}>
          <Text style={styles.sectionTitle}>{section}</Text>
          {menu
            .filter((dish) => dish.course === section)
            .map((dish, index) => (
              <Text key={index} style={styles.dishText}>
                {dish.name} – {dish.price}
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

      <TouchableOpacity
        style={styles.goldButton}
        onPress={() => setCurrentScreen("filter")}
      >
        <Text style={styles.buttonText}>Select Dishes by Course</Text>
      </TouchableOpacity>
    </KeyboardAwareScrollView>
  );

  // Add/Remove Screen
  const AddRemoveScreen = () => (
    <KeyboardAwareScrollView style={styles.container}>
      <Text style={styles.title}>Manage Menu</Text>

      <TextInput
        style={styles.input}
        placeholder="Dish Name"
        value={newDish.name}
        onChangeText={(text) => setNewDish({ ...newDish, name: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={newDish.description}
        onChangeText={(text) => setNewDish({ ...newDish, description: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Course (e.g., Starters, Mains, Desserts)"
        value={newDish.course}
        onChangeText={(text) => setNewDish({ ...newDish, course: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Price (e.g., R150)"
        keyboardType="default"
        value={newDish.price}
        onChangeText={(text) => setNewDish({ ...newDish, price: text })}
      />

      <TouchableOpacity style={styles.goldButton} onPress={handleAddDish}>
        <Text style={styles.buttonText}>Add to Menu</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.removeButton} onPress={handleRemoveDish}>
        <Text style={styles.buttonText}>Remove Dish</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.homeButton} onPress={() => setCurrentScreen("home")}>
        <Text style={styles.buttonText}>Back to Home</Text>
      </TouchableOpacity>
    </KeyboardAwareScrollView>
  );

  // Filter Courses Screen
  const FilterCoursesScreen = () => {
    const filteredDishes = menu.filter((dish) => dish.course === filter);

    return (
      <KeyboardAwareScrollView style={styles.container}>
        <Text style={styles.title}>Filter Courses</Text>

        {["Starters", "Mains", "Desserts"].map((course) => (
          <TouchableOpacity
            key={course}
            style={styles.goldButton}
            onPress={() => setFilter(course)}
          >
            <Text style={styles.buttonText}>{course}</Text>
          </TouchableOpacity>
        ))}

        <Text style={styles.subtitle}>Showing: {filter}</Text>
        {filteredDishes.map((dish, index) => (
          <Text key={index} style={styles.dishText}>
            {dish.name} – {dish.price}
          </Text>
        ))}

        <TouchableOpacity style={styles.homeButton} onPress={() => setCurrentScreen("home")}>
          <Text style={styles.buttonText}>Back to Home</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    );
  };

  return (
    <>
      {currentScreen === "home" ? (
        <HomeScreen />
      ) : currentScreen === "filter" ? (
        <FilterCoursesScreen />
      ) : (
        <AddRemoveScreen />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff8e1",
    padding: 20,
  },
  restaurantName: {
    fontSize: 40,
    textAlign: "center",
    color: "#6b4f1d",
    fontFamily: "cursive",
    marginVertical: 10,
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
