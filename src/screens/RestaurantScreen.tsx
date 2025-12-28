import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useCartStore } from '../store/cartStore';

export default function RestaurantScreen({ route, navigation }: any) {
  const { restaurant } = route.params;
  const addItem = useCartStore((s) => s.addItem);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{restaurant.name}</Text>

      <FlatList
        data={restaurant.menu}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View>
              <Text style={styles.name}>{item.name}</Text>
              <Text>₹ {item.price}</Text>
            </View>

            <TouchableOpacity
              style={styles.addBtn}
              onPress={() =>
                addItem({
                  id: item.id,
                  name: item.name,
                  price: item.price,
                })
              }
            >
              <Text style={styles.addText}>Add</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.cartBtn}
        onPress={() => navigation.navigate('Cart')}
      >
        <Text style={{ color: '#fff' }}>Go to Cart</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  card: {
    backgroundColor: '#f2f2f2',
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: { fontSize: 16, fontWeight: '600' },
  addBtn: {
    backgroundColor: '#000',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 6,
  },
  addText: { color: '#fff' },
  cartBtn: {
    backgroundColor: '#ff5a5f',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
});
