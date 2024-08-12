import { View, Text, ScrollView, Pressable, BackHandler } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import {
  CommonActions,
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { getQuizs } from "@/services/questionsService";
import LoadingIcon from "@/components/LoadingIcon/LoadingIcon";
import ModalMessage from "@/components/ModalMessage/ModalMessage";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import db from "@/config/firebase";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { setUserInfo } from "@/store/userInfoSlice/userInfoSlice";
import { RootNavigationParamList } from "@/navigation/StackNavigation";

type SplashScreenNavigationProp = StackNavigationProp<RootNavigationParamList>;
type ChaptersScreenRouteProp = RouteProp<RootNavigationParamList, "Quiz">;

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
  const [showExitModal, setShowExitModal] = useState(false);
  const [timer, setTimer] = useState(60);

  const navigate = useNavigation<SplashScreenNavigationProp>();
  const route = useRoute<ChaptersScreenRouteProp>();
  const { topicId, chapterId, chapterReward } = route.params;

  // reset the exam
  const resetExam = () => {
    setCurrentQuizIndex(0);
    setWrongAnswers(0);
    setQuizs([]);
    setIsExamVisited(false);
    setTimer(60);
  };

  const getQuestions = async () => {
    try {
      setIsloading(true);
      const quizData: any[] | undefined = await getQuizs(
        topicId,
        chapterId,
        userInfo
      );

      if (quizData && quizData?.length > 0) {
        // Fisher-Yates Shuffle
        for (let i = quizData.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [quizData[i], quizData[j]] = [quizData[j], quizData[i]];
        }
        setQuizs([...quizData]);
      } else {
        setIsQuestionsExists(false);
      }
      setIsloading(false);
    } catch (error) {
      setIsloading(false);
    }
  };

  // add chapters to user chapter arr
  const addChapterToUser = async () => {
    const userRef = doc(db, "users", userInfo.id);
    await updateDoc(userRef, {
      completedChapters: arrayUnion(chapterId),
    });
  };

  // check if exam visited before
  const checkIsExamVisited = () => {
    if (userInfo.completedChapters.includes(chapterId)) {
      setIsExamVisited(true);
    } else {
      setIsExamVisited(false);
      addChapterToUser();
    }
  };

  // Timer logic
  useEffect(() => {
    let countdown: any;
    if (!showWrongModal && !noChancesModal) {
      countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }

    if (timer === 0) {
      setWrongAnswers((prev) => prev + 1);
      if (wrongAnswers > 1) {
        setNoChancesModal(true);
      } else {
        setShowWrongModal(true);
      }
      setTimer(60);
    }

    return () => clearInterval(countdown);
  }, [timer, showWrongModal, noChancesModal]);

  useEffect(() => {
    setTimer(60);
  }, [currentQuizIndex]);

  // Format time to MM:SS
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  // choose answer logic function
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
          dispatch(
            setUserInfo({
              ...userInfo,
              completedChapters: [...userInfo.completedChapters, chapterId],
            })
          );
          resetExam();
          navigate.dispatch(
            CommonActions.reset({ index: 0, routes: [{ name: "WellDone" }] })
          );
        } else {
          const score = parseInt(chapterReward) + parseInt(userInfo.score);
          await updateDoc(userRef, {
            score: score.toString(),
          });

          dispatch(
            setUserInfo({
              ...userInfo,
              score: score,
              completedChapters: [...userInfo.completedChapters, chapterId],
            })
          );
          resetExam();
          navigate.dispatch(
            CommonActions.reset({ index: 0, routes: [{ name: "WellDone" }] })
          );
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
    setTimer(60);
  };

  // exit handler
  useFocusEffect(
    useCallback(() => {
      const resetScreen = () => {
        resetExam();
        getQuestions();
        checkIsExamVisited();
      };

      resetScreen();

      const onBackPress = () => {
        setShowExitModal(true);
        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () => {
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
      };
    }, [topicId, chapterId, userInfo])
  );

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
                    ? "bg-[#5beb9a]"
                    : selectedAnswer &&
                      quizs[currentQuizIndex].options
                        .indexOf(option)
                        .toString() != quizs[currentQuizIndex].correctAnswer
                    ? "bg-[#fdbdbd]"
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
          <Text
            className="text-center my-2 text-theme-primary"
            style={{ fontFamily: "TajwalBold" }}
          >
            {formatTime(timer)}
          </Text>
        </View>
        {/* Options */}
        {/* NoChancesModal */}

        <ModalMessage
          showModal={noChancesModal}
          modalTitle="إجابتك خاطئة"
          modalDesc="لسوء الحظ هذه المره الثالثة التي تخطئ فيها، لن تتمكن من الحصول علي نقاط هذا الاختبار ولكن ما زال بامكانك اجتيازه مرة اخري لكي يتم فتح الاختبار التالي"
          modalBtnTitle="فهمت"
          onPressBtn={() => {
            dispatch(
              setUserInfo({
                ...userInfo,
                completedChapters: [...userInfo.completedChapters, chapterId],
              })
            );

            resetExam();
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
          onPressBtn={async () => {
            setShowWrongModal(false);
            setSelectedAnswer(true);

            await new Promise((reslove) => {
              reslove(
                setTimeout(() => {
                  setCurrentQuizIndex((prev) => prev + 1);
                  setSelectedAnswer(false);
                }, 2000)
              );
            });

            if (currentQuizIndex >= quizs.length - 1) {
              const userRef = doc(db, "users", userInfo.id);
              if (isExamVisited) {
                resetExam();
                navigate.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [{ name: "WellDone" }],
                  })
                );
              } else {
                const score =
                  parseInt(chapterReward) + parseInt(userInfo.score);
                await updateDoc(userRef, {
                  score: score.toString(),
                });
                dispatch(
                  setUserInfo({
                    ...userInfo,
                    score: score,
                  })
                );
                resetExam();
                dispatch(
                  setUserInfo({
                    ...userInfo,
                    completedChapters: [
                      ...userInfo.completedChapters,
                      chapterId,
                    ],
                  })
                );
                navigate.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [{ name: "WellDone" }],
                  })
                );
              }
            }
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
            navigate.dispatch(
              CommonActions.reset({ index: 0, routes: [{ name: "Topics" }] })
            );
          }}
        />
        {/* modal */}
        {/* exit modal */}
        <ModalMessage
          modalBtnTitle="نعم"
          modalBtnTitleTwo="لا"
          modalDesc="هل انت متاكد من الخروج من الإختبار؟"
          modalTitle="تحذير!"
          showModal={showExitModal}
          onPressBtn={() => {
            resetExam();
            setShowExitModal(false);
            navigate.dispatch(
              CommonActions.reset({ index: 0, routes: [{ name: "Topics" }] })
            );
          }}
          onPressBtnTwo={() => {
            setShowExitModal(false);
          }}
        />
        {/* exit modal */}
      </View>
      <View className="h-20 justify-center items-center bg-slate-500">
        <Text>Advertisement</Text>
      </View>
    </View>
  );
};

export default QuizScreen;
