import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { ButtonGroup } from "react-native-elements";

import Colors from "./colors";

const ProductListingPage = () => {
  const [products, setProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [sortBy, setSortBy] = useState(0); // 0: Rating, 1: Discount, 2: Price

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("https://dummyjson.com/products?limit=100");
      const data = await response.json();
      setProducts(data.products);
      setSortedProducts(data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const sortProducts = (selectedIndex) => {
    let sorted = [...products];

    switch (selectedIndex) {
      case 0: // Rating
        sorted.sort((a, b) => b.discount - a.discount);
        break;
      case 1: // Discount
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case 2: // Price
        sorted.sort((a, b) => a.price - b.price);
        break;
      default:
        sorted = [...products];
    }

    setSortedProducts(sorted);
    setSortBy(selectedIndex);
  };

  const renderProduct = ({ item }) => (
    <View style={styles.productContainer}>
      <TouchableOpacity>
        <View style={{ flexDirection: "row" }}>
          <Image source={{ uri: item.thumbnail }} style={styles.imagestyle} />
          <View style={styles.subview}>
            <Text style={styles.productName}>{item.title}</Text>
            <Text style={styles.productcategory}>{item.category}</Text>
            <Text style={styles.Rating}>({item.rating})* </Text>
            <View>
            <Text style={styles.Dpercent}>
                save {item.discountPercentage}%
              </Text>
              <Text style={{ fontSize: 30 }}>₹ {item.price}</Text>
              
            </View>

            {/* <Text style={{fontSize:12,color: '#67DD58'}}>Rating Component</Text> */}

            {/* <Text style={{fontSize:26}}>{item.stock}</Text> */}

            <Text style={styles.dText}>{item.description}</Text>
            {item.stock < 50 && (
              <Text style={styles.lowText}>Hurry! Only a few items left</Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.page}>Search Results</Text>

      <ButtonGroup
        onPress={sortProducts}
        selectedIndex={sortBy}
        buttons={["Rating", "Discount", "Price"]}
        containerStyle={styles.buttonGroupContainer}
        buttonContainerStyle={styles.buttonContainerStyle}
        selectedButtonStyle={styles.selectedButtonStyle}
        selectedTextStyle={styles.selectedTextStyle}
      />

      {sortedProducts.length > 0 ? (
        <FlatList
          data={sortedProducts}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.productList}
        />
      ) : (
        <Text style={styles.emptyText}>No products available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 40,
  },
  page: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  imagestyle: {
    width: 100,
    resizeMode: "cover",
  },
  dText: {
    fontSize: 14,
    marginRight: 74,
  },
  Rating: {
    fontSize: 16,
    color: Colors.primary100,
  },
  Dpercent: {
    fontSize: 18,
    color: Colors.primary800,
    fontWeight: '500'
  },
  subview: {
    flexDirection: "column",
    marginLeft: 10,
    marginRight: 20,
  },
  buttonGroupContainer: {
    marginBottom: 16,
  },
  buttonContainerStyle: {
    backgroundColor:Colors.primary300,
  },
  selectedButtonStyle: {
    backgroundColor: Colors.primary200,
  },
  selectedTextStyle: {
    color: Colors.primary400,
  },
  productList: {
    paddingBottom: 16,
  },
  productContainer: {
    marginBottom: 16,
    padding: 12,
    borderRadius: 6,
    backgroundColor: Colors.primary500,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 62,
  },
  productcategory:{
    fontSize: 14,
  },
  lowText: {
    marginTop: 8,
    color: Colors.primary600,
    fontStyle: "italic",
  },
  emptyText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
  },
});

export default ProductListingPage;
