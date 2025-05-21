import React, { useEffect, useRef } from "react";
import { View, Text, Animated, StyleSheet } from "react-native";

const LoadingDots = () => {
    const dot1 = useRef(new Animated.Value(0)).current;
    const dot2 = useRef(new Animated.Value(0)).current;
    const dot3 = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const createAnimation = (dot, delay) => {
            return Animated.loop(
                Animated.sequence([
                    Animated.timing(dot, {
                        toValue: -5,
                        duration: 300,
                        delay,
                        useNativeDriver: true,
                    }),
                    Animated.timing(dot, {
                        toValue: 0,
                        duration: 300,
                        useNativeDriver: true,
                    }),
                ])
            );
        };

        const anim1 = createAnimation(dot1, 0);
        const anim2 = createAnimation(dot2, 150);
        const anim3 = createAnimation(dot3, 300);

        anim1.start();
        anim2.start();
        anim3.start();

        return () => {
            anim1.stop();
            anim2.stop();
            anim3.stop();
        };
    }, []);

    return (
        <View style={styles.dotContainer}>
            <Animated.Text
                style={[styles.dot, { transform: [{ translateY: dot1 }] }]}
            >
                .
            </Animated.Text>
            <Animated.Text
                style={[styles.dot, { transform: [{ translateY: dot2 }] }]}
            >
                .
            </Animated.Text>
            <Animated.Text
                style={[styles.dot, { transform: [{ translateY: dot3 }] }]}
            >
                .
            </Animated.Text>
        </View>
    );
};

const styles = StyleSheet.create({
    dotContainer: {
        flexDirection: "row",
        alignItems: "flex-end",
    },
    dot: {
        fontSize: 12,
        marginHorizontal: 2,
        fontWeight: 900,
        color: "#666",
    },
});

export default LoadingDots;
