import { Pressable } from 'react-native';
import { openBrowserAsync } from 'expo-web-browser';
import { Platform } from 'react-native';

type ExternalLinkProps = { 
  href: string;
  children: React.ReactNode;
};

export default function ExternalLink({ href, children }: ExternalLinkProps) {
  const handlePress = async () => await openBrowserAsync(href);

  return (Platform.OS === 'web' ?
    <a target='_blank' href={href} style={{width: '100%', textDecorationLine: 'none'}}>
      {children}
    </a>
    :
    <Pressable onPress={handlePress}>
      {children}
    </Pressable>
  );
}


// import { Pressable, View, Text } from 'react-native';
// import { openBrowserAsync } from 'expo-web-browser';
// import { Platform } from 'react-native';

// type ExternalLinkProps = { 
//   href: string;
//   text: string;
// };

// export default function ExternalLink({href, text}: ExternalLinkProps) {
//   const handlePress = async () => await openBrowserAsync(href);

//   return (Platform.OS === 'web' ?
//     <View style={{flex: 1}}>
//       <Text numberOfLines={1} ellipsizeMode='tail'>
//         <a target='_blank' href={href} style={{width: '100%', textDecorationLine: 'none'}}>
//           {text}
//         </a>
//       </Text>
//     </View>
//     :
//     <Pressable onPress={handlePress}>
//       {/* {children} */}
//       <Text>
//         {text}
//       </Text>
//     </Pressable>
//   );
// }
