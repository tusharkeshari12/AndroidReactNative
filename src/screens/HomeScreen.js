import React, { useState, useEffect } from 'react';
import { ScrollView, RefreshControl, StyleSheet, View } from 'react-native';
import { Text } from '@rneui/themed';
import axios from 'axios';
import MetalCard from '../components/MetalCard';

const HomeScreen = () => {
  const [metalPrices, setMetalPrices] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const fetchPrices = async () => {
    try {
      // Note: Replace with your actual API key from metals-api.com
      const response = await axios.get(
        'https://api.metalpriceapi.com/v1/latest?api_key=YOUR_API_KEY&base=USD&currencies=XAU,XAG,PT,PD'
      );
      
      setMetalPrices({
        gold: {
          price: (1 / response.data.rates.XAU).toFixed(2),
          change: ((response.data.rates.XAU - response.data.previous.XAU) / response.data.previous.XAU * 100).toFixed(2)
        },
        silver: {
          price: (1 / response.data.rates.XAG).toFixed(2),
          change: ((response.data.rates.XAG - response.data.previous.XAG) / response.data.previous.XAG * 100).toFixed(2)
        },
        platinum: {
          price: (1 / response.data.rates.PT).toFixed(2),
          change: ((response.data.rates.PT - response.data.previous.PT) / response.data.previous.PT * 100).toFixed(2)
        },
        palladium: {
          price: (1 / response.data.rates.PD).toFixed(2),
          change: ((response.data.rates.PD - response.data.previous.PD) / response.data.previous.PD * 100).toFixed(2)
        }
      });
      setError(null);
    } catch (err) {
      setError('Failed to fetch prices. Please try again later.');
      console.error(err);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchPrices();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, []);

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Text style={styles.header}>Live Metal Prices</Text>
      {metalPrices && (
        <>
          <MetalCard 
            title="Gold" 
            price={metalPrices.gold.price} 
            change={metalPrices.gold.change} 
          />
          <MetalCard 
            title="Silver" 
            price={metalPrices.silver.price} 
            change={metalPrices.silver.change} 
          />
          <MetalCard 
            title="Platinum" 
            price={metalPrices.platinum.price} 
            change={metalPrices.platinum.change} 
          />
          <MetalCard 
            title="Palladium" 
            price={metalPrices.palladium.price} 
            change={metalPrices.palladium.change} 
          />
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default HomeScreen;
