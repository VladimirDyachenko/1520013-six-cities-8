import { Link } from 'react-router-dom';
import { Offer } from '../../../types/offer';
import { AppRoute } from '../../../utils/const';
import FavoritesList from '../../favorites-list/favorites-list';
import Header from '../../header/header';

type FavoritesPageProps = {
  offers: Offer[]
};

function FavoritesPage({offers}: FavoritesPageProps): JSX.Element {
  return (
    <div className='page'>
      <Header/>
      <main className='page__main page__main--favorites'>
        <div className='page__favorites-container container'>
          <section className='favorites'>
            <h1 className='favorites__title'>Saved listing</h1>
            <FavoritesList offers={offers}/>
          </section>
        </div>
      </main>
      <footer className='footer container'>
        <Link to={AppRoute.Main} className='footer__logo-link'>
          <img className='footer__logo' src='img/logo.svg' alt='6 cities logo' width='64' height='33'/>
        </Link>
      </footer>
    </div>
  );
}

export default FavoritesPage;
