import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import ScreenWrapper from "../../../components/ScreenWrapper";
import { theme } from "../../../constants/theme";
import Header from "../../../components/Header";
import { wp, hp } from "../../../helpers/common";
import { Image } from "expo-image";
import { useAuth } from "../../../contexts/AuthContext";
import { getUserImageSrc } from "../../../services/imageService";
import Icon from "../../../assets/icons";
import { Dropdown } from "react-native-element-dropdown";
import Button from "../../../components/Button";
import { updateUser } from "../../../services/userService";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";

const EditProfile = () => {
    const { router } = useRouter;
    const { user: currentUser, setUserData } = useAuth();
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({
        studienvariante: "",
        nebenfach_gross: "",
        nebenfach_klein: "",
        avatar_url: null,
    });

    useEffect(() => {
        if (currentUser) {
            setUser({
                studienvariante: currentUser.studienvariante || "",
                nebenfach_gross: currentUser.nebenfach_gross || "",
                nebenfach_klein: currentUser.nebenfach_klein || "",
                avatar_url: currentUser.image || null,
            });
        }
    }, [currentUser]);

    const onPickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: "images",
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.7,
        });

        if (!result.canceled) {
            setUser({ ...user, avatar_url: result.assets[0] });
        }
    };

    const onSubmit = async () => {
        let userData = { ...user };
        //console.log("userData", userData);
        let { studienvariante, nebenfach_gross, nebenfach_klein, image } =
            userData;
        setLoading(true);

        const res = await updateUser(currentUser.id, userData);
        setLoading(false);

        if (res.success) {
            setUserData({ ...currentUser, ...userData });
            router.back();
        }
    };

    let imageSource =
        user.avatar_url && typeof user.avatar_url == "object"
            ? user.avatar_url.uri
            : getUserImageSrc(user.image);

    return (
        <ScreenWrapper bg="white">
            <View style={styles.container}>
                <View style={{ flex: 1 }}>
                    <Header title="Profil bearbeiten" />
                    <View style={styles.form}>
                        {/* Profil Image */}
                        <View style={styles.avatarContainer}>
                            <Image source={imageSource} style={styles.avatar} />
                            <Pressable
                                style={styles.cameraIcon}
                                onPress={onPickImage}
                            >
                                <Icon
                                    name="camera"
                                    size={20}
                                    strokeWidth={2.5}
                                />
                            </Pressable>
                        </View>

                        {/* Studiensachen */}
                        <Dropdown
                            style={styles.dropdown}
                            placeholderStyle={styles.placeholder}
                            selectedTextStyle={styles.selectText}
                            data={varianten}
                            labelField="label"
                            valueField="value"
                            placeholder="Studienvariante"
                            value={user.studienvariante}
                            onChange={(item) =>
                                setUser((prevUser) => ({
                                    ...prevUser,
                                    studienvariante: item.value,
                                }))
                            }
                            renderLeftIcon={() => (
                                <Icon name="edit" size={26} strokeWidth={1.6} />
                            )}
                        />
                        <Dropdown
                            style={styles.dropdown}
                            placeholderStyle={styles.placeholder}
                            selectedTextStyle={styles.selectText}
                            data={nebenGroß}
                            labelField="label"
                            valueField="value"
                            placeholder="Nebenfach Groß"
                            value={user.nebenfach_gross}
                            onChange={(item) =>
                                setUser((prevUser) => ({
                                    ...prevUser,
                                    nebenfach_gross: item.value,
                                }))
                            }
                            renderLeftIcon={() => (
                                <Icon
                                    name="heart"
                                    size={26}
                                    strokeWidth={1.6}
                                />
                            )}
                        />
                        <Dropdown
                            style={styles.dropdown}
                            placeholderStyle={styles.placeholder}
                            selectedTextStyle={styles.selectText}
                            data={nebenKlein}
                            labelField="label"
                            valueField="value"
                            placeholder="Nebenfach Klein"
                            value={user.nebenfach_klein}
                            onChange={(item) =>
                                setUser((prevUser) => ({
                                    ...prevUser,
                                    nebenfach_klein: item.value,
                                }))
                            }
                            renderLeftIcon={() => (
                                <Icon
                                    name="location"
                                    size={26}
                                    strokeWidth={1.6}
                                />
                            )}
                        />
                    </View>
                    <View>
                        <Button
                            title="Update"
                            buttonStyle={{ marginTop: hp(18) }}
                            onPress={onSubmit}
                            loading={loading}
                        />
                    </View>
                </View>
            </View>
        </ScreenWrapper>
    );
};

export default EditProfile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: wp(4),
    },
    avatarContainer: {
        height: hp(14),
        width: hp(14),
        alignSelf: "center",
    },
    avatar: {
        width: "100%",
        height: "100%",
        borderRadius: theme.radius.xxl * 1.8,
        borderCurve: "continuous",
        borderWidth: 1,
        borderColor: theme.colors.darkLight,
    },
    cameraIcon: {
        position: "absolute",
        bottom: 0,
        right: -10,
        padding: 8,
        borderRadius: 50,
        backgroundColor: "white",
        shadowColor: theme.colors.textLight,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation: 7,
    },
    form: {
        gap: 18,
        marginTop: 20,
    },
    input: {
        flexDirection: "row",
        borderWidth: 0.4,
        borderColor: theme.colors.text,
        borderRadius: theme.radius.xxl,
        borderCurve: "continuous",
        padding: 17,
        paddingHorizontal: 20,
        gap: 15,
    },
    dropdown: {
        flexDirection: "row",
        height: hp(7.2),
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 0.4,
        borderColor: theme.colors.text,
        borderRadius: theme.radius.xxl,
        borderCurve: "continuous",
        paddingHorizontal: 18,
        gap: 12,
    },
    placeholder: {
        color: theme.colors.textLight,
        fontSize: 14,
        paddingLeft: 13,
    },
    selectText: {
        fontSize: 14,
        paddingLeft: 13,
    },
});

const varianten = [
    { label: "IIM", value: "IIM" },
    { label: "IKS", value: "IKS" },
    { label: "LIN", value: "LIN" },
    { label: "DISO", value: "DISO" },
    { label: "GIM", value: "GIM" },
    { label: "DRIKK", value: "DRIKK" },
];

const nebenGroß = [
    {
        label: "BWL",
        value: "BWL",
    },
    {
        label: "Geschichte",
        value: "GES",
    },
    {
        label: "Informationstechnologie",
        value: "INFO",
    },
    {
        label: "Literatur",
        value: "LIT",
    },
    {
        label: "Medienwissenschaft",
        value: "MED",
    },
    {
        label: "Musikwissenschaft",
        value: "MUS",
    },
    {
        label: "Philosophie",
        value: "PHIL",
    },
    {
        label: "Physik",
        value: "PHY",
    },
    {
        label: "Psychologie",
        value: "PSY",
    },
    {
        label: "Soziologie",
        value: "SOZ",
    },
    {
        label: "Technik",
        value: "TEC",
    },
    {
        label: "Übersetzungswissenschaft",
        value: "UEB",
    },
];

const nebenKlein = [
    {
        label: "BWL",
        value: "BWL",
    },
    {
        label: "Geschichte",
        value: "GES",
    },
    {
        label: "Informationstechnologie",
        value: "INFO",
    },
    {
        label: "Literatur",
        value: "LIT",
    },
    {
        label: "Medienwissenschaft",
        value: "MED",
    },
    {
        label: "Musikwissenschaft",
        value: "MUS",
    },
    {
        label: "Philosophie",
        value: "PHIL",
    },
    {
        label: "Physik",
        value: "PHY",
    },
    {
        label: "Psychologie",
        value: "PSY",
    },
    {
        label: "Soziologie",
        value: "SOZ",
    },
    {
        label: "Technik",
        value: "TEC",
    },
    {
        label: "Übersetzungswissenschaft",
        value: "UEB",
    },
];
