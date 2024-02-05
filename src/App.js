import useAuthentication from "./Components/Hook/useAuthenticate";

function App() {
  const { authenticated, loading, userObj } = useAuthentication()
  return (
    <div className="App">
      hello
      {loading?(<>loading...</>):authenticated?(<> authenticated</>):(<> not authenticated</>)}
    </div>
  );
}

export default App;
