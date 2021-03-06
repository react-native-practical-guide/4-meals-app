import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import MealItem from '../components/MealItem';

// Is getting used in CategoryMealsScreen and in FavoritesScreen
const MealList = (props) => {
	// You can use useSelector only in the root comp. Not in nested funcs.
	const favoriteMeals = useSelector((state) => state.meals.favoriteMeals);

	// console.log(favoriteMeals);
	
    const renderMealItem = (itemData) => {
		// For changing the favorite icon.
		// When we get a single item, we check if it's a favorite
		const isFavorite = favoriteMeals.some(meal => meal.id === itemData.item.id);
		// console.log(isFavorite);
		
		// DON'T FORGET RETURN
		return (
			<MealItem
				title={itemData.item.title}
				complexity={itemData.item.complexity}
				affordability={itemData.item.affordability}
				duration={itemData.item.duration}
				image={itemData.item.imageUrl}
				onSelectMeal={() => {
                    //  We have a `navigation` prop because we forwarded it in CategoryMealsScreen.
					props.navigation.navigate({ routeName: 'MealDetail', 
					params: { 
						mealId: itemData.item.id,
						mealTitle: itemData.item.title,
						isFav: isFavorite
					} });
				}}
			/>
		);
    };
	return (
		<View style={styles.list}>
			<FlatList
				data={props.listData}
				keyExtractor={(item, index) => item.id} // Modern versions of RN automatically detect the key. Thus, keyExtractor is not needed!
				renderItem={renderMealItem}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	list: {
		flex: 1,
		justifyContent: 'center',
        alignItems: 'center',
        padding: 10
	}
});

export default MealList;
