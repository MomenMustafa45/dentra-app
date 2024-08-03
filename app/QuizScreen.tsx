import { View, Text, ScrollView, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import {
  CommonActions,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/navigation/StackNavigation";
import { RootDrawerParamList } from "@/navigation/DrawerNavigation";
import { getQuizs } from "@/services/questionsService";
import LoadingIcon from "@/components/LoadingIcon/LoadingIcon";
import ModalMessage from "@/components/ModalMessage/ModalMessage";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import db from "@/config/firebase";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { setUserInfo } from "@/store/userInfoSlice/userInfoSlice";

type SplashScreenNavigationProp = StackNavigationProp<RootStackParamList>;
type ChaptersScreenRouteProp = RouteProp<RootDrawerParamList, "Quiz">;

type QuestionType = {
  questionId: string;
  question: string;
  options: string[];
  correctAnswer: string;
};

const QuizScreen = () => {
  const userInfo = useAppSelector((state) => state.userInfo.unserInfo);
  const dispatch = useAppDispatch();
  const [quizs, setQuizs] = useState<QuestionType[]>([]);
  const [isQuestionsExist, setIsQuestionsExists] = useState(true);
  const [isLoading, setIsloading] = useState(false);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [showWrongModal, setShowWrongModal] = useState(false);
  const [noChancesModal, setNoChancesModal] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(false);
  const [isExamVisited, setIsExamVisited] = useState(false);

  const navigate = useNavigation<SplashScreenNavigationProp>();
  const route = useRoute<ChaptersScreenRouteProp>();
  const { topicId, chapterId, chapterReward } = route.params;

  const getQuestions = async () => {
    try {
      setIsloading(true);
      const quizData: any[] | undefined = await getQuizs(
        topicId,
        chapterId,
        userInfo
      );

      if (quizData && quizData?.length > 0) {
        setQuizs([...quizData]);
      } else {
        setIsQuestionsExists(false);
      }
      setIsloading(false);
    } catch (error) {
      setIsloading(false);
    }
  };

  const addChapterToUser = async () => {
    const userRef = doc(db, "users", userInfo.id);
    await updateDoc(userRef, {
      completedChapters: arrayUnion(chapterId),
    });
  };

  const checkIsExamVisited = () => {
    if (userInfo.completedChapters.includes(chapterId)) {
      setIsExamVisited(true);
    } else {
      setIsExamVisited(false);
      addChapterToUser();
      dispatch(
        setUserInfo({
          ...userInfo,
          completedChapters: [...userInfo.completedChapters, chapterId],
        })
      );
    }
  };

  useEffect(() => {
    getQuestions();
    checkIsExamVisited();
  }, [topicId, chapterId, userInfo]);

  const chooseAnswerHandler = async (answer: string) => {
    const isCorrectAnswer =
      quizs[currentQuizIndex].correctAnswer ==
      quizs[currentQuizIndex].options.indexOf(answer).toString();

    if (isCorrectAnswer) {
      if (currentQuizIndex < quizs.length - 1) {
        setSelectedAnswer(true);
        await new Promise((reslove) => {
          reslove(
            setTimeout(() => {
              setCurrentQuizIndex((prev) => prev + 1);
              setSelectedAnswer(false);
            }, 1000)
          );
        });
      }
      if (currentQuizIndex >= quizs.length - 1) {
        const userRef = doc(db, "users", userInfo.id);
        if (isExamVisited) {
          setCurrentQuizIndex(0);
          setWrongAnswers(0);
          navigate.navigate("WellDone");
        } else {
          const score = parseInt(chapterReward) + parseInt(userInfo.score);
          await updateDoc(userRef, {
            score: score.toString(),
          });
          dispatch(
            setUserInfo({
              ...userInfo,
              score: score,
            })
          );
          setCurrentQuizIndex(0);
          setWrongAnswers(0);
          navigate.navigate("WellDone");
        }
      }
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
      {isLoading && <LoadingIcon />}

      <View className="px-8 pt-4">
        {/* <Text style={{ fontFamily: "TajwalBold" }} className="text-lg">
          Correct Answers: {score}
        </Text> */}
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
            {quizs[currentQuizIndex]?.options.map((option, index) => (
              <Pressable
                key={option}
                onPress={() => chooseAnswerHandler(option)}
                className={`bg-white my-2 py-5 px-5 rounded-lg shadow-lg flex-row ${
                  selectedAnswer &&
                  quizs[currentQuizIndex].options.indexOf(option).toString() ==
                    quizs[currentQuizIndex].correctAnswer
                    ? "bg-theme-primary"
                    : selectedAnswer &&
                      quizs[currentQuizIndex].options
                        .indexOf(option)
                        .toString() != quizs[currentQuizIndex].correctAnswer
                    ? "bg-red-400"
                    : "bg-white"
                }`}
                disabled={selectedAnswer}
              >
                <Text
                  style={{ fontFamily: "TajwalBold" }}
                  className="text-lg mr-2"
                >
                  {index + 1})
                </Text>
                <Text
                  style={{ fontFamily: "TajwalReg" }}
                  className={` text-lg px-1`}
                >
                  {option}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
        {/* Options */}
        {/* NoChancesModal */}

        <ModalMessage
          showModal={noChancesModal}
          modalTitle="إجابتك خاطئة"
          modalDesc="لسوء الحظ هذه المره الثالثة التي تخطئ فيها، لن تتمكن من الحصول علي نقاط هذا الاختبار ولكن ما زال بامكانك اجتيازه مرة اخري لكي يتم فتح الاختبار التالي"
          modalBtnTitle="فهمت"
          onPressBtn={() => {
            setCurrentQuizIndex(0);
            setWrongAnswers(0);
            navigate.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: "Profile" }],
              })
            );
          }}
        />

        {/* NoChancesModal */}
        {/* modal */}
        <ModalMessage
          showModal={showWrongModal}
          modalTitle="إجابتك خاطئة"
          modalDesc="عليك مشاهدة إعلان عقابا لك وبعدها سنعرض لك الإجابة الصحيحة وننتقل للسؤال التالي"
          modalBtnTitle="موافق"
          onPressBtn={() => {
            setShowWrongModal(false);
            setSelectedAnswer(true);
            setTimeout(() => {
              setCurrentQuizIndex((prev) => prev + 1);
              setSelectedAnswer(false);
            }, 2000);
          }}
        />
        {/* modal */}

        {/* modal no questions yet */}

        <ModalMessage
          modalBtnTitle="فهمت"
          modalDesc="لم يتم إضافة اسئلة لهذا القسم بعد"
          modalTitle="نأسف"
          showModal={!isQuestionsExist}
          onPressBtn={() => {
            setIsQuestionsExists(true);
            navigate.navigate("Topics");
          }}
        />
        {/* modal */}
      </View>
      <View className="h-14 relative z-50">
        <Text>Hello</Text>
      </View>
    </View>
  );
};

export default QuizScreen;
