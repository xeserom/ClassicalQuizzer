import React, {useCallback, useEffect, useState, useRef, useReducer} from 'react';
import {
  StyleProp,
  type ViewStyle,
  View, Text, SectionList, StyleSheet, Pressable, Platform, Animated, Dimensions, useWindowDimensions} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, type ImageSource } from 'expo-image';
import ExternalLink from '@/components/ExternalLink';
import { useSharedValue } from 'react-native-reanimated';
import FlipComponent2 from '@/components/FlipComponent2';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import AudioPlayer from '@/components/AudioPlayer';
import Button from '@/components/Button';
import FlipComponent from '@/components/FlipComponent';
import musicData from '@/assets/music-data.json';
import '@/constants/style.css';
import { BlurView } from 'expo-blur';
const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

const FrontComponent = ({answer, onPress}: {answer: Piece, onPress: () => void}) => {
  const remoteImage: ImageSource = { 
    uri: answer.image
  };
  
  return (
    <Pressable 
      onPress={onPress}
      style={{ 
        // flex: 1, 
        // width: '100%',
        height: '100%',
        justifyContent: 'flex-end', 
        backgroundColor: 'black', 
        borderRadius: 8,
        borderWidth: 1,
      }}>

      <Image
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          bottom: Platform.OS === 'web' ? 0 : 0.1,
          borderRadius: 8,
        }}
        blurRadius={40}
        source={remoteImage}
        placeholder={{ blurhash }}
        contentFit='cover'
        transition={0}
      />

      <Image
        style={{ flex: 0.6 }}
        source={remoteImage}
        placeholder={{ blurhash }}
        contentFit='contain'
        transition={0}
      />

      <View 
        style={{
          backgroundColor: 'white',
          borderColor: '#000',
          borderRadius: Platform.OS === 'web' ? 8 : 9,
          flex: 0.4,
          padding: 1
        }}>
        <View style={{borderBottomWidth: 1, paddingTop: 5, paddingLeft: 2}}>
          <Text numberOfLines={1} ellipsizeMode='middle' style={{color: '#000', userSelect: 'none', fontWeight: 'bold', textAlign: 'center' }}>{answer.composerName}</Text>
        </View>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text numberOfLines={3} style={{color: '#000', userSelect: 'none', textAlign: 'center' }}>{answer.pieceName}</Text>
        </View>
      </View>

    </Pressable>
  );
};

const TestBackComponent = ({style}: {style?: StyleProp<ViewStyle>}) => (
  <View 
    style={[{ 
      flexGrow: 1,
      backgroundColor: 'white',
      borderColor: '#808080',
      borderRadius: 10,
      borderWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }, style]}>

    <FontAwesome5 name="question" size={100} color="#808080" />
  </View>
);

const BackComponent = () => (
  <View 
    style={[{ 
      flex: 1, 
      backgroundColor: 'white',
      borderColor: '#808080',
      borderRadius: 10,
      borderWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }]}>

    <FontAwesome5 name="question" size={100} color="#808080" />
  </View>
);

const WrongComponent = () => (
  <View 
    style={[{ 
      flex: 1, 
      backgroundColor: '#fff3f3',
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#ff0202',
      justifyContent: 'center',
      alignItems: 'center',
    }]}>
      <FontAwesome name="close" size={100} color="#ff0202" />
  </View>
);

const CorrectComponent = () => (
  <View 
    style={[{ 
      flex: 1, 
      backgroundColor: '#e7fdec',
      borderColor: '#13c837',
      borderRadius: 10,
      borderWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }]}>
      <FontAwesome5 name="check" size={100} color="#13c837" />
  </View>
);

type ChoicesComponentProps = {
  choices: Piece[];
  rotationValues: Animated.Value[];
  onGuess: (index: number) => void;
  foobar: React.ReactNode[];
};

const ChoicesComponent = (props: ChoicesComponentProps) => {
  return (
    <View style={styles.gridContainer}>
      <View style={[styles.rowContainer]}>
        <FlipComponent
          rotationValue={props.rotationValues[0]}
          cardStyle={{flex: 1, width: '100%'}}
          FrontComponent={props.choices.length === 0 ? <></> :
            <FrontComponent answer={props.choices[0]} onPress={() => props.onGuess(0)} />
          }
          BackComponent={props.foobar[0]}
        />
        <FlipComponent
          rotationValue={props.rotationValues[2]}
          cardStyle={{flex: 1, width: '100%'}}
          FrontComponent={props.choices.length === 0 ? <></> :
            <FrontComponent answer={props.choices[2]} onPress={() => props.onGuess(2)} />
          }
          BackComponent={props.foobar[2]}
        />
      </View>
    
      <View style={styles.rowContainer}>
        <FlipComponent
          rotationValue={props.rotationValues[1]}
          cardStyle={{flex: 1, width: '100%'}}
          FrontComponent={props.choices.length === 0 ? <></> :
          <FrontComponent answer={props.choices[1]} onPress={() => props.onGuess(1)} />}
          BackComponent={props.foobar[1]}
        />
      
        <FlipComponent
          rotationValue={props.rotationValues[3]}
          cardStyle={{flex: 1, width: '100%'}}
          FrontComponent={props.choices.length === 0 ? <></> :
          <FrontComponent answer={props.choices[3]} onPress={() => props.onGuess(3)} />}
          BackComponent={props.foobar[3]}
        />
      </View>
    </View>
  );
};

type ScoreComponentProps = {
  correctCount: number,
  incorrectCount: number,
};

const ScoreComponent = ({correctCount, incorrectCount}: ScoreComponentProps) => {
  const [a, setA] = useState([0, 1]);
  const [b, setB] = useState([0, 1]);

  const rotationValue1 = useRef(new Animated.Value(0)).current;
  const rotationValue2 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (correctCount !== 0) {
      Animated.timing(rotationValue1, {
        toValue: Number(!Boolean((rotationValue1 as any)._value)),
        duration: 300,
        useNativeDriver: true,
      }).start(({finished}) => {
        if (finished)
          setA([
            correctCount % 2 === 0 ? correctCount : correctCount + 1,
            correctCount % 2 === 0 ? correctCount + 1: correctCount
          ])
      });
    }
  }, [correctCount]);

  useEffect(() => {
    if (incorrectCount !== 0) {
      Animated.timing(rotationValue2, {
        toValue: Number(!Boolean((rotationValue2 as any)._value)),
        duration: 300,
        useNativeDriver: true,
      }).start(({finished}) => {
        if (finished)
          setB([
            incorrectCount % 2 === 0 ? incorrectCount : incorrectCount + 1,
            incorrectCount % 2 === 0 ? incorrectCount + 1: incorrectCount
          ])
      });
    }
  }, [incorrectCount]);

  return (
    <View style={{flexDirection: 'row', columnGap: 5, width: '100%', height: 35}}>
      
      <View 
        style={{
          flex: 1,
          justifyContent: 'center',
          backgroundColor: '#e7fdec',
          borderColor: '#13c837',
          borderRadius: 10,
          borderWidth: 1,
        }}>
        <FlipComponent
          direction='x'
          rotationValue={rotationValue1}
          BackComponent={
            <Text style={{ backgroundColor: '#e7fdec', textAlign: 'center', borderRadius: 10, width: '99%', userSelect: 'none', color: '#13c837', fontWeight: 'bold', fontSize: 24 }}>
              {a[0]}
            </Text>}
          FrontComponent={
            <Text style={{ backgroundColor: '#e7fdec', textAlign: 'center', borderRadius: 10, width: '99%', userSelect: 'none', color: '#13c837', fontWeight: 'bold', fontSize: 24 }}>
              {a[1]}
            </Text>}
        />
      </View>
      
      <View 
        style={{
          flex: 1,
          justifyContent: 'center',
          backgroundColor: '#fff3f3',
          borderColor: '#ff0202',
          borderRadius: 10,
          borderWidth: 1,
        }}>
        <FlipComponent
          direction='x'
          rotationValue={rotationValue2}
          BackComponent={<Text style={{ backgroundColor: '#fff3f3', textAlign: 'center', borderRadius: 10, width: '99%', userSelect: 'none', color: '#ff0202', fontWeight: 'bold', fontSize: 24 }}>{b[0]}</Text>}
          FrontComponent={<Text style={{ backgroundColor: '#fff3f3', textAlign: 'center', borderRadius: 10, width: '99%', userSelect: 'none', color: '#ff0202', fontWeight: 'bold', fontSize: 24 }}>{b[1]}</Text>}
        />
      </View>

    </View>
  );
};

const PreviousAnswerComponent = ({answer}: {answer: Piece}) => (
  <View style={styles.previousAnswer}>

    {answer === undefined ? <Text>Pick One</Text> : <>
      <Text style={{fontSize: 14, userSelect: 'none'}}>
        Previous Answer
      </Text>

      <ExternalLink href={answer.wiki}>
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          <Text numberOfLines={1} style={{textAlign: 'center', fontSize: 18, color: 'blue' }}>
            {`${answer.composerName} - ${answer.pieceName}`}
          </Text>
          <Feather 
            name='external-link' 
            size={14} 
            color='blue' 
            style={{
              marginLeft: 1,
              top: Platform.OS === 'web' ? -1 : 3
            }}
          />
        </View>
      </ExternalLink>
    </> }
  </View>
);

type Piece = {
  composerName: string;
  pieceName: string;
  image: string;
  url: string;
  playat: number[][];
  wiki: string;
};

type LoadState = {
  answers: Piece[], 
  choices: Piece[]
};

const checkAnswer = (loadState: LoadState, index: number) => (
  loadState.choices[index] === loadState.answers[loadState.answers.length - 1]
);

function extractPieces(): Piece[] {
  const pieces: Piece[] = [];

  musicData.forEach((composer: any) => {
    composer.pieces.forEach((piece: any) => {
      pieces.push({
        composerName: composer.name,
        pieceName: piece.name,
        image: composer.image,
        url: piece.url,
        playat: piece.playat,
        wiki: piece.wiki,
      });
    });
  });

  return pieces;
}

const pieces = extractPieces();

function generateUniqueRandomIntegers(maxSize: number): number[] {
  const uniqueNumbers = new Set<number>();

  while (uniqueNumbers.size < 3) {
    const randomNumber = Math.floor(Math.random() * (maxSize + 1));
    uniqueNumbers.add(randomNumber);
  }

  return Array.from(uniqueNumbers);
}

function shuffle(array: any[]) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}

type ModalProps = { 
  visible: boolean;
  duration: number;
  onFinished: () => void;
  children?: React.ReactNode;
};

function Modal({visible, duration, onFinished, children}: ModalProps) {
  const { height } = useWindowDimensions();
  const yValue = useRef(new Animated.Value(1)).current;
  const opacityValue = useRef(new Animated.Value(0)).current;

  const slideUp = () => {
    Animated.timing(yValue, {
      toValue: 0,
      duration: duration,
      useNativeDriver: true,
    }).start();
  };

  const slideDown = () => {
    Animated.timing(yValue, {
      toValue: 1,
      duration: duration,
      useNativeDriver: true,
    }).start(({finished}) => {
      if (finished) onFinished();
    });
  };

  useEffect(() => {
    opacityValue.setValue(1);
    visible ? slideUp() : slideDown()
  }, [visible]);

  return (
    <Animated.View 
      style={{
        width: '100%', 
        height: '100%', 
        position: 'absolute', 
        zIndex: 1,
        opacity: opacityValue,
        transform: [{translateY: yValue.interpolate({inputRange: [0, 1], outputRange: [0, height]})}]
      }}>
      <BlurView
        experimentalBlurMethod='dimezisBlurView'
        intensity={20} 
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        {children}
      </BlurView>
    </Animated.View>
  );
}

type Credit = {
  playat: [number, number];
  url: string;
  file: string[];
  license: string[];
};

type CreditSection = {
  name: string;
  data: Credit[];
};

function Credits({onPress}: {onPress: () => void}) {
  const sections: CreditSection[] = musicData.map((composer) => ({
    name: composer.name,
    data: composer.pieces.map((piece) => ({
      playat: piece.playat[0] as [number, number],
      url: piece.url,
      file: piece.credit.file,
      license: piece.credit.license,
    }))
  }))

  const renderItem = ({ item }: { item: Credit }) => {
    return (
      <View 
        style={{
          flex: 1,
          margin: 2,
          borderBottomWidth: 1,
          alignItems: 'center',
        }}>

        <View 
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor: 'red'
          }}>

          <ExternalLink 
            href={item.file[1]}
            text={item.file[0]}
          />

          <Text style={{marginHorizontal: 5}}>•</Text>

          <ExternalLink 
            href={item.license[1] !== '' ? item.license[1] : 'https://creativecommons.org/publicdomain/zero/1.0/deed.en'}
            text={item.license[0]}
          />
        </View>

        <View style={{ width: '100%'}}>
          <AudioPlayer url={item.url} playat={item.playat} />
        </View>

      </View>
    );
  };

  const renderSectionHeader = ({section: {name}}: { section: { name: string } }) => {
    return (
      <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>
        {name}
      </Text>
    );
  };
  
  return (
    <View style={{flex: 1}}>
      <Pressable
        onPress={onPress} 
        style={{
          backgroundColor: 'grey',
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
        }}>
        <Ionicons name="chevron-back-outline" size={24} color="black" />
      </Pressable>

      <SectionList
        style={{padding: 10}}
        sections={sections}
        keyExtractor={(item, index) => `${item.file[0]}-${index}`}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
      />
    </View>
  )
};

type SwapView = {
  view1: React.ReactNode;
  view2: React.ReactNode;
  swap?: boolean
};

function SwapView({view1, view2, swap = false}: SwapView) {
  const [currentView, setCurrentView] = useState<React.ReactNode>();

  useEffect(() => setCurrentView(swap ? view2 : view1), [swap]);

  return currentView;
}

const detectAppleDevice = () => {
  if (typeof navigator !== "undefined") {
    const userAgent = navigator.userAgent || "";
    const platform = navigator.platform || "";

    // Check for iPhone, iPad, or Mac
    const isIPhone = /iPhone/.test(userAgent);
    const isIPad = /iPad/.test(userAgent) || (platform === "MacIntel" && navigator.maxTouchPoints > 1);
    const isMac = /Mac/.test(platform) && !isIPad;

    return isIPhone || isIPad || isMac;
  }

  return false;
};

export default function Game() {
  const [loadedState, setLoadedState] = useState<{answers: Piece[], choices: Piece[]}>({
    answers: [],
    choices: [],
  });

  const fetchChoices = () => {


    const choices: Piece[] = [];
    
    const availableAnswers = pieces.filter(piece => !loadedState.answers.includes(piece));
    const answerIndex = Math.floor(Math.random() * availableAnswers.length);
    const answer = availableAnswers[answerIndex];

    choices.push(answer);
    
    // Easy
    for (let i = 0; i < 3; i++) {
      let availableChoices = pieces.filter(piece => !choices.map(piece2 => piece2.composerName === piece.composerName).includes(true));
      let choiceIndex = Math.floor(Math.random() * availableChoices.length);
      choices.push(availableChoices[choiceIndex]);
    }

    // Hard
    // const availableChoices = pieces.filter(piece => answer !== piece);
    // const choiceIndices = generateUniqueRandomIntegers(3);
    // const choices = [
    //   answer,
    //   availableChoices[choiceIndices[0]],
    //   availableChoices[choiceIndices[1]],
    //   availableChoices[choiceIndices[2]],
    // ];

    shuffle(choices);

    return {
      answer: answer,
      choices: choices,
    };
  };

  const [foobar, setFoobar] = useState([
    <BackComponent />,
    <BackComponent />,
    <BackComponent />,
    <BackComponent />,
  ]);

  const flipAll = async (): Promise<void> => {
    return new Promise((resolve) => 
      Animated.parallel([
        // Animated.delay(300),
        Animated.timing(rotationValues[0], {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(rotationValues[1], {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(rotationValues[2], {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(rotationValues[3], {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        })
      ]).start(({finished}) => {
        if (finished) {
          setDisabled(false);
          resolve();
        }
      })
    );
  };

  const flipRest = () => {
    Animated.parallel([
      Animated.timing(rotationValues[0], {
        toValue: 0,
        delay: 300,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(rotationValues[1], {
        toValue: 0,
        delay: 300,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(rotationValues[2], {
        toValue: 0,
        delay: 300,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(rotationValues[3], {
        toValue: 0,
        delay: 300,
        duration: 300,
        useNativeDriver: true,
      })
    ]).start(({finished}) => {
      if (finished) 
        loadState();
    });
  };

  const loadState = async () => {
    const choices = fetchChoices();

    setLoadedState({
      answers: loadedState.answers.length === pieces.length - 1 ? [choices.answer] : [...loadedState.answers, choices.answer],
      choices: choices.choices,
    })

    await flipAll();

    setFoobar(foobar.map((_, index) => 
      choices.choices[index] === choices.answer ? 
      <CorrectComponent/> 
      : 
      <WrongComponent/>
    ));
  };

  const [disabled, setDisabled] = useState(true);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
   
  const onGuess = (index: number) => {
    if (checkAnswer(loadedState, index)) {
      setCorrectCount(correctCount + 1);
      setDisabled(true);
    } else {
      setIncorrectCount(incorrectCount + 1);
    }

    Animated.timing(rotationValues[index], {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(({finished}) => {
      if (finished && checkAnswer(loadedState, index))
        flipRest();
    })
  };

  const rotationValues = [
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
  ];
b
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [isSwapped, setIsSwapped] = useState(false);

  const handleSwap = () => {
    setIsSwapped(!isSwapped);
  };

  document.title = 'Classical Quizzer';

  return (
    <SafeAreaView style={styles.container}>

        {!detectAppleDevice() ? <></> : 
          <View 
            style={{
              paddingVertical: 10,
              width: '100%',
              backgroundColor: '#fff3f3',
              borderRadius: 10,
              borderWidth: 1,
              borderColor: '#ff0202',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 2,
            }}>
              <Text style={{color: '#ff0202', fontWeight: 'bold'}}>
                Warning:
              </Text>
              <Text style={{color: '#ff0202', textAlign: 'center'}}>
                This website does not support Apple devices.
              </Text>
          </View> 
        }

      <View 
        style={{
          width: '100%', 
          height: '100%', 
          backgroundColor: 'red', 
          opacity: 0.0,
          position: 'absolute', 
          zIndex: disabled ? 1 : -1,
        }}
      />

      <Modal 
        visible={isModalVisible}
        duration={500}
        onFinished={loadState}
      >
        
        
        
        <SwapView
          swap={isSwapped}
          view1={
            <View 
              style={{
                justifyContent: 'center', 
                alignItems: 'center',
                backgroundColor: 'white', 
                borderRadius: 10, 
                borderWidth: 1,
                width: '75%',
                paddingVertical: 20,
                maxHeight: 400,
                maxWidth: 400,
                gap: 5,
              }}>
              <Text style={{fontWeight: 'bold', fontSize: 32}}>Classical Quizzer</Text>
              <Text style={{fontSize: 20, marginBottom: 25, width: '75%', textAlign: 'center'}}>
                Guess the composer that composed the music.
              </Text>
              <Button title='Play' onPress={() => setIsModalVisible(false)}/>
              {/* <Button title='Credits' onPress={handleSwap}/> */}
            </View>
          }
          view2={
            <Animated.View 
              style={{
                backgroundColor: 'white',
                borderRadius: 10,
                borderWidth: 1,
                width: '75%',
                height: '75%',
              }}>
              <Credits onPress={handleSwap}/>
            </Animated.View>
          }
        />

      </Modal>

      <ChoicesComponent
        choices={loadedState.choices}
        onGuess={onGuess}
        rotationValues={rotationValues}
        foobar={foobar}
      />

      <PreviousAnswerComponent 
        answer={loadedState.answers[loadedState.answers.length - 2]}
      />

      <ScoreComponent 
        correctCount={correctCount}
        incorrectCount={incorrectCount}
      />

      <AudioPlayer
        url={loadedState.answers.length > 0 ? loadedState.answers[loadedState.answers.length - 1].url : ''}
        playat={loadedState.answers.length > 0 ? [
          loadedState.answers[loadedState.answers.length - 1].playat[0][0],
          loadedState.answers[loadedState.answers.length - 1].playat[0][1]
        ] : [0, 8000]}
        style={styles.audioPlayer}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: Platform.OS === 'web' ? 'center' : 'auto',
    padding: 5, 
    maxWidth: 500,
    gap: 5,
  },
  gridContainer: {
    flex: 1,
    maxHeight: 500,
    width: '100%',
    gap: 5,
    flexDirection: 'row'
  },
  rowContainer: {
    flex: 1,
    gap: 5,
    flexDirection: 'column',
  },
  // choicesContainer: {
  //   // flexDirection: 'row',
  //   // flex: 1,
  //   // flexWrap: 'wrap',
  //   // justifyContent: 'space-between',
  //   // width: '100%',
  //   // height: '50%',
  //   // aspectRatio: 1,
  //   maxWidth: 500,
  //   maxHeight: 500,
  //   flexDirection: 'row',
  //   flex: 1,
  //   flexWrap: 'wrap',
  //   justifyContent: 'space-between',
  // },
  // choiceWrapper: {
  //   // aspectRatio: 1,
  //   width: '49%',
  //   height: '49%',
  //   marginBottom: Platform.OS === 'web' ? 0 : 5,
  // },
  previousAnswer: {
    justifyContent: 'center', 
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    padding: 5,
    width: '100%',
    height: 50,
    backgroundColor: 'white',
  },
  audioPlayer: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 100,
    width: '100%',
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
  }
});