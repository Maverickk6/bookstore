import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import Book from "../utils/utils";
import BookCard from "../components/BookCard";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../App";
import { StackNavigationProp } from "@react-navigation/stack";
import SearchInput from "../components/SearchInput";

type detailsScreenProps = StackNavigationProp<RootStackParamList, "Details">;

const Homescreen = () => {
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [data, setData] = useState<Book | undefined>();

  const navigation = useNavigation<detailsScreenProps>();

  useEffect(() => {
    fetch("https://fudap-books-api.herokuapp.com/books/")
      .then((res) => res.json())
      .then(
        (result) => {
          setLoading(false);
          setData(result);
        },
        (error) => {
          setLoading(false);
          setError(error);
        }
      );
  });

  const getContent = () => {
    if (isLoading) {
      return (
        <View style={{ height: "100%", width: "100%" }}>
          <ActivityIndicator
            size="large"
            testId="loading"
            accessibilityLabel="App is loading books"
          />
        </View>
      );
    }
    if (error) {
      return <Text>{error}</Text>;
    }
    return (
      <FlatList
        data={data}
        keyExtractor={(books, index) => {
          return books.id;
        }}
        renderItem={({ item }) => {
          return (
            <Pressable
              onPress={() =>
                navigation.navigate("Details", {
                  id: item.id,
                  isbn: item.isbn,
                  title: item.title,
                  subtitle: item.subtitle,
                  author: item.author,
                  published: item.published,
                  publisher: item.publisher,
                  pages: item.pages,
                  description: item.description,
                  imgUrl: item.imgUrl,
                })
              }
            >
              <BookCard books={item} accessibilityLabel="books" />
            </Pressable>
          );ƒ
        }}
      />
    );
  };

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <SearchInput />
      <View className="mt-8">{getContent()}</View>
    </View>
  );
};

export default Homescreen;
