import {StyleSheet, Text, View} from 'react-native';

interface Props {
  reach: number;
  target: number;
}
export const ProgressBar = ({reach, target}: Props) => {
  // Calculate the percentage progress
  const progressPercentage = Math.min((reach / target) * 100, 100);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Progress: {`${reach} / ${target}`}</Text>
      <View style={styles.progressBar}>
        <View style={[styles.progress, {width: `${progressPercentage}%`}]} />
      </View>
      <Text style={styles.percentage}>{`${progressPercentage.toFixed(
        0,
      )}%`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  progressBar: {
    height: 20,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    backgroundColor: '#76c7c0',
    borderRadius: 10,
  },
  percentage: {
    marginTop: 10,
    fontSize: 14,
    color: '#333',
  },
});
