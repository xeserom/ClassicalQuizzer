import { View, Text, StyleSheet } from 'react-native';

type CardProps = {
  zIndex?: number;
  header?: string;
  subheader?: string;
  children?: React.ReactNode;
};

const Card = ({ header, subheader, children, zIndex = 0 }: CardProps) => {
  return (
    <View 
      style={[style.container, { 
        zIndex: zIndex, 
        bottom: zIndex * -20,
        marginTop: zIndex === 0 ? 20 : 0,
      }]}>

      <View 
        style={{
          backgroundColor: `rgba(0, 0, 0, ${ Math.abs(zIndex) * 0.1 })`,
          position: 'absolute',
          width: '100%',
          height: '100%',
          zIndex: 1,
          borderRadius: 10,
        }}
      />

      <View
        style={{
          margin: 5,
          alignItems: 'center',
        }}>

        {header ?
          <Text style={[style.text, style.header]}>
            {header}
          </Text>:
          <></>}

        {subheader ?
          <Text style={[style.text, style.subheader]}>
            {subheader}
          </Text>:
          <></>}

        {children}

      </View>

    </View>
  );
};

const style = StyleSheet.create({
  container: {
    alignSelf: 'center',
    // position: 'absolute',
    backgroundColor: 'grey',
    borderRadius: 10,
    width: 280,
    height: 400,
  },
  text: {
    color: 'white', 
    userSelect: 'none',
  },
  header: {
    fontWeight: 'bold', 
    fontSize: 25,
  },
  subheader : {
    fontSize: 14,
  }
});

export default Card;


        {/* <View 
        style={{
          flex: 1,
          backgroundColor: `rgba(0, 0, 0, ${ Math.abs(zIndex) * 0.1 })`,
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
          // margin: 10
        }}
      > */}






// return (
//   <View 
//     style={{
//       padding: 20,
//       margin: 20,
//       width: 285,
//       height: 450,
//       position: 'absolute',
//       top: top,
//       zIndex: zIndex,
//     }}>

//     <View 
//       style={{ 
//         flex: 1,     
//         backgroundColor: 'grey',
//         borderRadius: 10,
//       }}>
//       <View 
//       style={{
//         flex: 1,
//         backgroundColor: `rgba(0, 0, 0, ${ Math.abs(zIndex) * 0.1 })`,
//         borderRadius: 10,
//         justifyContent: 'center',
//         alignItems: 'center',
//         // margin: 10
//       }}
//     >
//       <Text style={{ marginTop: 10, fontWeight: 'bold', fontSize: 25, color: 'white', userSelect: 'none' }}>
//         {header}
//       </Text>

//       {subheader ?
//         <Text style={{ fontSize: 14, color: 'white', userSelect: 'none' }}>
//           {subheader}
//         </Text>:
//         <></>}

//       {children}

//     </View>
//     </View>
//   </View>
// );