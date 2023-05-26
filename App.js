import React from 'react';
import { View } from 'react-native';
import ProductListingPage from './src/components/product';

const App = () => {
  return (
    <View style={{flex: 1}}>
      <ProductListingPage />
    </View>
  );
};

export default App;
