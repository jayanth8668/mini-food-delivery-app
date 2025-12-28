import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useCartStore } from '../store/cartStore';

export default function CartScreen() {
  const {
    items,
    increase,
    decrease,
    removeItem,
    totalPrice,
  } = useCartStore();

  if (items.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.empty}>🛒 Cart is empty</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Cart</Text>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View>
              <Text style={styles.name}>{item.name}</Text>
              <Text>₹ {item.price}</Text>
            </View>

            <View style={styles.actions}>
              <TouchableOpacity
                style={styles.qtyBtn}
                onPress={() => decrease(item.id)}
              >
                <Text>-</Text>
              </TouchableOpacity>

              <Text style={styles.qty}>{item.quantity}</Text>

              <TouchableOpacity
                style={styles.qtyBtn}
                onPress={() => increase(item.id)}
              >
                <Text>+</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => removeItem(item.id)}
              >
                <Text style={styles.remove}>❌</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <Text style={styles.total}>Total: ₹ {totalPrice()}</Text>
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  empty: {
    fontSize: 16,
    color: '#666',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#f3f3f3',
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  qtyBtn: {
    backgroundColor: '#ddd',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  qty: {
    fontWeight: 'bold',
    minWidth: 20,
    textAlign: 'center',
  },
  remove: {
    marginLeft: 6,
    fontSize: 16,
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'right',
  },
});
