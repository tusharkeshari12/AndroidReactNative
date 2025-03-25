import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Card, Button, Icon } from '@rneui/themed';

const orders = [
  {
    id: '1',
    date: '2024-03-20',
    items: ['Gold Chain', 'Diamond Ring'],
    status: 'Delivered',
    total: '$1,299.99',
  },
  {
    id: '2',
    date: '2024-03-15',
    items: ['Silver Bracelet'],
    status: 'In Transit',
    total: '$299.99',
  },
  {
    id: '3',
    date: '2024-03-10',
    items: ['Pearl Necklace', 'Earrings'],
    status: 'Processing',
    total: '$599.99',
  },
];

export default function OrdersScreen() {
  return (
    <ScrollView style={styles.container}>
      {orders.map((order) => (
        <Card key={order.id} containerStyle={styles.card}>
          <View style={styles.orderHeader}>
            <Text style={styles.orderId}>Order #{order.id}</Text>
            <Text style={styles.date}>{order.date}</Text>
          </View>
          
          <Card.Divider />
          
          <View style={styles.items}>
            {order.items.map((item, index) => (
              <Text key={index} style={styles.item}>• {item}</Text>
            ))}
          </View>
          
          <View style={styles.orderFooter}>
            <View>
              <Text style={styles.total}>Total: {order.total}</Text>
              <Text style={[
                styles.status,
                { color: order.status === 'Delivered' ? 'green' : 
                         order.status === 'In Transit' ? 'orange' : 'blue' }
              ]}>
                {order.status}
              </Text>
            </View>
            <Button
              type="outline"
              size="sm"
              title="Details"
              icon={<Icon name="chevron-right" size={15} color="#2089dc" />}
              iconRight
            />
          </View>
        </Card>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  card: {
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 5,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  orderId: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  date: {
    color: '#666',
  },
  items: {
    marginVertical: 10,
  },
  item: {
    fontSize: 14,
    marginVertical: 2,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  total: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  status: {
    marginTop: 5,
    fontWeight: '500',
  },
});
