import { PostData } from "@/utils/postData";
import { useState } from "react";
import {
  Pressable,
  StyleSheet,
  TextInput,
  Text,
  View,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

type PostFormProps = {
  addNewPost: (post: PostData) => void;
  closeModal: () => void;
};

export default function PostForm({ addNewPost, closeModal }: PostFormProps) {
  const [titleText, setTitleText] = useState("");
  const [descriptionText, setDescriptionText] = useState("");
  const [hashtagText, setHashtagText] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  return (
    <View style={styles.mainContainer}>
      <View style={styles.contentContainer}>
        <Pressable onPress={() => pickImage()}>
          <Text>Last opp bilde</Text>
        </Pressable>
        <View
          style={{
            width: "100%",
            height: 300,
            justifyContent: "center",
            alignContent: "center",
            overflow: "hidden",
          }}
        >
          {image && (
            <Image
            style={{ resizeMode: "cover", width: "100%", height: 300 }}
            source={{ uri: image }}
          />
          )}
        </View>
        <View style={styles.textFieldContainer}>
          <Text style={styles.text}>Tittel</Text>
          <TextInput
            onChangeText={setTitleText}
            value={titleText}
            style={styles.textfield}
            placeholder="Skriv inn tittel"
          />
        </View>
        <View style={styles.textFieldContainer}>
          <Text style={styles.text}>Beskrivelse</Text>
          <TextInput
            multiline
            numberOfLines={3}
            onChangeText={setDescriptionText}
            value={descriptionText}
            style={[styles.textfield, { height: 84 }]}
            placeholder="Skriv inn beskrivelse"
          />
        </View>
        <View style={styles.textFieldContainer}>
          <Text style={styles.text}>Hashtags</Text>
          <TextInput
            onChangeText={setHashtagText}
            value={hashtagText}
            style={styles.textfield}
            placeholder="#kultur #natur #mat"
          />
        </View>
        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.primaryButton}
            onPress={() => {
              addNewPost({
                title: titleText,
                description: descriptionText,
                // midler for å generere en ikke fullt så unik id, hvis to poster har samme tittel vil det dukke opp en warning om children with the same key
                // Dette løser seg selv når vi kan få unike IDer fra en backend
                id: `postName-${titleText}`,
                hashtags: hashtagText,
                author: "Kul student",
                isLiked: false,
              });
              setTitleText("");
              setDescriptionText("");
              setHashtagText("");
            }}
          >
            <Text style={{ color: "white" }}>Legg til post</Text>
          </Pressable>
          <Pressable
            style={styles.secondaryButton}
            onPress={() => closeModal()}
          >
            <Text
              style={{
                color: "#412E25",
              }}
            >
              Avbryt
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    width: "100%",
    flexDirection: "column",
    paddingHorizontal: 20,
  },
  textFieldContainer: {
    paddingTop: 8,
  },
  text: {},
  textfield: {
    borderWidth: 1,
    padding: 10,
    marginTop: 2,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 32,
  },
  primaryButton: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 4,
    backgroundColor: "#0096C7",
  },
  secondaryButton: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "gray",
  },
});
