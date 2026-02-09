import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';

const COLORS = ['#6fff8a', '#ff4d4f', '#ffd700', '#4faaff', '#b36fff', '#ffb36f'];

function getPieSegments(data) {
  const total = data.reduce((sum, d) => sum + d.amount, 0);
  let startAngle = 0;
  return data.map((d, i) => {
    const value = d.amount / total;
    const endAngle = startAngle + value * 2 * Math.PI;
    const x1 = 60 + 50 * Math.cos(startAngle - Math.PI/2);
    const y1 = 60 + 50 * Math.sin(startAngle - Math.PI/2);
    const x2 = 60 + 50 * Math.cos(endAngle - Math.PI/2);
    const y2 = 60 + 50 * Math.sin(endAngle - Math.PI/2);
    const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;
    const path = `M60,60 L${x1},${y1} A50,50 0 ${largeArc} 1 ${x2},${y2} Z`;
    startAngle = endAngle;
    return { path, color: COLORS[i % COLORS.length], label: d.label, amount: d.amount };
  });
}

export default function ExpensePieChart({ expenses }) {
  // expenses: [{ label, amount }]
  const segments = getPieSegments(expenses);
  const sorted = [...expenses].sort((a,b)=>b.amount-a.amount);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gider Dağılımı</Text>
      <View style={styles.row}>
        <Svg width={120} height={120} style={styles.pieSvg}>
          <G>
            {segments.map((seg, i) => (
              <Path key={i} d={seg.path} fill={seg.color} />
            ))}
          </G>
        </Svg>
        <View style={styles.legendBox}>
          {segments.map((seg, i) => (
            <View key={i} style={styles.legendRow}>
              <View style={[styles.legendDot, {backgroundColor: seg.color}]} />
              <Text style={styles.legendLabel}>{seg.label}</Text>
              <Text style={styles.legendAmount}>₺{seg.amount.toLocaleString('tr-TR')}</Text>
            </View>
          ))}
        </View>
      </View>
      <Text style={styles.subtitle}>En Büyük Giderler</Text>
      {sorted.slice(0,3).map((item,i)=>(
        <View key={i} style={styles.topExpenseRow}>
          <Text style={styles.topExpenseLabel}>{item.label}</Text>
          <Text style={styles.topExpenseAmount}>₺{item.amount.toLocaleString('tr-TR')}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#232a23',
    borderRadius: 18,
    marginHorizontal: 12,
    marginBottom: 18,
    paddingVertical: 14,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
    marginLeft: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  pieSvg: {
    marginRight: 12,
  },
  legendBox: {
    flex: 1,
    gap: 4,
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
    gap: 6,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 4,
  },
  legendLabel: {
    color: '#b0b0b0',
    fontSize: 13,
    flex: 1,
  },
  legendAmount: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#b0b0b0',
    fontSize: 13,
    fontWeight: '700',
    marginTop: 8,
    marginBottom: 2,
    marginLeft: 4,
  },
  topExpenseRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
    paddingHorizontal: 4,
  },
  topExpenseLabel: {
    color: '#fff',
    fontSize: 14,
  },
  topExpenseAmount: {
    color: '#ff4d4f',
    fontSize: 14,
    fontWeight: 'bold',
  },
}); 