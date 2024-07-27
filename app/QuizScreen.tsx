import {
  View,
  Text,
  ScrollView,
  Pressable,
  Button,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { data } from "@/utils/DummyData";
import Modal from "react-native-modal";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/navigation/StackNavigation";

type SplashScreenNavigationProp = StackNavigationProp<RootStackParamList>;

const QuizScreen = () => {
  const navigate = useNavigation<SplashScreenNavigationProp>();
  const [quizs, setQuizs] = useState(data);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [showWrongModal, setShowWrongModal] = useState(false);
  const [noChancesModal, setNoChancesModal] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(false);

  const chooseAnswerHandler = (answer: { title: string; index: string }) => {
    const isCorrectAnswer =
      quizs[currentQuizIndex].correct_option == answer.index;
    // if (currentQuizIndex < quizs.length - 1) {
    //   setCurrentQuizIndex((prev) => prev + 1);
    //   if (isCorrectAnswer) {
    //     setScore((prev) => prev + 1);
    //   } else {
    //     setWrongAnswers((prev) => prev + 1);
    //     setShowWrongModal(true);
    //   }
    // }
    // if (currentQuizIndex == quizs.length - 1) {
    //   if (isCorrectAnswer) {
    //     setScore((prev) => prev + 1);
    //   }
    // }
    if (isCorrectAnswer) {
      setScore((prev) => prev + 1);
      setSelectedAnswer(true);
      setTimeout(() => {
        setCurrentQuizIndex((prev) => prev + 1);
        if (currentQuizIndex == quizs.length - 1) {
          console.log("its last question of the quiz");
          navigate.navigate("WellDone");
        }
        setSelectedAnswer(false);
      }, 1000);
    } else {
      setWrongAnswers((prev) => prev + 1);
      if (wrongAnswers > 1) {
        setNoChancesModal(true);
      } else {
        setShowWrongModal(true);
      }
    }
  };

  return (
    <View className="flex-1">
      <View className="px-8 pt-4">
        <Text style={{ fontFamily: "TajwalBold" }} className="text-lg">
          Correct Answers: {score}
        </Text>
        <Text style={{ fontFamily: "TajwalBold" }} className="text-lg">
          Wrong Answers: {wrongAnswers}
        </Text>
        <Text style={{ fontFamily: "TajwalBold" }} className="text-lg">
          Total Quistions: {quizs.length}
        </Text>
      </View>
      <View className="flex-1 p-6">
        {/* quiz */}
        <View className="bg-white h-40 p-5 shadow-lg rounded-lg">
          <ScrollView>
            <Text style={{ fontFamily: "TajwalBold" }} className="text-lg">
              {quizs[currentQuizIndex]?.question}
            </Text>
          </ScrollView>
        </View>

        {/* quiz */}
        {/* Options */}
        <View className="my-3 flex-1">
          <ScrollView>
            {quizs[currentQuizIndex]?.options.map((quiz) => (
              <Pressable
                key={quiz.title}
                onPress={() => chooseAnswerHandler(quiz)}
                className={`bg-white my-2 py-5 px-5 rounded-lg shadow-lg flex-row ${
                  selectedAnswer &&
                  quiz.index == quizs[currentQuizIndex].correct_option
                    ? "bg-theme-primary"
                    : selectedAnswer &&
                      quiz.index != quizs[currentQuizIndex].correct_option
                    ? "bg-red-400"
                    : "bg-white"
                }`}
                disabled={selectedAnswer}
              >
                <Text
                  style={{ fontFamily: "TajwalBold" }}
                  className="text-lg mr-2"
                >
                  {quiz.index})
                </Text>
                <Text
                  style={{ fontFamily: "TajwalReg" }}
                  className={` text-lg px-1`}
                >
                  {quiz.title}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
        {/* Options */}
        {/* NoChancesModal */}

        <Modal
          isVisible={noChancesModal}
          animationIn={"zoomIn"}
          animationOut={"zoomOut"}
          animationOutTiming={500}
          backdropOpacity={0.9}
        >
          <View className="h-52 bg-white items-center justify-between py-4 rounded-lg shadow">
            <Text
              style={{ fontFamily: "TajwalBold" }}
              className="text-theme-quinary text-center text-3xl"
            >
              إجابتك خاطئة
            </Text>
            <Text
              style={{ fontFamily: "TajwalReg" }}
              className="text-theme-quinary text-center text-lg"
            >
              لسوء الحظ هذه المره الثالثة التي نحطئ فيها، لن تتمكن من الحصول علي
              نقاط هذا الاختبار ولكن ما زال بامكانك اجتيازه مرة اخري لكي يتم فتح
              الاختبار التالي
            </Text>
            <TouchableOpacity
              className="bg-theme-primary px-6 py-1 rounded-lg"
              onPress={() => {
                console.log("last modal click");
                navigate.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [{ name: "Profile" }],
                  })
                );
              }}
            >
              <Text
                style={{ fontFamily: "TajwalBold" }}
                className="text-theme-quaternary text-center text-lg"
              >
                فهمت
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>

        {/* NoChancesModal */}
        {/* modal */}
        <Modal
          isVisible={showWrongModal}
          animationIn={"zoomIn"}
          animationOut={"zoomOut"}
          animationOutTiming={500}
          backdropOpacity={0.9}
        >
          <View className="h-52 bg-white items-center justify-between py-4 rounded-lg shadow">
            <Text
              style={{ fontFamily: "TajwalBold" }}
              className="text-theme-quinary text-center text-3xl"
            >
              إجابتك خاطئة
            </Text>
            <Text
              style={{ fontFamily: "TajwalReg" }}
              className="text-theme-quinary text-center text-lg"
            >
              عليك مشاهدة إعلان عقابا لك وبعدها سنعرض لك الإجابة الصحيحة وننتقل
              للسؤال التالي
            </Text>
            <TouchableOpacity
              className="bg-theme-primary px-6 py-1 rounded-lg"
              onPress={() => {
                setShowWrongModal(false);
                setSelectedAnswer(true);
                setTimeout(() => {
                  setCurrentQuizIndex((prev) => prev + 1);
                  setSelectedAnswer(false);
                }, 2000);
              }}
            >
              <Text
                style={{ fontFamily: "TajwalBold" }}
                className="text-theme-quaternary text-center text-lg"
              >
                موافق
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
        {/* modal */}
      </View>
      <View className="h-14 relative z-50">
        <Text>Hello {score}</Text>
      </View>
    </View>
  );
};

export default QuizScreen;
