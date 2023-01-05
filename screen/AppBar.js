import { Appbar } from "react-native-paper";
const AppBar = () => {
  return (
    <Appbar.Header className="bg-black text-white">
      <Appbar.BackAction onPress={() => {}} />
      <Appbar.Content title="Title" className="text-white"/>
      <Appbar.Action icon="calendar" onPress={() => {}} />
      <Appbar.Action icon="magnify" onPress={() => {}} />
    </Appbar.Header>
  );
};


export default AppBar