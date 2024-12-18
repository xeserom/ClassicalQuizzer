import { useEffect, useState } from 'react';
import { Text, Pressable, StyleProp, TextStyle, ScrollView, ActivityIndicator } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

function foobar(full_string: string, sub_string: string) {
  const startIndex = full_string.replaceAll('\n', '').indexOf(sub_string);

  if (startIndex === -1)
    return [full_string, '', ''];

  let charCount = 0;
  let matchStart = -1;

  for (let i = 0; i < full_string.length; i++) {
    if (full_string[i] !== '\n') {
      if (charCount === startIndex)
        matchStart = i;

      if (charCount === startIndex + sub_string.length - 1) {
        let matchEnd = i + 1;

        const before = full_string.slice(0, matchStart);
        const match = full_string.slice(matchStart, matchEnd);
        const after = full_string.slice(matchEnd);

        return [before, match, after];
      }

      charCount++;
    }
  }

  return [full_string, '', ''];
}

type ListProps = {
  text: string;
  onSelect: (text: string) => void;
  composer?: string;
  piece?: string;
};

const List = ({ text, onSelect, composer = '', piece = '' }: ListProps) => {
  const [name, setName] = useState('');

  const [list, setList] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchList = () => {
      // console.log('composer:', composer, 'piece:', piece);
      fetch(
        `http://127.0.0.1:5000/list${composer ? '/' + composer : ''}${piece ? '/' + piece : ''}`
      ).then(res => {
        if (!res.ok)
          throw new Error(`HTTP Error: Status: ${res.status}`);
        return res.json();
      }).then((data: string[]) => {
        // console.log(data);
        setList(data);
      }).catch(err => {
        console.log('Error:', err);
        setError('error loading list');
      }).finally(() => {
        setLoading(false);
      });
    };

    fetchList();
  }, [composer, piece]);

  if (loading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Error {error}</Text>;
  }

  const items = list.filter((value) => value.replaceAll(' ', '').includes(text));

  const highlightedItems = items.map((value, index) => 
    <RadioButton
      key={index}
      highlightText={text} 
      fullText={value.replaceAll(' ', '\n').toUpperCase()}
      onSelect={() => { 
        if (name !== value) {
          setName(value);
          onSelect(value);
        } else if (name === value) {
          setName('');
          onSelect('');
        }
      }}
      selected={value === name}
    />
  );

  return (
    <ScrollView
      persistentScrollbar={true}
      showsVerticalScrollIndicator={true}
      style={{ 
        flexDirection: 'column',
        width: 200,
        height: 340,
        padding: 10,
        marginBottom: 10,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: 'white'
      }}>
      {highlightedItems.length > 0 ? 
        highlightedItems : 
        <Text>
          {text}
        </Text>
      }
    </ScrollView>
  );
};

type RadioButtonProps = {
  highlightText: string;
  fullText: string;
  style?: StyleProp<TextStyle>;
  onSelect: (text: string) => void;
  selected: boolean;
};

const RadioButton = ({ highlightText, fullText, onSelect, selected = false }: RadioButtonProps) => {
  const [before, match, after] = foobar(fullText, highlightText);
  
  return (
    <Pressable 
      onPress={() => onSelect(fullText)} 
      style={{ 
        flexDirection: 'row', 
        margin: 5 
      }}>
        <Text 
          style={{
            userSelect: 'none',
            textAlign: 'left',
            color: 'black',
            flex: 1,
          }}>

          <Text style={{ color: 'white' }}>
            {before}
          </Text>
      
          {match}
      
          <Text style={{ color: 'white' }}>
            {after}
          </Text>

        </Text>
      {selected ?
        <MaterialCommunityIcons name="checkbox-intermediate" size={24} color="white" /> :
        <MaterialCommunityIcons name="checkbox-blank-outline" size={24} color="white" /> }
    </Pressable>
  );
};

export default List;

















// const List = ({ list, text, onSelect, state }: ListProps) => {
//   const [name, setName] = state;
//   const items = list.filter((value) => value[1].replaceAll('\n', '').includes(text));

//   const highlightedItems = items.map((value, index) => 
//     <RadioButton
//       key={index}
//       highlight={text} 
//       fullText={value[1]}
//       onSelect={(v) => { 
//         if (name !== v) {
//           setName(v);
//           onSelect(value[0]);
//         } else if (name === v) {
//           setName('');
//           onSelect('');
//         }
//       }}
//       selected={value[1] === name}
//     />
//   );

//   return (
//     <ScrollView
//       persistentScrollbar={true}
//       showsVerticalScrollIndicator={true}
//       style={{ 
//         flexDirection: 'column',
//         width: 200,
//         height: 340,
//         padding: 10,
//         marginBottom: 10,
//         borderTopWidth: 1,
//         borderBottomWidth: 1,
//         borderColor: 'white'
//       }}>
//       {highlightedItems.length > 0 ? 
//         highlightedItems : 
//         <Text>
//           {text}
//         </Text>
//       }
//     </ScrollView>
//   );
// };

// List.Option = ({ highlight, fullText, onSelect, selected = false }: OptionProps) => {
//   const [before, match, after] = foobar(fullText, highlight);

//   return (
//     <Pressable 
//       onPress={() => onSelect(fullText)} 
//       style={{ flexDirection: 'row', margin: 5 }}>
//         <Text 
//           style={{
//             userSelect: 'none',
//             textAlign: 'left',
//             color: 'black',
//             flex: 1,
//           }}>

//           <Text style={{ color: 'white' }}>
//             {before}
//           </Text>
      
//           {match}
      
//           <Text style={{ color: 'white' }}>
//             {after}
//           </Text>

//         </Text>
//       {selected ?
//         <MaterialCommunityIcons name="checkbox-intermediate" size={24} color="white" /> :
//         <MaterialCommunityIcons name="checkbox-blank-outline" size={24} color="white" /> }
//     </Pressable>
//   );
// };


  // list: string[][];
  // text: string;
  // onSelect: (text: string) => void;
  // state: [string, React.Dispatch<React.SetStateAction<string>>];

  // const [name, setName] = state;
  // const items = list.filter((value) => value[1].replaceAll('\n', '').includes(text));

  // const highlightedItems = items.map((value, index) => 
  //   <RadioButton
  //     key={index}
  //     highlight={text} 
  //     fullText={value[1]}
  //     onSelect={(v) => { 
  //       if (name !== v) {
  //         setName(v);
  //         onSelect(value[0]);
  //       } else if (name === v) {
  //         setName('');
  //         onSelect('');
  //       }
  //     }}
  //     selected={value[1] === name}
  //   />
  // );

   {/* {highlightedItems.length > 0 ? 
        highlightedItems : 
        <Text>
          {text}
        </Text>
      } */}