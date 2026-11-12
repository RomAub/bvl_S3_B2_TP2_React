import { useTicketsContext } from "../context/TicketsContext";

function Notification() {
  const { message } = useTicketsContext();
  if (!message) return null;
  return <div className="notification">{message}</div>;
}

export default Notification;
