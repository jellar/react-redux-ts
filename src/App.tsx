import * as React from "react";

import TodoContainer from "./containers/TodoContainer";
const App: React.FC<{}> = () => {
  return (
    <div>
      <h1>Welcome to React with Tyescript</h1>
      <TodoContainer />
    </div>
  );
};

export default App;
