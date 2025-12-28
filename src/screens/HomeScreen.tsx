import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { fetchRestaurants } from '../api/restaurants';
import { useCartStore } from '../store/cartStore';

const images: Record<string, any> = {
  'Burger Palace': require('../assets/burger.png'),
  'Pizza Hub': require('../assets/pizza.png'),
  'South Indian Meals': require('../assets/south.png'),
  'Chinese Corner': require('../assets/chinese.png'),
};

export default function HomeScreen({ navigation }: any) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['restaurants'],
    queryFn: fetchRestaurants,
  });

  const { items, totalPrice } = useCartStore();

  const totalItems = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  if (isLoading) return <Text style={styles.center}>Loading...</Text>;
  if (isError) return <Text style={styles.center}>Failed to load</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🍔 Restaurants</Text>

      {/* RESTAURANT LIST */}
      <FlatList
        contentContainerStyle={{ paddingBottom: 120 }}
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate('Restaurant', { restaurant: item })
            }
          >
            <Image
              source={images[item.name]}
              style={styles.image}
            />

            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.desc}>{item.description}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* CART BAR (BOTTOM) */}
      {totalItems > 0 && (
        <TouchableOpacity
          style={styles.cartBar}
          onPress={() => navigation.navigate('Cart')}
        >
          <Text style={styles.cartText}>
            🛒 {totalItems} items | ₹ {totalPrice()}
          </Text>
          <Text style={styles.viewCart}>View Cart →</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  center: {
    textAlign: 'center',
    marginTop: 60,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },

  card: {
    backgroundColor: '#f5f5f5',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 140,
  },
  info: {
    padding: 14,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
  },
  desc: {
    color: '#666',
    marginTop: 4,
  },

  /* CART BAR */
  cartBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ff5a5f',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cartText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  viewCart: {
    color: '#fff',
    fontWeight: '600',
  },
});
