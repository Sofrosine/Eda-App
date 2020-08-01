import React from 'react';
import {StyleSheet, Text, View, SafeAreaView, ScrollView} from 'react-native';
import {Navbar, Gap, CardTask} from '../../components';
import {colors, fonts} from '../../utils';

const Home = () => {
  return (
    <SafeAreaView style={styles.pages}>
      <Navbar title="Home" />
      <View style={styles.content}>
        <ScrollView contentContainerStyle={styles.contentScroll}>
          <Text style={styles.h6Black}>Active Order</Text>
          <Gap height={16} />
          <CardTask />
          <Gap height={16} />
          <Text style={styles.h6Black}>History</Text>
          <Gap height={16} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
  },
  contentScroll: {
    paddingHorizontal: 22,
    paddingTop: 22,
  },
  h6Black: {
    fontSize: 18,
    lineHeight: 25,
    fontFamily: fonts.primary[600],
    color: colors.text.black,
  },
});
