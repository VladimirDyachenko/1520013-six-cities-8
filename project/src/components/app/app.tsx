import MainPage from '../pages/main-page/main-page';

type AppPageProps = {
  offersCount: number;
}

function App({offersCount}: AppPageProps): JSX.Element {
  return <MainPage offersCount={offersCount}/>;
}

export default App;
