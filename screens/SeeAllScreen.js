import React from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "react-native-elements";

const SeeAllScreen = ({ route }) => {
    const navigation = useNavigation();

    if (!route || !route.params) {
        return <Text style={{ textAlign: "center", marginTop: 20 }}>Error: No Data Provided</Text>;
    }

    const { title, properties } = route.params;

    return (
        <View style={{ flex: 1, backgroundColor: "#f6ece5", padding: 16, paddingTop: 60, }}>
            {/* Header with Back Button and Title */}
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 25, marginTop: 40}}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: "absolute", left: 0 }}>
                    <Icon name="arrow-back" size={24} color="#000000" />
                </TouchableOpacity>
                <Text style={{ flex: 1, textAlign: "center", fontSize: 22, fontWeight: "bold", color: "#000000" }}>
                    {title}
                </Text>
            </View>

            {/* Property List */}
            <FlatList
                data={properties}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate("PropertyDetailUser", { property: item })}
                        style={{
                            backgroundColor: "#e8e1dc",
                            padding: 16,
                            margin: 12,
                            borderRadius: 8,
                            shadowColor: "#000",
                            shadowOpacity: 0.1,
                            shadowRadius: 5,
                            elevation: 3
                        }}
                    >
                        <Image
                            source={{ uri: item.propertyImages?.[0] || "https://via.placeholder.com/200x150" }}
                            style={{ width: "100%", height: 150, borderRadius: 8 }}
                            resizeMode="cover"
                        />
                        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#00000", marginTop: 8 }}>
                            {item.propertyTitle}
                        </Text>
                        <Text style={{ fontSize: 14, color: "#5d4940" }}>{item.location}</Text>
                        <Text style={{ fontWeight: "bold", color: "#000000", marginTop: 4 }}>
                            Starting from {item.startingPrice} per month
                        </Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

export default SeeAllScreen;
