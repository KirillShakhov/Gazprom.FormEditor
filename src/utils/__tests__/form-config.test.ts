import { ITabPageController } from '../../interfaces/form-config';
import { isTabPageController } from '../form-config';

describe('isTabPageController', () => {
  test('should return true for TabPageController', () => {
    const el: ITabPageController = {
      code: 'code1',
      name: 'name1',
      pages: [],
    };

    expect(isTabPageController(el)).toBe(true);
  });
});
