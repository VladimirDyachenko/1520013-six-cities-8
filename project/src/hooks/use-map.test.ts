import { renderHook } from '@testing-library/react-hooks';
import { LayerGroup, Map } from 'leaflet';
import useMap from './use-map';

describe('Hook: useUserAnswers', () => {

  it('should return Map and LayerGroup', () => {
    const mockElement = document.createElement('div');
    const fakeMapRef = { current: mockElement };

    const {result} = renderHook(() =>
      useMap(fakeMapRef, { latitude: 1, longitude: 1, zoom: 10 }),
    );

    const [map, markerLayer] = result.current;

    expect(result.current).toHaveLength(2);
    expect(map).toBeInstanceOf(Map);
    expect(markerLayer).toBeInstanceOf(LayerGroup);
  });

  it('should call flyTo on map center change', () => {
    const mockElement = document.createElement('div');
    const fakeMapRef = { current: mockElement };
    let fakeMapCenter = { latitude: 1, longitude: 1, zoom: 10 };

    const { result, rerender } = renderHook(() =>
      useMap(fakeMapRef, fakeMapCenter),
    );

    const [map] = result.current;

    const mockFn = jest.fn();

    if (map) {
      map.flyTo = mockFn;
    }

    fakeMapCenter = { latitude: 100, longitude: 100, zoom: 10 };
    rerender();

    expect(mockFn).toBeCalledTimes(1);
  });

});
