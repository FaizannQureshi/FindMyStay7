import React, { useEffect, useState } from "react";
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
} from "../styles/HomeScreenStyles"; // ✅ Ensure correct import path

import { fetchProperties } from "../firebase/propertyService";
import haversine from "haversine-distance";

const PropertyCard = ({ navigation, userLocation }) => {
    const [popularProperties, setPopularProperties] = useState([]);
    const [nearbyProperties, setNearbyProperties] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await fetchProperties();

                // ✅ Sort by Rating for "Popular Hostels"
                const sortedByRating = [...data].sort((a, b) => b.rating - a.rating);
                setPopularProperties(sortedByRating);

                // 📍 Sort by Distance for "Hostels Near You"
                if (userLocation) {
                    const sortedByDistance = data.map((property) => {
                        const distance = haversine(userLocation, {
                            latitude: property.latitude,
                            longitude: property.longitude,
                        });
                        return { ...property, distance };
                    });

                    sortedByDistance.sort((a, b) => a.distance - b.distance);
                    setNearbyProperties(sortedByDistance);
                }
            } catch (error) {
                console.error("Error fetching properties:", error);
            }
        };

        getData();
    }, [userLocation]);

    const renderSection = (title, properties) => (
        <Section>
            <SectionHeader>
                <SectionHeaderText>{title}</SectionHeaderText>
                <SeeAll
                    onPress={() => navigation.navigate("SeeAllScreen", { title, properties })}
                >
                    See all
                </SeeAll>
            </SectionHeader>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {properties.map((property) => (
                    <TouchableOpacity
                        key={property.id}
                        onPress={() => navigation.navigate("PropertyDetailUser", { property })}
                    >
                        <Card>
                            <CardImage
                                source={{ uri: property.propertyImages?.[0] || "https://via.placeholder.com/200x150" }}
                                resizeMode="cover"
                            />
                            <CardContent>
                                <CardTitle>{property.propertyTitle}</CardTitle>
                                <CardSubtitle>{property.location}</CardSubtitle>
                                <CardFooter>
                                    <CardPrice>Starting from {property.startingPrice} per month</CardPrice>
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

export default PropertyCard; // ✅ Ensure correct export
