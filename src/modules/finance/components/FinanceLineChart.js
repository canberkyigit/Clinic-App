import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Svg, { Polyline, G, Line, Text as SvgText } from 'react-native-svg';

const dummyData = {
  week: [1200, 1500, 1800, 1700, 2100, 2000, 2300],
  month: [1200, 1500, 1800, 1700, 2100, 2000, 2300, 2500, 2200, 2100, 2400, 2600, 2700, 2500, 2300, 2200, 2100, 2000, 1900, 1800, 1700, 1600, 1500, 1400, 1300, 1200, 1100, 1000, 900, 800],
  year: [12000, 15000, 18000, 17000, 21000, 20000, 23000, 25000, 22000, 21000, 24000, 26000],
};
const labels = {
  week: ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'],
  month: Array.from({length: 30}, (_, i) => {
    const day = i + 1;
    return [1, 5, 10, 15, 20, 25, 30].includes(day) ? `${day}` : '';
  }),
  year: ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'],
};

export default function FinanceLineChart() {
  const [filter, setFilter] = useState('month');
  const data = dummyData[filter];
  const chartLabels = labels[filter];
  const maxY = Math.max(...data) * 1.1;
  const minY = Math.min(...data) * 0.9;
  const chartHeight = 120;
  const chartWidth = 320;
  const stepX = chartWidth / (data.length - 1);
  const stepY = chartHeight / (maxY - minY);
  const points = data.map((v, i) => `${i * stepX},${chartHeight - (v - minY) * stepY}`).join(' ');
  const trend = ((data[data.length-1] - data[0]) / data[0] * 100).toFixed(1);
  const trendUp = trend >= 0;

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Aylık Gelir Dağılımı</Text>
        <View style={styles.filterRow}>
          {['week','month','year'].map(f => (
            <TouchableOpacity key={f} style={[styles.filterBtn, filter===f && styles.filterBtnActive]} onPress={()=>setFilter(f)}>
              <Text style={[styles.filterBtnText, filter===f && styles.filterBtnTextActive]}>{f==='week'?'Hafta':f==='month'?'Ay':'Yıl'}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={styles.chartBox}>
        <Svg width={chartWidth} height={chartHeight + 20}>
          {/* Grid lines */}
          {[0,0.25,0.5,0.75,1].map((p,i) => (
            <Line key={i} x1={0} y1={chartHeight*p} x2={chartWidth} y2={chartHeight*p} stroke="#232a23" strokeWidth={1} />
          ))}
          {/* Line chart */}
          <Polyline
            points={points}
            fill="none"
            stroke="#6fff8a"
            strokeWidth={3}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          {/* X axis labels (only for month filter) */}
          {filter === 'month' && [1, 5, 10, 15, 20, 25, 30].map((day, idx) => (
            <SvgText
              key={day}
              x={(day-1) * stepX}
              y={chartHeight + 14}
              fontSize="11"
              fill="#b0b0b0"
              textAnchor="middle"
            >
              {day}
            </SvgText>
          ))}
          {/* X axis labels for week/year */}
          {filter !== 'month' && chartLabels.map((l, i) => (
            <SvgText
              key={i}
              x={i * stepX}
              y={chartHeight + 14}
              fontSize="11"
              fill="#b0b0b0"
              textAnchor="middle"
            >
              {l}
            </SvgText>
          ))}
        </Svg>
        <View style={styles.trendBox}>
          <Text style={[styles.trendText, {color: trendUp ? '#6fff8a' : '#ff4d4f'}]}>
            {trendUp ? '▲' : '▼'} %{Math.abs(trend)}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#232a23',
    borderRadius: 18,
    marginHorizontal: 12,
    marginBottom: 18,
    paddingVertical: 18,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    alignItems: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 8,
    paddingHorizontal: 6,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  filterRow: {
    flexDirection: 'row',
    gap: 4,
  },
  filterBtn: {
    backgroundColor: '#181f1a',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginLeft: 4,
  },
  filterBtnActive: {
    backgroundColor: '#6fff8a',
  },
  filterBtnText: {
    color: '#b0b0b0',
    fontSize: 13,
    fontWeight: '500',
  },
  filterBtnTextActive: {
    color: '#16281e',
    fontWeight: '700',
  },
  chartBox: {
    marginTop: 8,
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  trendBox: {
    position: 'absolute',
    top: 8,
    right: 12,
    backgroundColor: '#181f1a',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  trendText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
}); 