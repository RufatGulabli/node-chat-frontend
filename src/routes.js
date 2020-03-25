import PublicChat from "./components/publicChat";
import RoomChat from "./components/roomChat";
import LiveVisitors from "./components/liveVisitors";
import Chat from "./components/chat";

export default [
  { path: "/", exact: true, Component: PublicChat },
  { path: "/roomchat", exact: false, Component: RoomChat },
  { path: "/live", exact: false, Component: LiveVisitors },
  { path: "/chat", exact: false, Component: Chat }
];
