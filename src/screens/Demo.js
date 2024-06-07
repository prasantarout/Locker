const setRole = async value => {
  try {
    await AsyncStorage.setItem('subsubCategoryId', JSON.stringify(value));
    console.log();
  } catch (error) {
    console.error('Error setting subsubCategoryId:', error);
  }
};

const getSubsubCategoryId = async () => {
  try {
    const value = await AsyncStorage.getItem('subsubCategoryId');
    if (value !== null) {
      console.log('subsubCategoryId11::::::::::', value);
      return JSON.parse(value);
    }
  } catch (error) {
    console.error('Error getting subsubCategoryId:', error);
  }
};

const clearSubsubCategoryId = async () => {
  try {
    await AsyncStorage.removeItem('subsubCategoryId');
  } catch (error) {
    console.error('Error clearing subsubCategoryId:', error);
  }
};
