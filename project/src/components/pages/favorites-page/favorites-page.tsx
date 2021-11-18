import { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchFavoriteOffersAction } from '../../../store/api-action';
import { getFavoriteOffers } from '../../../store/offers-data/selectors';
import { ThunkAppDispatch } from '../../../types/store/actions';
import { State } from '../../../types/store/state';
import { AppRoute } from '../../../utils/const';
import FavoritesList from '../../favorites-list/favorites-list';
import Header from '../../header/header';

const mapStateToProps = (state: State) => ({
  favoriteOffers: getFavoriteOffers(state),
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  loadData() {
    dispatch(fetchFavoriteOffersAction());
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux;

function FavoritesPage(props: ConnectedComponentProps): JSX.Element {
  const { favoriteOffers: offers, loadData } = props;

  useEffect(() => loadData(), [loadData]);

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
        <Link
          to={AppRoute.Main}
          className='footer__logo-link'
          data-testid="footer-link-to-main"
        >
          <img className='footer__logo' src='img/logo.svg' alt='6 cities logo' width='64' height='33'/>
        </Link>
      </footer>
    </div>
  );
}

export { FavoritesPage };
export default connector(FavoritesPage);
