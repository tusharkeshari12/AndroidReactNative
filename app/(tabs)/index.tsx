import React, { useState, useEffect } from 'react';
import { ScrollView, RefreshControl, StyleSheet, View, StatusBar } from 'react-native';
import { Text, ListItem, Icon } from '@rneui/themed';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface MetalPrice {
  priceUSD: string;
  priceINR: string;
  change: string;
  icon: string;
}

interface MetalPrices {
  gold: MetalPrice;
  silver: MetalPrice;
  platinum: MetalPrice;
  palladium: MetalPrice;
}

const DEFAULT_METAL_PRICES: MetalPrices = {
  gold: {
    priceUSD: '2021.45',
    priceINR: '168023.31',
    change: '+0.25',
    icon: 'gold'
  },
  silver: {
    priceUSD: '23.85',
    priceINR: '1982.27',
    change: '+0.15',
    icon: 'silver'
  },
  platinum: {
    priceUSD: '915.00',
    priceINR: '76054.80',
    change: '-0.10',
    icon: 'platinum'
  },
  palladium: {
    priceUSD: '1045.50',
    priceINR: '86942.60',
    change: '-0.20',
    icon: 'palette'
  }
};

interface MetalPriceProps {
  title: string;
  priceUSD: string;
  priceINR: string;
  change: string;
  icon: string;
}

const MetalPrice: React.FC<MetalPriceProps> = ({ title, priceUSD, priceINR, change, icon }) => {
  const isPositive = parseFloat(change) >= 0;

  return (
    <ListItem containerStyle={styles.listItem}>
      <Icon
        name={icon}
        type="material-community"
        color="#FFD700"
        size={40}
      />
      <ListItem.Content>
        <ListItem.Title style={styles.title}>{title}</ListItem.Title>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>${priceUSD}</Text>
          <Text style={styles.price}>₹{priceINR}</Text>
        </View>
      </ListItem.Content>
      <Text style={[
        styles.change,
        { color: isPositive ? '#4CAF50' : '#F44336' }
      ]}>
        {change}%
      </Text>
    </ListItem>
  );
};

export default function HomeScreen() {
  const [metalPrices, setMetalPrices] = useState<MetalPrices>(DEFAULT_METAL_PRICES);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isLiveData, setIsLiveData] = useState<boolean>(true);

  useEffect(() => {
    loadCachedData();
  }, []);

  const loadCachedData = async (): Promise<void> => {
    try {
      const cachedData = await AsyncStorage.getItem('metalPrices');
      const cachedTimestamp = await AsyncStorage.getItem('lastUpdated');

      if (cachedData && cachedTimestamp) {
        setMetalPrices(JSON.parse(cachedData));
        setLastUpdated(cachedTimestamp);
        setIsLiveData(false);
      }
    } catch (err) {
      console.log('Error loading cached data:', err);
    }
  };

  const saveToCache = async (prices: MetalPrices, timestamp: string): Promise<void> => {
    try {
      await AsyncStorage.setItem('metalPrices', JSON.stringify(prices));
      await AsyncStorage.setItem('lastUpdated', timestamp);
    } catch (err) {
      console.log('Error saving to cache:', err);
    }
  };

  const fetchPrices = async (): Promise<void> => {
    try {
      const METALS_URL = 'https://www.metalsdaily.com/__dta/pd.ashx';
      const PAYLOAD = 'XAUUSD|XAUGBP|XAUEUR|XAGUSD|XPTUSD|XPDUSD|XAUAUD|XAUCAD|XAUCHF|XAUJPY1G|XAUAED|XAUAED1G|XAUCNY|XAUCNY1G|XAUINR|XAUINR10|XAUZAR|XAURUB|XAUXAGUSD|XPTXPDUSD|XAGGBP|XAGEUR|USDGBP|GBPUSD|USDEUR|EURUSD|USDCHF|CHFUSD|USDJPY|USDRUB|USDHKD|USDMXN|USDNOK|USDNZD|USDPLN|USDSEK|USDSGD|USDTRY|USDZAR|BTCUSD';
      const formBody = new URLSearchParams();
      formBody.append('com', PAYLOAD);


      const response = await axios.post(METALS_URL, formBody, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        timeout: 10000,
      });

      console.log('Response received:', response);
      console.log('Status:', response.status);

      if (response.status !== 200) {
        throw new Error(`Server returned status ${response.status}`);
      }

      if (response.data && response.data.contents) {
        const data = JSON.parse(response.data.contents);

        if (!data.XAUUSD?.bid || !data.XAGUSD?.bid || !data.XPTUSD?.bid || !data.XPDUSD?.bid) {
          throw new Error('Incomplete data received');
        }

        const prices: MetalPrices = {
          gold: {
            priceUSD: parseFloat(data.XAUUSD.bid).toFixed(2),
            priceINR: data.XAUINR ? parseFloat(data.XAUINR.bid).toFixed(2) : (parseFloat(data.XAUUSD.bid) * 83.12).toFixed(2),
            change: parseFloat(data.XAUUSD.chg || 0).toFixed(2),
            icon: 'gold'
          },
          silver: {
            priceUSD: parseFloat(data.XAGUSD.bid).toFixed(2),
            priceINR: data.XAGINR ? parseFloat(data.XAGINR.bid).toFixed(2) : (parseFloat(data.XAGUSD.bid) * 83.12).toFixed(2),
            change: parseFloat(data.XAGUSD.chg || 0).toFixed(2),
            icon: 'silver'
          },
          platinum: {
            priceUSD: parseFloat(data.XPTUSD.bid).toFixed(2),
            priceINR: (parseFloat(data.XPTUSD.bid) * 83.12).toFixed(2),
            change: parseFloat(data.XPTUSD.chg || 0).toFixed(2),
            icon: 'platinum'
          },
          palladium: {
            priceUSD: parseFloat(data.XPDUSD.bid).toFixed(2),
            priceINR: (parseFloat(data.XPDUSD.bid) * 83.12).toFixed(2),
            change: parseFloat(data.XPDUSD.chg || 0).toFixed(2),
            icon: 'palette'
          }
        };

        const timestamp = new Date().toLocaleTimeString();
        setMetalPrices(prices);
        setLastUpdated(timestamp);
        setIsLiveData(true);
        setError(null);

        await saveToCache(prices, timestamp);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      console.log('Error fetching prices:', err instanceof Error ? err.message : String(err));
      setIsLiveData(false);
      setError(`Unable to fetch live data: ${err instanceof Error ? err.message : String(err)}`);

      await loadCachedData();
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async (): Promise<void> => {
    setRefreshing(true);
    await fetchPrices();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchPrices();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1e1e1e" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Text h1 style={styles.header}>Live Metal Prices</Text>
        {!isLiveData && (
          <View style={styles.warningContainer}>
            <Icon
              name="warning"
              type="material"
              color="#FFA500"
              size={20}
            />
            <Text style={styles.warning}>Showing cached data</Text>
          </View>
        )}
        {lastUpdated && (
          <Text style={[styles.lastUpdated, !isLiveData && styles.lastUpdatedCached]}>
            Last Updated: {lastUpdated}
          </Text>
        )}
        {
          <View style={styles.listContainer}>
            {metalPrices && (
              <>
                <MetalPrice
                  title="Gold"
                  priceUSD={metalPrices.gold.priceUSD}
                  priceINR={metalPrices.gold.priceINR}
                  change={metalPrices.gold.change}
                  icon={metalPrices.gold.icon}
                />
                <MetalPrice
                  title="Silver"
                  priceUSD={metalPrices.silver.priceUSD}
                  priceINR={metalPrices.silver.priceINR}
                  change={metalPrices.silver.change}
                  icon={metalPrices.silver.icon}
                />
                <MetalPrice
                  title="Platinum"
                  priceUSD={metalPrices.platinum.priceUSD}
                  priceINR={metalPrices.platinum.priceINR}
                  change={metalPrices.platinum.change}
                  icon={metalPrices.platinum.icon}
                />
                <MetalPrice
                  title="Palladium"
                  priceUSD={metalPrices.palladium.priceUSD}
                  priceINR={metalPrices.palladium.priceINR}
                  change={metalPrices.palladium.change}
                  icon={metalPrices.palladium.icon}
                />
              </>
            )}

            {error && <View style={styles.errorContainer}>
              <Icon
                name="alert-circle-outline"
                type="material-community"
                color="#F44336"
                size={40}
              />
              <Text style={styles.error}>{error}</Text>
            </View>
            }
          </View>


          // )
        }
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginVertical: 20,
  },
  warningContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFA50033',
    paddingVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  warning: {
    color: '#FFA500',
    marginLeft: 8,
    fontSize: 14,
    fontWeight: 'bold',
  },
  lastUpdated: {
    color: '#888',
    textAlign: 'center',
    marginBottom: 20,
  },
  lastUpdatedCached: {
    color: '#FFA500',
  },
  listContainer: {
    paddingHorizontal: 16,
  },
  listItem: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    marginBottom: 12,
  },
  title: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  priceContainer: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 4,
  },
  price: {
    color: '#cccccc',
    fontSize: 16,
  },
  change: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorContainer: {
    alignItems: 'center',
    padding: 20,
  },
  error: {
    color: '#F44336',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16,
  }
});
