import { Link } from 'react-router-dom';
import { AppRoute } from '../../../utils/const';

const wrapperStyle: React.CSSProperties = {
  height: '100vh',
  backgroundColor: '#fcfefc',
  display: 'flex',
  alignItems: 'center',
};

const imageStyle: React.CSSProperties = {
  marginLeft: 'auto',
  alignSelf: 'flex-end',
};

function NotFoundPage(): JSX.Element {
  return (
    <div style={wrapperStyle}>
      <div style={{marginLeft: '2rem'}}>
        <p style={{fontSize: '4rem'}}>404 Not found : /</p>
        <Link to={AppRoute.Main} style={{fontSize: '2rem'}}>Go home</Link>
      </div>
      <img style={imageStyle} src='/img/confused-john-travolta.gif' alt='Vincent Vega lost'/>
    </div>
  );
}

export default NotFoundPage;
