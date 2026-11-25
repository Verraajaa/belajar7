import UserForm from "./componens/UseForm";
import userSchema from "./schemas/userSchema";

import "./App.css";

function App() {
  return(
    <div>
      <UserForm />
      <userSchema />
    </div>
  );
}

export default App;