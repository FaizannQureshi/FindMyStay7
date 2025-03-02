import React, { useState, useEffect } from "react";
import { ScrollView, TouchableOpacity, Dimensions } from "react-native";
import Carousel from "react-native-reanimated-carousel";
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

const { width: viewportWidth } = Dimensions.get("window");

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
                                screen: "index",
                                params: { property },
                            })
                        }
                    >
                        <Card>
                            <Carousel
                                width={200} // Updated to match the card width
                                height={150} // Adjust height as needed
                                data={property.images}
                                renderItem={({ item }) => (
                                    <CardImage
                                        source={{ uri: item }}
                                        style={{ width: '100%', height: '100%' }}
                                        resizeMode="cover" // Ensures the image covers the area properly
                                    />
                                )}
                                autoPlay
                                loop
                                pagingEnabled
                                style={{ borderRadius: 8 }}
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
