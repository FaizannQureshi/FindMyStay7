import React, { useState, useEffect } from "react";
import { ScrollView, TouchableOpacity, Image } from "react-native";
import { Icon } from "react-native-elements";
import {
    Section,
    SectionHeader,
    SectionHeaderText,
    SeeAll,
    Card,
    CardImage,
    CardContent,
    CardTitle,
    CardSubtitle,
    CardFooter,
    CardPrice,
} from "../styles/HomeScreenStyles"; // Adjust path as needed

import { fetchProperties } from "../firebase/propertyService";

const PropertyCard = ({ navigation }) => {
    const [popularProperties, setPopularProperties] = useState([]);
    const [nearbyProperties, setNearbyProperties] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const data = await fetchProperties();

            // ✅ Sort by rating for Popular Hostels
            const sortedByRating = [...data].sort((a, b) => b.rating - a.rating);
            setPopularProperties(sortedByRating);

            // 📍 Sort by location for Hostels Near You
            const sortedByLocation = [...data].sort((a, b) =>
                a.location.localeCompare(b.location)
            );
            setNearbyProperties(sortedByLocation);
        };
        getData();
    }, []);

    const renderSection = (title, properties) => (
        <Section>
            <SectionHeader>
                <SectionHeaderText>{title}</SectionHeaderText>
                <SeeAll>See all</SeeAll>
            </SectionHeader>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {properties.map((property) => (
                    <TouchableOpacity
                        key={property.id}
                        onPress={() =>
                            navigation.navigate("PropertyDetailUser", {
                                property: property, // Pass the complete property object
                            })
                        }
                    >
                        <Card>
                            {/* Static image - just display the first image from the array */}
                            <CardImage
                                source={{ uri: property.images && property.images.length > 0 ? property.images[0] : 'https://via.placeholder.com/200x150' }}
                                style={{ width: 200, height: 150 }}
                                resizeMode="cover"
                            />

                            <CardContent>
                                <CardTitle>{property.title}</CardTitle>
                                <CardSubtitle>{property.location}</CardSubtitle>
                                <CardFooter>
                                    <CardPrice>
                                        Starting from {property.startingPrice} per month
                                    </CardPrice>
                                    <Icon name="star" size={16} color="#FFD700" />
                                    <CardSubtitle>{property.rating}</CardSubtitle>
                                </CardFooter>
                            </CardContent>
                        </Card>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </Section>
    );

    return (
        <>
            {renderSection("Hostels Near You", nearbyProperties)}
            {renderSection("Popular Hostels", popularProperties)}
        </>
    );
};

export default PropertyCard;