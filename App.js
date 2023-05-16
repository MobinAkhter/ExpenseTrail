import AppNavigation from "./navigation/appNavigation";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { LogBox } from "react-native";

export default function App() {
  LogBox.ignoreAllLogs();

  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
}
